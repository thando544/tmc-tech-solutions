import { PackageGrid } from "@/components/public/package-grid";
import { PageHeading } from "@/components/portal/page-heading";
import { websiteServicePlans } from "@/lib/catalog";

export const metadata = { title: "Website Services" };

export default function PortalStoreWebsiteServicesPage() {
  return (
    <>
      <PageHeading title="Website Services" description="Website setup and care services that create service requests instead of automatic hosting provisioning." />
      <PackageGrid plans={websiteServicePlans} purchaseRedirectTo="/portal/cart" />
    </>
  );
}
