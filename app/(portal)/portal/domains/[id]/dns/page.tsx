import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { dnsRecordTypes } from "@/lib/catalog";
import { getPortalContext } from "@/lib/db/portal";

export default async function DomainDnsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await getPortalContext();
  const { data: domain } = await supabase.from("domains").select("*").eq("user_id", user.id).eq("id", id).single();

  if (!domain) {
    notFound();
  }

  const { data: zones } = await supabase.from("dns_zones").select("*, dns_records(*)").eq("user_id", user.id).eq("domain_id", id);
  const records = zones?.flatMap((zone) => zone.dns_records ?? []) ?? [];

  return (
    <>
      <PageHeading title={`DNS for ${domain.domain_name}`} description="Add, edit, delete, validate, and audit DNS records through server-side provider routes." />
      <Card>
        <CardContent className="p-5">
          <h2 className="font-heading text-xl font-semibold">Supported record types</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {dnsRecordTypes.map((type) => (
              <Badge key={type}>{type}</Badge>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Changes require confirmation and may take time to propagate. MX priority is required for MX records; TTL must be between 60 and 86400 seconds.
          </p>
        </CardContent>
      </Card>
      <div className="mt-6">
        {!records.length ? (
          <EmptyState title="No DNS records synced" description="DNS records will appear after a real zone exists or a provider sync imports records. No placeholder DNS records are shown." />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border bg-white">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead className="bg-secondary-background text-left">
                <tr>
                  <th className="border-b border-border p-4">Type</th>
                  <th className="border-b border-border p-4">Name</th>
                  <th className="border-b border-border p-4">Value</th>
                  <th className="border-b border-border p-4">TTL</th>
                  <th className="border-b border-border p-4">Priority</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td className="border-b border-border p-4 font-semibold">{record.type}</td>
                    <td className="border-b border-border p-4 text-muted">{record.name}</td>
                    <td className="border-b border-border p-4 text-muted">{record.value}</td>
                    <td className="border-b border-border p-4 text-muted">{record.ttl}</td>
                    <td className="border-b border-border p-4 text-muted">{record.priority ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
