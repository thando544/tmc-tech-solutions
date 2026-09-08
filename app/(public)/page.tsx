import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/marketing/cta-button";
import { ClientsSection } from "@/components/marketing/clients-section";
import { Container } from "@/components/marketing/container";
import { Section } from "@/components/marketing/section";
import { company, processSteps, websitePackages } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Websites, payments, and tourism systems",
  description: company.mission,
  path: "/"
});

const practices = [
  {
    href: "/services#websites",
    index: "01",
    title: "Websites",
    text: "A site that looks like the business, loads fast, and can be updated without calling us every week.",
    price: "From $2,400"
  },
  {
    href: "/services#payments",
    index: "02",
    title: "Payments",
    text: "Stripe and PayPal for overseas guests. Paynow, Flutterwave, and PayFast where local rails matter. Wired into the booking — not a plugin screenshot.",
    price: "From $1,200"
  },
  {
    href: "/tourism",
    index: "03",
    title: "Tourism systems",
    text: "Boat capacity, lodge calendars, tour quotes, activity desks, agent commissions, and transfers — plus the payments and WhatsApp that sit on top.",
    price: "From $5,400"
  }
] as const;

const facts = [
  { label: "Invoices", value: "USD" },
  { label: "Reply", value: "One working day" },
  { label: "Hours", value: "UK, EU, US, Africa" },
  { label: "Studio", value: "Victoria Falls" }
] as const;

export default function HomePage() {
  return (
    <>
      <section className="bg-white">
        <Container className="pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-28">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-brand uppercase">
            {company.location}
          </p>
          <h1 className="mt-5 max-w-4xl text-[2.35rem] leading-[1.08] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Websites that take bookings.
            <span className="mt-1 block text-brand">Systems that get you paid.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-muted md:text-lg">
            We design and build the site, connect the gateway, and ship the tourism system — for lodges, operators, and
            companies that sell to guests from anywhere.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTAButton href="/contact" size="lg">
              Request a quote <ArrowRight className="h-4 w-4" aria-hidden />
            </CTAButton>
            <CTAButton href="/services" variant="secondary" size="lg">
              Starting prices
            </CTAButton>
          </div>
        </Container>

        <div className="relative h-[52vw] min-h-[280px] max-h-[640px] w-full">
          <Image
            src="/images/victoria-falls-hero.jpg"
            alt="Victoria Falls, Zimbabwe — TMC Tech Solutions is based here"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
        </div>
        <Container>
          <p className="border-b border-border py-4 text-sm text-muted">
            Victoria Falls, Zimbabwe. Invoices in USD. The work is written so a buyer in the UK or EU can sign it
            without visiting first.
          </p>
        </Container>
      </section>

      <section className="border-b border-border bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
            {facts.map((fact) => (
              <div key={fact.label} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                <dt className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">{fact.label}</dt>
                <dd className="mt-2 text-base font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ClientsSection />

      <Section className="py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Practice</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Three things, done end to end</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Not content creation. Not a chatbot demo. The site, the rails, and the operations behind a booking.
          </p>
        </div>
        <ul className="mt-14">
          {practices.map((item) => (
            <li key={item.href} className="border-t border-border last:border-b">
              <Link
                href={item.href}
                className="group grid gap-4 py-8 md:grid-cols-[4.5rem_1fr_auto] md:items-baseline md:gap-10 md:py-10"
              >
                <span className="font-logo text-sm font-semibold tracking-[0.12em] text-brand">{item.index}</span>
                <span>
                  <span className="block text-2xl font-bold tracking-tight md:text-3xl">{item.title}</span>
                  <span className="mt-3 block max-w-xl text-sm leading-7 text-muted">{item.text}</span>
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground md:justify-end">
                  {item.price}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-secondary-background">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[560px]">
            <Image
              src="/images/victoria-falls-gorge.jpg"
              alt="The Zambezi gorge below Victoria Falls"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex items-center">
            <div className="px-6 py-16 md:px-12 md:py-24 lg:px-16">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Position</p>
              <h2 className="mt-3 max-w-md text-3xl font-bold tracking-tight md:text-4xl">
                Priced like a firm. Based at the Falls. Built for worldwide buyers.
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-muted">
                Cheap WordPress sites get rebuilt in eighteen months. We publish real starting prices so a serious
                buyer can plan. SEO and GEO are setup work, not a blog package. Payments are wired into the booking.
              </p>
              <div className="mt-8">
                <CTAButton href="/about" variant="secondary">
                  About the studio
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Fees</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Website catalogue, in USD</h2>
          </div>
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Full services and prices <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-12 border-t border-border">
          {websitePackages.map((item) => {
            const featured = "featured" in item && item.featured;
            return (
              <li
                key={item.slug}
                className="grid gap-2 border-b border-border py-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_auto] md:items-baseline md:gap-8"
              >
                <div>
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="mt-1 text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                    {featured ? "Most briefs · " : ""}
                    {item.timeline}
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted">{item.summary}</p>
                <p className="font-logo text-lg font-bold md:text-right">{item.price}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted">Starting prices. A written quote is the offer.</p>
      </Section>

      <Section muted className="py-20 md:py-28">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Process</p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">Brief, quote, build, launch</h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <p className="font-logo text-sm font-semibold tracking-[0.14em] text-brand">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="relative isolate overflow-hidden bg-navy">
        <Image
          src="/images/victoria-falls-rainbow.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <Container className="relative py-20 md:py-28">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/50 uppercase">TMC Tech Solutions</p>
          <h2 className="mt-4 max-w-xl text-3xl font-bold text-white md:text-5xl">Send the brief. We send a price.</h2>
          <p className="mt-4 max-w-lg text-base leading-8 text-white/70">{company.responseTime} No account required.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTAButton href="/contact" size="lg">
              Contact the studio <ArrowRight className="h-4 w-4" aria-hidden />
            </CTAButton>
            <CTAButton href="/book" variant="onPhotoGhost" size="lg">
              Pay a deposit
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
