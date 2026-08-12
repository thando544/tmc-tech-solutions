import { PackageGrid } from "@/components/public/package-grid";
import { PageHeading } from "@/components/portal/page-heading";
import { mobileAppPlans } from "@/lib/catalog";

export const metadata = { title: "Mobile App Development" };

export default function PortalStoreMobileAppPage() {
  return (
    <>
      <PageHeading title="Mobile App Development" description="Professional custom app packages. Checkout creates a project request, not hosting provisioning." />
      <PackageGrid plans={mobileAppPlans} purchaseRedirectTo="/portal/cart" />
    </>
  );
}
