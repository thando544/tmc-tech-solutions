import Image from "next/image";
import { CTAButton } from "@/components/marketing/cta-button";
import { ClientsSection } from "@/components/marketing/clients-section";
import { GlassCard } from "@/components/marketing/glass-card";
import { PageIntro, Section, SectionHeader } from "@/components/marketing/section";
import { company, values } from "@/content/site";

export const metadata = {
  title: "About",
  description: `TMC Tech Solutions is a Victoria Falls studio that builds websites, payment integrations, and tourism systems for international clients.`
};

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="TMC Tech Solutions" description={company.mission} />

      <section className="relative h-[240px] border-b border-border md:h-[380px]">
        <Image
          src="/images/victoria-falls-gorge.jpg"
          alt="The Zambezi gorge below Victoria Falls"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          <GlassCard className="h-full">
            <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">What we do</p>
            <p className="mt-4 text-lg leading-8">
              Websites, payment gateways, SEO and GEO, and the booking systems behind a lodge or operator site.
            </p>
          </GlassCard>
          <GlassCard className="h-full">
            <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">What we do not do</p>
            <p className="mt-4 text-lg leading-8">
              Content creation, social posting, or chatbot theatre. AI only when it is wired into a payment, booking, or
              operations workflow.
            </p>
          </GlassCard>
        </div>
      </Section>

      <Section muted>
        <SectionHeader
          eyebrow="Place"
          title="Victoria Falls, working worldwide"
          description={`${company.location}. ${company.serviceArea}`}
        />
        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted">
          <p>
            The studio is here. The mark is black and blue. Quotes are in USD. The work is written so a buyer in the UK
            or EU can sign it without visiting first.
          </p>
        </div>
      </Section>

      <ClientsSection />

      <Section>
        <SectionHeader eyebrow="Values" title="How the work is run" />
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((value) => (
            <GlassCard key={value.title} className="h-full">
              <h3 className="text-lg font-bold">{value.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{value.text}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Work with the studio</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Send a brief. We reply with a scoped price in USD.
            </p>
          </div>
          <CTAButton href="/contact" size="lg">
            Contact us
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
