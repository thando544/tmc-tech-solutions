import type { Metadata } from "next";
import { BookingForm } from "@/components/marketing/booking-form";
import { PageIntro, Section } from "@/components/marketing/section";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a start date",
  description: `Pay a USD deposit with Paynow to book a project with ${company.name}. EcoCash, OneMoney, or card.`
};

export default function BookPage() {
  return (
    <>
      <PageIntro
        eyebrow="Book"
        title="Pay a deposit. We put you on the calendar."
        description="No account. Paynow takes EcoCash, OneMoney, and cards. The deposit is applied to the quoted project. If you only want a price first, send a brief instead."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <BookingForm />
          <div className="space-y-6 text-sm leading-7 text-muted">
            <div>
              <h2 className="text-lg font-bold text-foreground">How it works</h2>
              <ol className="mt-3 space-y-2">
                <li>1. Choose the work and pay the deposit on Paynow.</li>
                <li>2. We confirm by email within one working day.</li>
                <li>3. The written quote still governs scope if it grows.</li>
              </ol>
            </div>
            <p>
              Paynow is Zimbabwe’s gateway. International cards can still go through if your Paynow account allows them.
              Merchant fees are Paynow’s, not ours.
            </p>
            <p>
              Prefer to talk first?{" "}
              <a href="/contact" className="font-semibold text-brand">
                Request a quote
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
