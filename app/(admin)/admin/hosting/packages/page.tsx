import Link from "next/link";
import { CyberPanelStatus } from "@/components/admin/cyberpanel-status";
import { createAdminClient } from "@/lib/supabase/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatHostingPrice } from "@/lib/hosting/format";

export const metadata = { title: "Admin · Hosting packages" };

export default async function AdminHostingPackagesPage() {
  const admin = createAdminClient();
  const { data: packages } = await admin
    .from("hosting_packages")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <>
      <CyberPanelStatus />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Hosting packages</h1>
          <p className="text-sm text-muted">Customer-facing plans. CyberPanel package names are internal only.</p>
        </div>
        <Button asChild variant="cta">
          <Link href="/admin/hosting/packages/new">New package</Link>
        </Button>
      </div>
      <div className="grid gap-4">
        {(packages ?? []).map((pkg) => {
          const price = formatHostingPrice(pkg);
          return (
            <Card key={pkg.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading font-semibold">{pkg.name}</h2>
                    {!pkg.is_active ? <Badge tone="warning">Inactive</Badge> : null}
                    {pkg.is_featured ? <Badge tone="success">Featured</Badge> : null}
                  </div>
                  <p className="text-sm text-muted">
                    {price.label} · CP: <span className="font-mono text-xs">{pkg.cyberpanel_package_name}</span>
                  </p>
                </div>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/admin/hosting/packages/${pkg.id}/edit`}>Edit</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
