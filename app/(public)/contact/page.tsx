import { MapPin, Mail, Youtube } from "lucide-react";
import { MarketingContactForm } from "@/components/marketing/contact-form";
import { GlassCard } from "@/components/marketing/glass-card";
import { FadeIn } from "@/components/marketing/motion";
import { OfficeMap } from "@/components/marketing/office-map";
import { Section } from "@/components/marketing/section";
import { company, socialLinks } from "@/content/site";

export const metadata = {
  title: "Contact",
  description: `Contact ${company.name} for AI solutions, custom software, and automation projects.`
};

export default function ContactPage() {
  const youtube = socialLinks.find((item) => item.label === "YouTube");

  return (
    <>
      <Section className="!pt-16 md:!pt-24 !pb-10">
        <FadeIn>
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase">Contact</p>
          <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Let’s talk about what you’re building
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Share a short brief. We’ll respond with next steps for discovery, scoping, or partnership.
          </p>
        </FadeIn>
      </Section>

      <Section muted className="!pt-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn>
            <MarketingContactForm />
          </FadeIn>
          <div className="space-y-5">
            <FadeIn delay={0.06}>
              <GlassCard className="bg-white">
                <div className="flex gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Business email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="mt-1 block text-sm font-medium text-slate-600 transition hover:text-brand"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <GlassCard className="bg-white">
                <div className="flex gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{company.location}</p>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
            {youtube ? (
              <FadeIn delay={0.14}>
                <GlassCard className="bg-white">
                  <div className="flex gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Youtube className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">YouTube</p>
                      <a
                        href={youtube.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block text-sm font-medium text-slate-600 transition hover:text-brand"
                      >
                        Watch our channel
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            ) : null}
            <FadeIn delay={0.18}>
              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <OfficeMap className="h-[280px] w-full md:h-[320px]" />
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>
    </>
  );
}
