import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/marketing/cta-button";
import { GlassCard } from "@/components/marketing/glass-card";
import { FadeIn, Stagger, StaggerItem } from "@/components/marketing/motion";
import { Section, SectionHeader } from "@/components/marketing/section";
import { company, services } from "@/content/site";

export const metadata = {
  title: "Services",
  description: `AI, software, automation, and cloud services from ${company.name}.`
};

export default function ServicesPage() {
  return (
    <>
      <Section className="!pt-16 md:!pt-24">
        <FadeIn>
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase">Services</p>
          <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight md:text-5xl">
            Technology services for ambitious teams
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            End-to-end capabilities across AI, product engineering, automation, and cloud — designed for businesses that
            need leverage, not noise.
          </p>
        </FadeIn>
      </Section>

      <Section muted className="!pt-8">
        <Stagger className="grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <GlassCard id={service.slug} className="h-full scroll-mt-28">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h2 className="font-heading text-xl font-semibold">{service.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted">{service.description}</p>
                  <ul className="mt-5 space-y-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="text-sm font-medium text-foreground">
                        · {benefit}
                      </li>
                    ))}
                  </ul>
                  <CTAButton href="/contact" variant="secondary" size="sm" className="mt-6">
                    Discuss this service <ArrowRight className="h-4 w-4" />
                  </CTAButton>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section dark>
        <SectionHeader
          light
          eyebrow="Engage"
          title="Not sure where to start?"
          description="We’ll help you choose the right mix of AI, product, and automation for your stage."
        />
        <CTAButton href="/contact" variant="onDark" size="lg">
          Talk to an engineer
        </CTAButton>
      </Section>
    </>
  );
}
