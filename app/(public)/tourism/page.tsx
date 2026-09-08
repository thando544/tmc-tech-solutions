import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/marketing/cta-button";
import { GlassCard } from "@/components/marketing/glass-card";
import { PageIntro, Section, SectionHeader } from "@/components/marketing/section";
import { paymentGateways, tourismProducts } from "@/content/site";

export const metadata = {
  title: "Tourism systems",
  description:
    "Booking engines, tour quotes, activity desks, agent portals, and transfer dispatch for lodges and operators selling to international guests."
};

export default function TourismPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tourism"
        title="Systems for rooms, activities, and itineraries"
        description="For lodges and operators who sell to guests from anywhere. Each line is a product we can scope and build."
      />

      <section className="relative h-[240px] border-b border-border md:h-[380px]">
        <Image
          src="/images/victoria-falls-rainbow.jpg"
          alt="Rainbow over Victoria Falls — tourism systems for operators selling this landscape"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </section>

      <Section>
        <SectionHeader
          eyebrow="Catalogue"
          title="What we build"
          description="Starting prices in USD. Final quotes follow a short brief."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {tourismProducts.map((item) => (
            <GlassCard key={item.slug} id={item.slug} className="h-full">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="shrink-0 font-bold text-brand">{item.price}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeader eyebrow="Payments" title="Rails guests already use" />
        <ul className="grid gap-4 md:grid-cols-2">
          {paymentGateways.slice(0, 4).map((item) => (
            <li key={item.name} className="border border-border bg-white p-5">
              <p className="font-bold">
                {item.name} · <span className="text-brand">{item.price}</span>
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section dark>
        <h2 className="max-w-2xl text-3xl font-bold">If you already have a live site, send the link</h2>
        <p className="mt-4 max-w-xl text-white/70">
          We will say whether you need a booking engine, a gateway, or a rebuild.
        </p>
        <div className="mt-8">
          <CTAButton href="/contact" size="lg">
            Send a brief <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
