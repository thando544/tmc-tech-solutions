import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";
import { formatMoney } from "@/lib/utils";

export const metadata = { title: "Orders" };

export default async function PortalOrdersPage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

  return (
    <>
      <PageHeading title="Orders" description="Orders create invoices and provisioning jobs after checkout. Provider success is never faked." />
      {!data?.length ? (
        <EmptyState title="No orders" description="Orders will appear after a real checkout creates an order record." />
      ) : (
        <div className="grid gap-4">
          {data.map((order) => (
            <Card key={order.id}>
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div>
                  <h2 className="font-heading font-semibold">{order.order_number}</h2>
                  <p className="text-sm text-muted">{formatMoney(order.amount_cents, order.currency)}</p>
                </div>
                <Badge tone={order.status === "completed" ? "success" : "warning"}>{order.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
