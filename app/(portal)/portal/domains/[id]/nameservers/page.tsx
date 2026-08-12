import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeading } from "@/components/portal/page-heading";
import { defaultNameservers } from "@/lib/catalog";
import { getPortalContext } from "@/lib/db/portal";

export default async function DomainNameserversPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await getPortalContext();
  const { data: domain } = await supabase.from("domains").select("*").eq("user_id", user.id).eq("id", id).single();

  if (!domain) {
    notFound();
  }

  const { data: nameservers } = await supabase.from("domain_nameservers").select("*").eq("user_id", user.id).eq("domain_id", id).order("position");

  return (
    <>
      <PageHeading title={`Nameservers for ${domain.domain_name}`} description="View, update, or reset nameservers through server-side registrar integrations." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-heading text-xl font-semibold">Current nameservers</h2>
              <Badge tone="warning">Propagation warning</Badge>
            </div>
            <div className="mt-5 space-y-2 text-sm">
              {nameservers?.length ? nameservers.map((record) => <p key={record.id}>{record.hostname}</p>) : <p className="text-muted">No nameservers synced from registrar yet.</p>}
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">Nameserver changes can affect live DNS and may take 24-48 hours to fully propagate.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h2 className="font-heading text-xl font-semibold">Reset target</h2>
            <div className="mt-5 space-y-2 text-sm font-semibold">
              {defaultNameservers.map((nameserver) => (
                <p key={nameserver}>{nameserver}</p>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              Reset and update actions are prepared through `/api/nameservers` and require OpenSRS credentials before real registrar changes are sent.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
