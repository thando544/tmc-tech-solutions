import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/marketing/cta-button";
import { GlassCard } from "@/components/marketing/glass-card";
import { PageIntro, Section, SectionHeader } from "@/components/marketing/section";
import { bookingJourney, paymentGateways, tourismLayers, tourismProducts } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Tourism systems",
  description:
    "Website, operations, payments, and WhatsApp for lodges, boat cruises, and operators selling to international guests. Booking engines, quotes, activity desks, and agent portals.",
  path: "/tourism"
});

const operations = tourismProducts.filter((item) => item.layer === "operations");
const whatsapp = tourismProducts.filter((item) => item.layer === "whatsapp");

export default function TourismPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tourism"
        title="Website, operations, payments, WhatsApp"
        description="Four layers, one system. Guests book. The desk sees remaining seats. Money lands. WhatsApp confirms. Built for lodges, boat cruises, and operators who sell to guests from anywhere."
      />

      <section className="relative h-60 border-b border-border md:h-95">
        <Image
          src="/images/victoria-falls-rainbow.jpg"
          alt="Rainbow over Victoria Falls from the walkway"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </section>

      <Section id="layers">
        <SectionHeader
          eyebrow="How the work is stacked"
          title="A site without operations still double-books"
          description="Pick a layer or take the path. Starting prices in USD. Final quotes follow a short brief."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {tourismLayers.map((layer) => (
            <Link key={layer.slug} href={layer.href} className="block">
              <GlassCard hover className="h-full">
                <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{layer.index}</p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <h2 className="text-lg font-bold">{layer.title}</h2>
                  <p className="shrink-0 font-bold text-brand">{layer.price}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">{layer.text}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Section>

      <Section muted id="booking-path">
        <SectionHeader
          eyebrow="How a booking moves"
          title="Enquire is not the product. This is."
          description="The same path for a sunset cruise, a lodge night, or a rafting slot."
        />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {bookingJourney.map((step) => (
            <li key={step.index} className="border border-border bg-white p-5">
              <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{step.index}</p>
              <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="operations">
        <SectionHeader
          eyebrow="Operations"
          title="What the desk actually runs"
          description="Boat capacity, rooms, quotes, agents, transfers. Each line is a product we can scope and build."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {operations.map((item) => (
            <GlassCard key={item.slug} id={item.slug} className="h-full" featured={item.slug === "boat-cruise"}>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="shrink-0 font-bold text-brand">{item.price}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section muted id="whatsapp">
        <SectionHeader eyebrow="WhatsApp" title="Confirmations people actually read" />
        <div className="grid gap-4 md:grid-cols-2">
          {whatsapp.map((item) => (
            <GlassCard key={item.slug} id={item.slug} className="h-full">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="shrink-0 font-bold text-brand">{item.price}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
            </GlassCard>
          ))}
          <GlassCard className="h-full">
            <h2 className="text-lg font-bold">What gets sent</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Booking received, remaining balance, pickup time, weather cancel. The guest and the operations phone see
              the same message. Not a chatbot demo.
            </p>
          </GlassCard>
        </div>
      </Section>

      <Section id="payments">
        <SectionHeader
          eyebrow="Payments"
          title="Rails guests already use"
          description="International cards and local mobile money on the same booking. Merchant fees stay with the gateway."
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {paymentGateways.map((item) => (
            <li key={item.name} className="border border-border bg-white p-5">
              <p className="font-bold">
                {item.name} · <span className="text-brand">{item.price}</span>
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 border border-border bg-secondary-background p-5 text-sm leading-7 text-muted">
          <p className="font-semibold text-foreground">Paynow test vs live</p>
          <p className="mt-2">
            A test integration only accepts the merchant’s registered Paynow email. Real guests need a{" "}
            <strong className="text-foreground">live</strong> Integration ID and key. Until you switch that in the
            Paynow dashboard, checkout will reject any other address.
          </p>
        </div>
      </Section>

      <Section dark>
        <h2 className="max-w-2xl text-3xl font-bold">If you already have a live site, send the link</h2>
        <p className="mt-4 max-w-xl text-white/70">
          We will say whether you need a website, a booking engine, a gateway, or the WhatsApp layer.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/contact" size="lg">
            Send a brief <ArrowRight className="h-4 w-4" />
          </CTAButton>
          <CTAButton href="/book" variant="onPhotoGhost" size="lg">
            Pay a deposit
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
