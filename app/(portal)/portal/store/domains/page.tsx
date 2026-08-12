import { PackageGrid } from "@/components/public/package-grid";
import { PageHeading } from "@/components/portal/page-heading";
import { domainProducts } from "@/lib/catalog";

export const metadata = { title: "Buy Domain" };

export default function PortalStoreDomainsPage() {
  return (
    <>
      <PageHeading title="Buy Domain" description="Register yearly domain products through a server-side registrar-ready workflow." />
      <PackageGrid plans={domainProducts} purchaseRedirectTo="/portal/cart" />
    </>
  );
}
