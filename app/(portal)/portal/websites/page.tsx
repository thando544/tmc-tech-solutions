import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Websites" };

export default async function WebsitesPage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("websites").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

  return (
    <>
      <PageHeading title="Websites" description="Hosted websites connected to services, SSL, backups, databases, PHP versions, and WordPress installs." />
      {!data?.length ? (
        <EmptyState title="No websites" description="Websites appear after a real hosting service is provisioned or a CyberPanel website is synced." />
      ) : (
        <div className="grid gap-4">
          {data.map((site) => (
            <Card key={site.id}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <h2 className="font-heading font-semibold">{site.domain_name}</h2>
                  <p className="text-sm text-muted">PHP {site.php_version ?? "not set"}</p>
                </div>
                <Badge tone={site.status === "active" ? "success" : "warning"}>{site.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
