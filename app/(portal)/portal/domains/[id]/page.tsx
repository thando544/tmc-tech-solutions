import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export default async function PortalDomainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("domains").select("*").eq("user_id", user.id).eq("id", id).single();

  if (!data) {
    notFound();
  }

  return (
    <>
      <PageHeading title={data.domain_name} description="Domain renewal, DNS, nameserver, and transfer-ready management." />
      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted">Status</p>
            <div className="mt-2">
              <Badge tone={data.status === "active" ? "success" : "warning"}>{data.status}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted">Registrar</p>
            <p className="mt-2 font-heading text-xl font-semibold">{data.registrar}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted">Auto renew</p>
            <p className="mt-2 font-heading text-xl font-semibold">{data.auto_renew ? "Enabled" : "Disabled"}</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Button asChild variant="secondary">
          <Link href={`/portal/domains/${data.id}/dns`}>Manage DNS</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/portal/domains/${data.id}/nameservers`}>Manage Nameservers</Link>
        </Button>
      </div>
    </>
  );
}
