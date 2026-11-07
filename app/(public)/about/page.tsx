import Image from "next/image";
import { CTAButton } from "@/components/marketing/cta-button";
import { ClientsSection } from "@/components/marketing/clients-section";
import { GlassCard } from "@/components/marketing/glass-card";
import { PageIntro, Section, SectionHeader } from "@/components/marketing/section";
import { company, values } from "@/content/site";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "TMC Tech Solutions is a Victoria Falls studio that builds websites, payment integrations, and tourism systems for international clients.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="TMC Tech Solutions" description={company.mission} />

      <section className="relative h-60 border-b border-border md:h-95">
        <Image
          src="/images/victoria-falls-gorge.jpg"
          alt="The Zambezi gorge below Victoria Falls, seen from the rainforest trail"
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
            The studio works from Victoria Falls with lodges, operators, and companies across Africa, the UK, and Europe.
            Quotes are in USD and written so a buyer can sign without visiting first.
          </p>
          <p>
            Every project is run by the TMC team under one written scope: one point of contact, weekly check-ins, and a
            handover your staff can use. Reach us at{" "}
            <a href={`mailto:${company.email}`} className="font-semibold text-brand">
              {company.email}
            </a>{" "}
            or{" "}
            <a href={`tel:${company.phone}`} className="font-semibold text-brand">
              {company.phoneDisplay}
            </a>
            .
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
