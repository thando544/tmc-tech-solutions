import { CheckoutForm } from "@/components/cart/checkout-form";
import { PageHeading } from "@/components/portal/page-heading";

export const metadata = { title: "Checkout" };

export default function PortalCheckoutPage() {
  return (
    <>
      <PageHeading title="Checkout" description="Create an order, invoice, and the required provisioning or project request records." />
      <CheckoutForm mode="portal" />
    </>
  );
}
