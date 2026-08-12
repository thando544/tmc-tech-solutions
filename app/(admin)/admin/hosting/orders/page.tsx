import { CyberPanelStatus } from "@/components/admin/cyberpanel-status";
import { ProvisionOrderButton } from "@/components/admin/provision-order-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = { title: "Admin · Hosting orders" };

const tone: Record<string, "default" | "success" | "warning" | "error"> = {
  pending: "warning",
  provisioning: "warning",
  active: "success",
  suspended: "warning",
  failed: "error",
  cancelled: "default"
};

export default async function AdminHostingOrdersPage() {
  const admin = createAdminClient();
  const { data: orders } = await admin
    .from("hosting_orders")
    .select("*, hosting_packages(name)")
    .order("created_at", { ascending: false });

  const userIds = [...new Set((orders ?? []).map((order) => order.user_id))];
  const { data: profiles } = userIds.length
    ? await admin.from("profiles").select("id, email, full_name").in("id", userIds)
    : { data: [] };

  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));

  return (
    <>
      <CyberPanelStatus />
      <h1 className="mb-2 font-heading text-2xl font-bold text-navy">Hosting orders</h1>
      <p className="mb-6 text-sm text-muted">Review pending orders and provision approved hosting on infrastructure.</p>
      <div className="grid gap-4">
        {(orders ?? []).map((order) => {
          const profile = profileById.get(order.user_id);
          const canProvision = order.status === "pending" || order.status === "failed";
          return (
            <Card key={order.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-heading font-semibold">{order.domain}</p>
                  <p className="text-sm text-muted">
                    {order.hosting_packages?.name ?? "Package"} · {profile?.email ?? "Unknown customer"}
                  </p>
                  {order.failure_reason ? (
                    <p className="mt-1 text-xs text-error">{order.failure_reason}</p>
                  ) : null}
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={tone[order.status] ?? "default"}>{order.status}</Badge>
                  {canProvision ? <ProvisionOrderButton orderId={order.id} /> : null}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
