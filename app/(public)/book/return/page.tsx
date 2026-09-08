import { Suspense } from "react";
import { Container } from "@/components/marketing/container";
import { BookingReturn } from "@/components/marketing/booking-return";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Payment status",
  description: "Paynow deposit confirmation for TMC Tech Solutions. This page is not indexed.",
  path: "/book/return",
  index: false,
  canonicalPath: "/book"
});

export default function BookReturnPage() {
  return (
    <section className="border-b border-border bg-secondary-background">
      <Container className="py-16 md:py-24">
        <Suspense
          fallback={
            <div className="mx-auto max-w-lg border border-border bg-white p-8 text-muted">Confirming payment…</div>
          }
        >
          <BookingReturn />
        </Suspense>
      </Container>
    </section>
  );
}
