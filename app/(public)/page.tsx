import { ArrowRight, Check } from "lucide-react";
import { CTAButton } from "@/components/marketing/cta-button";
import { GlassCard } from "@/components/marketing/glass-card";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { FadeIn, Stagger, StaggerItem } from "@/components/marketing/motion";
import { Section, SectionHeader } from "@/components/marketing/section";
import { Container } from "@/components/marketing/container";
import { company, services, techStack, testimonials, trustedBy, whyChooseUs } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <FadeIn>
              <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-brand uppercase">TMC Tech Solutions</p>
              <h1 className="max-w-xl font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {company.tagline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{company.mission}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contact" size="lg">
                  Start a project <ArrowRight className="h-4 w-4" aria-hidden />
                </CTAButton>
                <CTAButton href="/services" variant="secondary" size="lg">
                  Explore services
                </CTAButton>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.12} className="lg:justify-self-end">
            <HeroVisual />
          </FadeIn>
        </Container>
      </section>

      <Section muted className="!py-12">
        <FadeIn>
          <p className="text-center text-sm font-medium tracking-[0.14em] text-muted uppercase">
            Trusted by teams building the future
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBy.map((item) => (
              <span key={item} className="font-heading text-lg font-semibold text-slate-500">
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Services"
          title="Capabilities that move businesses forward"
          description="From AI systems to custom software and cloud architecture — we design and ship what modern companies need."
        />
        <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <GlassCard className="h-full">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{service.description}</p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
        <div className="mt-10">
          <CTAButton href="/services" variant="secondary">
            View all services <ArrowRight className="h-4 w-4" aria-hidden />
          </CTAButton>
        </div>
      </Section>

      <Section muted>
        <SectionHeader
          eyebrow="Why TMC"
          title="Premium engineering with business leverage"
          description="We combine product craft, AI fluency, and reliable delivery so your team ships smarter — not just faster."
        />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {whyChooseUs.map((item) => (
            <StaggerItem key={item.title}>
              <GlassCard className="h-full">
                <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Technology"
          title="A modern stack for durable products"
          description="We choose proven tools and keep systems maintainable as you scale."
          align="center"
        />
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Testimonials"
          title="Teams that trust our craft"
          description="A sample of the outcomes we aim to deliver for founders and operators."
        />
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.name}>
              <GlassCard className="h-full">
                <p className="text-sm leading-7 text-foreground">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted">{item.role}</p>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section dark>
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-blue-300 uppercase">Next step</p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Ready to build with AI and modern software?
            </h2>
            <p className="mt-4 max-w-xl text-slate-200">
              Tell us about your product, automation goals, or platform idea — we’ll map a clear path to ship.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-200">
              {["Discovery call", "Technical proposal", "Scoped delivery"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-300" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <CTAButton href="/contact" variant="onDark" size="lg">
            Book a consultation
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
