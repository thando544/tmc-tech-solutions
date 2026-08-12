import { NextRequest, NextResponse } from "next/server";
import { addOns } from "@/lib/catalog";
import { getCatalogItem, type CartItem } from "@/lib/cart";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/server";
import { cartItemMutationSchema, cartItemUpdateSchema } from "@/lib/validations/contact";

function toDbCycle(cycle: CartItem["billingCycle"]) {
  return cycle === "one-time" || cycle === "quote" ? "one_time" : cycle;
}

function fromDbCycle(cycle: string): CartItem["billingCycle"] {
  return cycle === "one_time" ? "one-time" : (cycle as CartItem["billingCycle"]);
}

async function getActiveCart(userId: string) {
  const supabase = createAdminClient();
  const { data: existing, error } = await supabase.from("carts").select("id").eq("user_id", userId).eq("status", "active").order("created_at", { ascending: false }).limit(1).maybeSingle();

  if (error) {
    throw error;
  }

  if (existing) {
    return existing;
  }

  const { data, error: insertError } = await supabase.from("carts").insert({ user_id: userId, status: "active", currency: "USD" }).select("id").single();
  if (insertError) {
    throw insertError;
  }

  return data;
}

async function updateCartSubtotal(cartId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("cart_items").select("unit_price_cents, addons").eq("cart_id", cartId);
  if (error) {
    throw error;
  }

  const subtotal = (data ?? []).reduce((sum, item) => {
    const addonTotal = (Array.isArray(item.addons) ? item.addons : []).reduce((addonSum, slug) => addonSum + (addOns.find((addon) => addon.slug === slug)?.priceCents ?? 0), 0);
    return sum + item.unit_price_cents + addonTotal;
  }, 0);

  await supabase.from("carts").update({ subtotal_cents: subtotal, updated_at: new Date().toISOString() }).eq("id", cartId);
}

function mapCartItem(item: {
  product_slug: string;
  product_type: CartItem["type"];
  product_name: string;
  billing_cycle: string;
  unit_price_cents: number;
  domain_mode: CartItem["domainMode"] | null;
  domain_name: string | null;
  addons: unknown;
}): CartItem {
  return {
    id: `${item.product_type}:${item.product_slug}`,
    slug: item.product_slug,
    type: item.product_type,
    name: item.product_name,
    priceCents: item.unit_price_cents,
    currency: "USD",
    billingCycle: fromDbCycle(item.billing_cycle),
    quantity: 1,
    domainMode: item.domain_mode ?? undefined,
    domainName: item.domain_name ?? undefined,
    addons: Array.isArray(item.addons) ? (item.addons as string[]) : []
  };
}

export async function GET() {
  const { user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const supabase = createAdminClient();
  const cart = await getActiveCart(user.id);
  const { data, error } = await supabase.from("cart_items").select("*").eq("cart_id", cart.id).eq("user_id", user.id).order("created_at");

  if (error) {
    throw error;
  }

  const items = (data ?? []).map(mapCartItem);
  const subtotalCents = items.reduce((sum, item) => {
    const addonTotal = (item.addons ?? []).reduce((addonSum, slug) => addonSum + (addOns.find((addon) => addon.slug === slug)?.priceCents ?? 0), 0);
    return sum + item.priceCents + addonTotal;
  }, 0);

  return NextResponse.json({ items, subtotalCents, count: items.length });
}

export async function POST(request: NextRequest) {
  const { user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = cartItemMutationSchema.parse(await request.json());
  const catalogItem = getCatalogItem(body.type, body.slug);
  if (!catalogItem) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const supabase = createAdminClient();
  const cart = await getActiveCart(user.id);
  const existingId = `${catalogItem.type}:${catalogItem.slug}`;
  const { data: existing } = await supabase.from("cart_items").select("id").eq("cart_id", cart.id).eq("product_slug", catalogItem.slug).eq("product_type", catalogItem.type).maybeSingle();

  if (!existing) {
    const { error } = await supabase.from("cart_items").insert({
      cart_id: cart.id,
      user_id: user.id,
      product_slug: catalogItem.slug,
      product_type: catalogItem.type,
      product_name: catalogItem.name,
      billing_cycle: toDbCycle(catalogItem.billingCycle),
      quantity: 1,
      unit_price_cents: catalogItem.priceCents,
      domain_mode: body.domainMode ?? catalogItem.domainMode ?? null,
      domain_name: body.domainName ?? null,
      addons: body.addons ?? []
    });

    if (error) {
      throw error;
    }
  }

  await updateCartSubtotal(cart.id);
  return NextResponse.json({ itemId: existingId });
}

export async function PATCH(request: NextRequest) {
  const { user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = cartItemUpdateSchema.parse(await request.json());
  const [type, slug] = body.id.split(":") as [CartItem["type"], string];
  const cart = await getActiveCart(user.id);
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("cart_items")
    .update({ domain_mode: body.domainMode ?? null, domain_name: body.domainName ?? null, addons: body.addons ?? [] })
    .eq("cart_id", cart.id)
    .eq("user_id", user.id)
    .eq("product_type", type)
    .eq("product_slug", slug);

  if (error) {
    throw error;
  }

  await updateCartSubtotal(cart.id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const { user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const itemId = new URL(request.url).searchParams.get("itemId");
  if (!itemId) {
    return NextResponse.json({ error: "itemId is required." }, { status: 400 });
  }

  const [type, slug] = itemId.split(":") as [CartItem["type"], string];
  const cart = await getActiveCart(user.id);
  const supabase = createAdminClient();
  const { error } = await supabase.from("cart_items").delete().eq("cart_id", cart.id).eq("user_id", user.id).eq("product_type", type).eq("product_slug", slug);

  if (error) {
    throw error;
  }

  await updateCartSubtotal(cart.id);
  return NextResponse.json({ ok: true });
}
