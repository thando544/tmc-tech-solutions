import "server-only";
import { createHostingWebsite, getHostingPanelUrl, getHostingServerIp, setHostingWebsiteStatus } from "@/lib/cyberpanel/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const packageFields =
  "id, name, slug, description, price, currency, billing_cycle, storage_gb, bandwidth_gb, websites_limit, email_accounts_limit, databases_limit, support_level, is_featured, is_active, sort_order, created_at, updated_at";

export async function listActiveHostingPackages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hosting_packages")
    .select(packageFields)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getHostingPackageBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hosting_packages")
    .select(packageFields)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createHostingOrder(userId: string, packageId: string, domain: string) {
  const admin = createAdminClient();

  const { data: pkg, error: pkgError } = await admin
    .from("hosting_packages")
    .select("id, is_active, cyberpanel_package_name")
    .eq("id", packageId)
    .maybeSingle();

  if (pkgError || !pkg?.is_active) {
    throw new Error("Hosting package is not available.");
  }

  const { data: order, error } = await admin
    .from("hosting_orders")
    .insert({
      user_id: userId,
      package_id: packageId,
      domain,
      status: "pending",
      cyberpanel_package_name: pkg.cyberpanel_package_name
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return order;
}

export async function provisionHostingOrder(orderId: string, adminUserId: string) {
  const admin = createAdminClient();

  const { data: order, error: orderError } = await admin.from("hosting_orders").select("*").eq("id", orderId).maybeSingle();

  if (orderError || !order) {
    throw new Error("Hosting order not found.");
  }

  if (!["pending", "failed"].includes(order.status)) {
    throw new Error(`Order cannot be provisioned while status is ${order.status}.`);
  }

  const { data: profile } = await admin.from("profiles").select("email, full_name").eq("id", order.user_id).maybeSingle();

  const ownerEmail = profile?.email ?? process.env.SUPPORT_EMAIL ?? "info@tmctechsolutions.com";

  await admin
    .from("hosting_orders")
    .update({ status: "provisioning", failure_reason: null, updated_at: new Date().toISOString() })
    .eq("id", orderId);

  const panelResult = await createHostingWebsite({
    domainName: order.domain,
    packageName: order.cyberpanel_package_name,
    ownerEmail
  });

  if (!panelResult.success) {
    const { isCyberPanelApiDisabled } = await import("@/lib/cyberpanel/client");
    const reason = panelResult.message ?? "CyberPanel provisioning failed.";
    const failureReason = isCyberPanelApiDisabled(reason)
      ? `${reason} Enable API access in CyberPanel (Users → admin → Edit → API Access ON).`
      : reason;

    await admin
      .from("hosting_orders")
      .update({
        status: "failed",
        failure_reason: failureReason,
        updated_at: new Date().toISOString()
      })
      .eq("id", orderId);

    throw new Error(failureReason);
  }

  const serverIp = getHostingServerIp();
  const panelUrl = getHostingPanelUrl();
  const now = new Date().toISOString();

  const { data: account, error: accountError } = await admin
    .from("hosting_accounts")
    .upsert(
      {
        user_id: order.user_id,
        order_id: order.id,
        package_id: order.package_id,
        domain: order.domain,
        server_ip: serverIp,
        panel_url: panelUrl || null,
        status: "active",
        cyberpanel_package_name: order.cyberpanel_package_name,
        updated_at: now
      },
      { onConflict: "order_id" }
    )
    .select("*")
    .single();

  if (accountError) {
    await admin
      .from("hosting_orders")
      .update({
        status: "failed",
        failure_reason: accountError.message,
        updated_at: now
      })
      .eq("id", orderId);

    throw new Error(accountError.message);
  }

  const { data: updatedOrder, error: finalizeError } = await admin
    .from("hosting_orders")
    .update({
      status: "active",
      provisioned_at: now,
      failure_reason: null,
      updated_at: now
    })
    .eq("id", orderId)
    .select("*")
    .single();

  if (finalizeError) {
    throw new Error(finalizeError.message);
  }

  const { auditLog } = await import("@/lib/actions/audit");
  await auditLog({
    userId: adminUserId,
    action: "hosting_order_provisioned",
    resourceType: "hosting_order",
    resourceId: orderId,
    metadata: { domain: order.domain, account_id: account.id }
  });

  return { order: updatedOrder, account };
}

export async function setHostingAccountStatus(
  accountId: string,
  action: "suspend" | "unsuspend",
  adminUserId: string
) {
  const admin = createAdminClient();

  const { data: account, error } = await admin.from("hosting_accounts").select("*").eq("id", accountId).maybeSingle();

  if (error || !account) {
    throw new Error("Hosting account not found.");
  }

  const panelStatus = action === "suspend" ? "Suspend" : "Active";
  const panelResult = await setHostingWebsiteStatus({
    domainName: account.domain,
    status: panelStatus
  });

  if (!panelResult.success) {
    throw new Error(panelResult.message ?? "CyberPanel status update failed.");
  }

  const nextStatus = action === "suspend" ? "suspended" : "active";

  const { data: updated, error: updateError } = await admin
    .from("hosting_accounts")
    .update({ status: nextStatus, updated_at: new Date().toISOString() })
    .eq("id", accountId)
    .select("*")
    .single();

  if (updateError) {
    throw new Error(updateError.message);
  }

  if (account.order_id) {
    await admin
      .from("hosting_orders")
      .update({
        status: action === "suspend" ? "suspended" : "active",
        updated_at: new Date().toISOString()
      })
      .eq("id", account.order_id);
  }

  const { auditLog } = await import("@/lib/actions/audit");
  await auditLog({
    userId: adminUserId,
    action: action === "suspend" ? "hosting_account_suspended" : "hosting_account_unsuspended",
    resourceType: "hosting_account",
    resourceId: accountId,
    metadata: { domain: account.domain }
  });

  return updated;
}
