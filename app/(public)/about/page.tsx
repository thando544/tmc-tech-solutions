import { CTAButton } from "@/components/marketing/cta-button";
import { GlassCard } from "@/components/marketing/glass-card";
import { FadeIn, Stagger, StaggerItem } from "@/components/marketing/motion";
import { Section, SectionHeader } from "@/components/marketing/section";
import { company, values } from "@/content/site";

export const metadata = {
  title: "About",
  description: `Learn about ${company.name} — our mission, vision, and why we build with AI and modern technology.`
};

export default function AboutPage() {
  return (
    <>
      <Section className="!pt-16 md:!pt-24">
        <FadeIn>
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase">About</p>
          <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight md:text-5xl">
            Why TMC Tech Solutions exists
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Businesses are drowning in tools, manual work, and half-finished automation. We exist to help founders,
            operators, and creators ship intelligent software that creates leverage — not more complexity.
          </p>
        </FadeIn>
      </Section>

      <Section muted>
        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <GlassCard className="h-full">
              <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Mission</p>
              <p className="mt-4 text-lg leading-8 text-foreground">{company.mission}</p>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.08}>
            <GlassCard className="h-full">
              <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Vision</p>
              <p className="mt-4 text-lg leading-8 text-foreground">{company.vision}</p>
            </GlassCard>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Story"
          title="A technology partner for the AI era"
          description="TMC Tech Solutions started with a simple belief: modern companies deserve the same caliber of product engineering and AI fluency that top SaaS teams take for granted."
        />
        <FadeIn>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted">
            <p>
              We build custom software, AI systems, and automation platforms for teams that need more than a template or a
              chatbot demo. Our work sits at the intersection of product design, engineering, and operational reality.
            </p>
            <p>
              Whether you need an intelligent internal tool, a customer-facing product, or a long-term technical partner,
              we bring clarity, craft, and accountability from discovery through support.
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section muted>
        <SectionHeader eyebrow="Values" title="What guides every engagement" />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <GlassCard className="h-full">
                <h3 className="font-heading text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{value.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section dark>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold">Let’s build something intelligent</h2>
            <p className="mt-3 max-w-xl text-slate-300">Share your goals — we’ll respond with a clear next step.</p>
          </div>
          <CTAButton href="/contact" variant="onDark" size="lg">
            Contact us
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
