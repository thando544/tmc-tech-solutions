import Link from "next/link";
import { HostingPackageCard } from "@/components/hosting/package-card";
import { PageHeading } from "@/components/portal/page-heading";
import { listActiveHostingPackages } from "@/lib/hosting/service";

export const metadata = { title: "Buy Hosting" };
export const dynamic = "force-dynamic";

export default async function PortalStoreHostingPage() {
  const packages = await listActiveHostingPackages();

  return (
    <>
      <PageHeading
        title="Buy Hosting"
        description="Choose a hosting package, then submit your domain for admin review and provisioning."
      />
      {packages.length === 0 ? (
        <p className="text-muted">No hosting packages are available right now.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => (
            <HostingPackageCard
              key={pkg.id}
              pkg={pkg}
              ctaHref={`/portal/hosting/order?package=${pkg.slug}`}
              ctaLabel="Order hosting"
            />
          ))}
        </div>
      )}
      <Link href="/hosting" className="mt-8 inline-block text-sm font-medium text-cta hover:underline">
        View public hosting comparison
      </Link>
    </>
  );
}
