import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Landmark, Smartphone } from "lucide-react";
import { BookingForm } from "@/components/marketing/booking-form";
import { PageIntro, Section } from "@/components/marketing/section";
import { bookingDeposits, company } from "@/content/site";
import { getSiteUrl } from "@/lib/agent/site";
import { pageMeta } from "@/lib/seo";
import { formatMoney } from "@/lib/utils";

const description =
  "Pay a USD project deposit to TMC Tech Solutions in Victoria Falls via Paynow. EcoCash, OneMoney, Visa and Mastercard are entered on Paynow — not on this site. No account required.";

export const metadata: Metadata = pageMeta({
  title: "Book a start date",
  description,
  path: "/book"
});

const steps = [
  { index: "01", title: "Choose the work", text: "Pick a deposit or the amount on your quote." },
  { index: "02", title: "Pay on Paynow", text: "EcoCash, OneMoney, or card. Card details stay on Paynow." },
  { index: "03", title: "We confirm", text: "Email within one working day. The deposit is applied to the project." }
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: getSiteUrl() },
        { "@type": "ListItem", position: 2, name: "Book", item: `${getSiteUrl()}/book` }
      ]
    },
    {
      "@type": "WebPage",
      "@id": `${getSiteUrl()}/book`,
      url: `${getSiteUrl()}/book`,
      name: "Book a start date",
      description,
      isPartOf: { "@type": "WebSite", name: company.name, url: getSiteUrl() }
    },
    {
      "@type": "OfferCatalog",
      name: "Project deposits",
      itemListElement: bookingDeposits.map((item) => ({
        "@type": "Offer",
        name: item.name,
        description: item.detail,
        price: (item.amountCents / 100).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${getSiteUrl()}/book`
      }))
    }
  ]
};

export default function BookPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageIntro
        eyebrow="Book"
        title="Pay a deposit. We put you on the calendar."
        description="No account. You pay on Paynow — EcoCash, OneMoney, or card. Card numbers never touch this site. The deposit is applied to the quoted project."
      />

      <Section className="py-10 md:py-12">
        <ol className="grid gap-6 border-b border-border pb-10 md:grid-cols-3 md:gap-10">
          {steps.map((step) => (
            <li key={step.index}>
              <p className="font-logo text-sm font-semibold tracking-[0.14em] text-brand">{step.index}</p>
              <h2 className="mt-3 text-lg font-bold">{step.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="pt-0! md:pt-0!">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_20rem] lg:items-start">
          <BookingForm />
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="border border-border bg-white p-6">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Paynow</p>
              <h2 className="mt-2 text-lg font-bold">How you pay</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex gap-3">
                  <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span>EcoCash and OneMoney on Paynow’s page</span>
                </li>
                <li className="flex gap-3">
                  <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span>Visa and Mastercard, if enabled on our Paynow profile</span>
                </li>
                <li className="flex gap-3">
                  <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span>USD. Merchant fees are Paynow’s, not ours</span>
                </li>
              </ul>
            </div>
            <div className="border border-border bg-secondary-background p-6 text-sm leading-7 text-muted">
              <p>
                Starting deposits from {formatMoney(bookingDeposits[0].amountCents)}. The written quote still governs
                scope if the work grows.
              </p>
              <p className="mt-4">
                <strong className="text-foreground">Test vs live.</strong> A Paynow test integration only accepts the
                merchant’s registered email. Live keys are required before guests can pay with their own address.
              </p>
              <p className="mt-4">
                Want a price first?{" "}
                <Link href="/contact" className="font-semibold text-brand">
                  Request a quote
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
