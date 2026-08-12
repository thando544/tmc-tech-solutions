import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/portal/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPortalContext } from "@/lib/db/portal";

export default async function PortalHostingAccountPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await getPortalContext();

  const { data: account } = await supabase
    .from("hosting_accounts")
    .select("*, hosting_packages(name, slug, storage_gb, bandwidth_gb, websites_limit)")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!account) {
    notFound();
  }

  const panelUrl = account.panel_url ?? process.env.HOSTING_PANEL_URL ?? null;

  return (
    <>
      <PageHeading
        title={account.domain}
        description={account.hosting_packages?.name ?? "Hosting account"}
      />
      <div className="mb-6">
        <Badge tone={account.status === "active" ? "success" : "warning"}>{account.status}</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-5 text-sm">
            <h2 className="font-heading font-semibold">Account details</h2>
            <Row label="Domain" value={account.domain} />
            <Row label="Package" value={account.hosting_packages?.name ?? "—"} />
            <Row label="Server IP" value={account.server_ip ?? "Assigned after provisioning"} />
            <Row label="Status" value={account.status} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 p-5 text-sm">
            <h2 className="font-heading font-semibold">Panel & support</h2>
            {panelUrl ? (
              <p>
                <a href={panelUrl} target="_blank" rel="noreferrer" className="font-medium text-cta hover:underline">
                  Open hosting control panel
                </a>
              </p>
            ) : (
              <p className="text-muted">Panel URL will appear once your account is fully provisioned.</p>
            )}
            <p className="text-muted">
              For DNS, email, SSL, and backup tasks, use the portal sections or contact support if you need assistance.
            </p>
            <Link href="/portal/support" className="inline-block font-medium text-cta hover:underline">
              Open support
            </Link>
          </CardContent>
        </Card>
        {account.hosting_packages ? (
          <Card className="md:col-span-2">
            <CardContent className="grid gap-2 p-5 text-sm sm:grid-cols-3">
              <Row label="Websites" value={String(account.hosting_packages.websites_limit)} />
              <Row label="Storage" value={`${account.hosting_packages.storage_gb} GB`} />
              <Row label="Bandwidth" value={`${account.hosting_packages.bandwidth_gb} GB`} />
            </CardContent>
          </Card>
        ) : null}
      </div>
      <Link href="/portal/hosting" className="mt-8 inline-block text-sm font-medium text-cta hover:underline">
        ← Back to hosting
      </Link>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-2 last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
