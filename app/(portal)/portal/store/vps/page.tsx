import { PackageGrid } from "@/components/public/package-grid";
import { PageHeading } from "@/components/portal/page-heading";
import { vpsPlans } from "@/lib/catalog";

export const metadata = { title: "Buy VPS" };

export default function PortalStoreVpsPage() {
  return (
    <>
      <PageHeading title="Buy VPS" description="Monthly Hetzner VPS plans with CyberPanel-ready provisioning jobs." />
      <PackageGrid plans={vpsPlans} purchaseRedirectTo="/portal/cart" />
    </>
  );
}
