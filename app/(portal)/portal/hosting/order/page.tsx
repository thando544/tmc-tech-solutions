import Link from "next/link";
import { redirect } from "next/navigation";
import { HostingOrderForm } from "@/components/hosting/order-form";
import { PageHeading } from "@/components/portal/page-heading";
import { formatHostingPrice } from "@/lib/hosting/format";
import { getHostingPackageBySlug } from "@/lib/hosting/service";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Order Hosting" };

export default async function PortalHostingOrderPage({
  searchParams
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  await getPortalContext();
  const { package: packageSlug } = await searchParams;

  if (!packageSlug) {
    redirect("/hosting");
  }

  const pkg = await getHostingPackageBySlug(packageSlug);
  if (!pkg) {
    redirect("/hosting");
  }

  const price = formatHostingPrice(pkg);

  return (
    <>
      <PageHeading
        title={`Order ${pkg.name}`}
        description="Submit your domain for review. Your hosting account is created after admin approval and provisioning."
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-lg border border-border bg-white p-6">
          <h2 className="font-heading text-lg font-semibold">Package summary</h2>
          <p className="mt-2 text-sm text-muted">{pkg.description}</p>
          <p className="mt-4 font-heading text-2xl font-bold text-navy">{price.label}</p>
          <ul className="mt-4 space-y-1 text-sm text-muted">
            <li>{pkg.websites_limit} website(s)</li>
            <li>{pkg.storage_gb} GB storage · {pkg.bandwidth_gb} GB bandwidth</li>
            <li>{pkg.email_accounts_limit} email accounts · {pkg.databases_limit} databases</li>
          </ul>
          <Link href={`/hosting/${pkg.slug}`} className="mt-4 inline-block text-sm font-medium text-cta hover:underline">
            View public plan details
          </Link>
        </div>
        <HostingOrderForm pkg={pkg} />
      </div>
    </>
  );
}
