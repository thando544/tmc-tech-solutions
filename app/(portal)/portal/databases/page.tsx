import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Databases" };

export default async function DatabasesPage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("databases").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

  return (
    <>
      <PageHeading title="Databases" description="MySQL databases provisioned through hosting automation and CyberPanel integration." />
      {!data?.length ? (
        <EmptyState title="No databases" description="Databases appear after real provisioning or provider sync." />
      ) : (
        <div className="grid gap-4">
          {data.map((database) => (
            <Card key={database.id}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <h2 className="font-heading font-semibold">{database.database_name}</h2>
                  <p className="text-sm text-muted">{database.engine} · {database.size_mb} MB</p>
                </div>
                <Badge>{database.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
