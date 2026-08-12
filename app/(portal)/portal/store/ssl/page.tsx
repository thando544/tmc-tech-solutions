import { PackageGrid } from "@/components/public/package-grid";
import { PageHeading } from "@/components/portal/page-heading";
import { sslProducts } from "@/lib/catalog";

export const metadata = { title: "Buy SSL" };

export default function PortalStoreSslPage() {
  return (
    <>
      <PageHeading title="Buy SSL" description="Yearly SSL products with server-side certificate provisioning workflows." />
      <PackageGrid plans={sslProducts} purchaseRedirectTo="/portal/cart" />
    </>
  );
}
