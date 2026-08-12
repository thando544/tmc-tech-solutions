import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "SSL" };

export default async function SslManagementPage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("ssl_certificates").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

  return (
    <>
      <PageHeading title="SSL management" description="Free, premium, and wildcard SSL certificates with issue, renewal, and expiry tracking." />
      {!data?.length ? (
        <EmptyState title="No SSL certificates" description="Certificates appear after domains or websites are provisioned and SSL automation runs." />
      ) : (
        <div className="grid gap-4">
          {data.map((certificate) => (
            <Card key={certificate.id}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <h2 className="font-heading font-semibold">{certificate.common_name}</h2>
                  <p className="text-sm text-muted">{certificate.issuer ?? "Issuer pending"}</p>
                </div>
                <Badge tone={certificate.status === "issued" ? "success" : "warning"}>{certificate.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
