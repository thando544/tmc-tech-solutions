import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Services" };

export default async function PortalServicesPage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("hosting_services").select("*, hosting_plans(name)").eq("user_id", user.id).order("created_at", { ascending: false });

  return (
    <>
      <PageHeading title="Services" description="All hosting, WordPress, VPS, and related service records." />
      {!data?.length ? (
        <EmptyState title="No active services" description="Services are created only after paid orders or authorized provisioning jobs." />
      ) : (
        <div className="grid gap-4">
          {data.map((service) => (
            <Link key={service.id} href={`/portal/hosting/${service.id}`}>
              <Card>
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <h2 className="font-heading font-semibold">{service.primary_domain ?? "Service pending domain"}</h2>
                    <p className="text-sm text-muted">{service.hosting_plans?.name ?? service.service_type}</p>
                  </div>
                  <Badge tone={service.status === "active" ? "success" : "warning"}>{service.status}</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
