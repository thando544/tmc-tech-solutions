import { PackageGrid } from "@/components/public/package-grid";
import { PageHeading } from "@/components/portal/page-heading";
import { emailPlans } from "@/lib/catalog";

export const metadata = { title: "Buy Email Hosting" };

export default function PortalStoreEmailPage() {
  return (
    <>
      <PageHeading title="Buy Email Hosting" description="Business email plans billed monthly with clear mailbox limits." />
      <PackageGrid plans={emailPlans} purchaseRedirectTo="/portal/cart" />
    </>
  );
}
