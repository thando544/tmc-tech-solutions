import { CartView } from "@/components/cart/cart-view";
import { PageHeading } from "@/components/portal/page-heading";

export const metadata = { title: "Cart" };

export default function PortalCartPage() {
  return (
    <>
      <PageHeading title="Cart" description="Review hosting, domains, email, VPS, SSL, website services, and development requests before checkout." />
      <CartView mode="portal" checkoutHref="/portal/checkout" />
    </>
  );
}
