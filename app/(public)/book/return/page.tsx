import { Suspense } from "react";
import { Container } from "@/components/marketing/container";
import { BookingReturn } from "@/components/marketing/booking-return";

export const metadata = {
  title: "Payment status",
  robots: { index: false, follow: false }
};

export default function BookReturnPage() {
  return (
    <section className="border-b border-border bg-white">
      <Container className="py-16 md:py-24">
        <Suspense fallback={<p className="text-muted">Loading payment status…</p>}>
          <BookingReturn />
        </Suspense>
      </Container>
    </section>
  );
}
