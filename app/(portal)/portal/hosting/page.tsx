import Link from "next/link";
import { PageHeading } from "@/components/portal/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Hosting" };

const orderTone: Record<string, "default" | "success" | "warning" | "error"> = {
  pending: "warning",
  provisioning: "warning",
  active: "success",
  suspended: "warning",
  failed: "error",
  cancelled: "default"
};

export default async function PortalHostingPage({
  searchParams
}: {
  searchParams: Promise<{ ordered?: string }>;
}) {
  const { supabase, user } = await getPortalContext();
  const { ordered } = await searchParams;

  const [{ data: accounts }, { data: orders }] = await Promise.all([
    supabase
      .from("hosting_accounts")
      .select("*, hosting_packages(name, slug)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("hosting_orders")
      .select("*, hosting_packages(name, slug)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
  ]);

  return (
    <>
      <PageHeading
        title="Hosting"
        description="Your active hosting accounts and pending orders. Infrastructure is provisioned after admin approval."
      />
      {ordered ? (
        <p className="mb-6 rounded-md border border-cta/30 bg-orange-50 px-4 py-3 text-sm text-navy">
          Your hosting order was submitted and is pending review.
        </p>
      ) : null}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-heading text-xl font-semibold">Active accounts</h2>
          <Link href="/hosting" className="text-sm font-medium text-cta hover:underline">
            Browse plans
          </Link>
        </div>
        {!accounts?.length ? (
          <EmptyState
            title="No hosting accounts yet"
            description="After your order is approved and provisioned, your domain, server IP, and panel details will appear here."
          />
        ) : (
          <div className="grid gap-4">
            {accounts.map((account) => (
              <Link key={account.id} href={`/portal/hosting/${account.id}`}>
                <Card>
                  <CardContent className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-heading font-semibold">{account.domain}</h3>
                      <p className="text-sm text-muted">{account.hosting_packages?.name ?? "Hosting package"}</p>
                    </div>
                    <Badge tone={account.status === "active" ? "success" : "warning"}>{account.status}</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
      <section>
        <h2 className="mb-4 font-heading text-xl font-semibold">Orders</h2>
        {!orders?.length ? (
          <EmptyState title="No hosting orders" description="Select a plan from the hosting store to place your first order." />
        ) : (
          <div className="grid gap-3">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <p className="font-medium">{order.domain}</p>
                    <p className="text-sm text-muted">{order.hosting_packages?.name ?? "Package"}</p>
                  </div>
                  <Badge tone={orderTone[order.status] ?? "default"}>{order.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
