import { NextRequest, NextResponse } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { apiError, SetupRequiredError } from "@/lib/api/errors";
import { rateLimit } from "@/lib/api/rate-limit";
import { addOns } from "@/lib/catalog";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/server";
import { checkoutSchema } from "@/lib/validations/contact";

function toDbBillingCycle(cycle: string) {
  return cycle === "one-time" || cycle === "quote" ? "one_time" : cycle;
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await requireUser();
    if (!user) {
      return NextResponse.json({ error: "Create an account or sign in before checkout." }, { status: 401 });
    }

    const limited = rateLimit(`checkout:${user.id}`, 10, 60_000);
    if (!limited.allowed) {
      return NextResponse.json({ error: "Too many checkout attempts." }, { status: 429 });
    }

    const body = checkoutSchema.parse(await request.json());
    const amountCents = body.items.reduce((sum, item) => {
      const addonTotal = (item.addons ?? []).reduce((addonSum, slug) => addonSum + (addOns.find((addon) => addon.slug === slug)?.priceCents ?? 0), 0);
      return sum + item.priceCents + addonTotal;
    }, 0);
    const supabaseAdmin = createAdminClient();
    const timestamp = Date.now();
    const orderNumber = `TMC-${timestamp}`;
    const invoiceNumber = `INV-${timestamp}`;

    const { data: cart, error: cartError } = await supabaseAdmin
      .from("carts")
      .insert({
        user_id: user.id,
        status: "converted",
        currency: "USD",
        subtotal_cents: amountCents,
        metadata: { source: "checkout" }
      })
      .select("id")
      .single();

    if (cartError) {
      throw cartError;
    }

    const cartItems = body.items.map((item) => ({
      cart_id: cart.id,
      user_id: user.id,
      product_slug: item.slug,
      product_type: item.type,
      product_name: item.name,
      billing_cycle: toDbBillingCycle(item.billingCycle),
      quantity: item.quantity,
      unit_price_cents: item.priceCents,
      domain_mode: item.domainMode ?? null,
      domain_name: item.domainName ?? null,
      addons: item.addons ?? []
    }));

    const { error: cartItemsError } = await supabaseAdmin.from("cart_items").insert(cartItems);
    if (cartItemsError) {
      throw cartItemsError;
    }

    const { data: invoice, error: invoiceError } = await supabaseAdmin
      .from("invoices")
      .insert({
        user_id: user.id,
        invoice_number: invoiceNumber,
        amount_cents: amountCents,
        currency: "USD",
        status: "open",
        due_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()
      })
      .select("id")
      .single();

    if (invoiceError) {
      throw invoiceError;
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user.id,
        cart_id: cart.id,
        invoice_id: invoice.id,
        order_number: orderNumber,
        status: "pending_payment",
        amount_cents: amountCents,
        currency: "USD",
        customer_snapshot: body.customer,
        metadata: { paymentMethod: body.paymentMethod }
      })
      .select("id")
      .single();

    if (orderError) {
      throw orderError;
    }

    const orderItems = body.items.map((item) => ({
      order_id: order.id,
      user_id: user.id,
      product_slug: item.slug,
      product_type: item.type,
      product_name: item.name,
      billing_cycle: toDbBillingCycle(item.billingCycle),
      quantity: item.quantity,
      unit_price_cents: item.priceCents,
      domain_mode: item.domainMode ?? null,
      domain_name: item.domainName ?? null,
      addons: item.addons ?? []
    }));

    const { error: orderItemsError } = await supabaseAdmin.from("order_items").insert(orderItems);
    if (orderItemsError) {
      throw orderItemsError;
    }

    const provisioningItems = body.items.filter((item) => !["mobile_app", "website_service"].includes(item.type));
    const projectItems = body.items.filter((item) => ["mobile_app", "website_service"].includes(item.type));

    const { error: jobError } = provisioningItems.length
      ? await supabaseAdmin.from("provisioning_jobs").insert(provisioningItems.map((item) => ({
        user_id: user.id,
        order_id: order.id,
        provider: item.type === "domain" || item.domainMode === "register" ? "opensrs" : "cyberpanel",
        target: item.type === "domain" || item.domainMode === "register" ? "opensrs" : "cyberpanel",
        operation: `provision_${item.type}`,
        status: "queued",
        payload: {
          productSlug: item.slug,
          domainMode: item.domainMode ?? null,
          domainName: item.domainName ?? null,
          addons: item.addons ?? []
        }
      })))
      : { error: null };

    if (jobError) {
      throw jobError;
    }

    if (projectItems.length) {
      const { error: requestError } = await supabaseAdmin.from("project_requests").insert(
        projectItems.map((item) => ({
          user_id: user.id,
          order_id: order.id,
          product_slug: item.slug,
          product_type: item.type,
          title: item.name,
          status: item.billingCycle === "quote" ? "quote_requested" : "pending_review",
          budget_cents: item.priceCents,
          currency: item.currency,
          metadata: {
            billingCycle: item.billingCycle,
            domainName: item.domainName ?? null,
            addons: item.addons ?? []
          }
        }))
      );

      if (requestError) {
        throw requestError;
      }
    }

    await auditLog({
      userId: user.id,
      action: "checkout_started",
      resourceType: "cart",
      metadata: {
        paymentMethod: body.paymentMethod,
        itemCount: body.items.length,
        amountCents,
        orderId: order.id,
        invoiceId: invoice.id
      }
    });

    if (body.paymentMethod === "ecocash" && (!process.env.PAYNOW_INTEGRATION_ID || !process.env.PAYNOW_INTEGRATION_KEY)) {
      throw new SetupRequiredError("EcoCash checkout through Paynow is not configured on the server.");
    }

    if (body.paymentMethod === "card" && !process.env.STRIPE_SECRET_KEY) {
      throw new SetupRequiredError("Card checkout is not configured on the server.");
    }

    if (body.paymentMethod === "paypal" && (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET)) {
      throw new SetupRequiredError("PayPal checkout is not configured on the server.");
    }

    throw new SetupRequiredError("Payment provider mapping is prepared but not connected yet.");
  } catch (error) {
    return apiError(error);
  }
}
