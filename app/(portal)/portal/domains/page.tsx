import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Domains" };

export default async function PortalDomainsPage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("domains").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

  return (
    <>
      <PageHeading title="Domains" description="Registered, transferred, and managed domain names." />
      {!data?.length ? (
        <EmptyState title="No domains" description="Domain records will appear after OpenSRS, HOSTAFRICA, or admin provisioning records a real domain." />
      ) : (
        <div className="grid gap-4">
          {data.map((domain) => (
            <Card key={domain.id}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <Link href={`/portal/domains/${domain.id}`} className="font-heading font-semibold hover:text-brand">
                    {domain.domain_name}
                  </Link>
                  <p className="text-sm text-muted">{domain.registrar}</p>
                </div>
                <Badge>{domain.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
