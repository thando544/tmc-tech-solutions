import { Clock3, Globe, Mail, WalletCards } from "lucide-react";
import { MarketingContactForm } from "@/components/marketing/contact-form";
import { CTAButton } from "@/components/marketing/cta-button";
import { GlassCard } from "@/components/marketing/glass-card";
import { PageIntro, Section } from "@/components/marketing/section";
import { company, faq, processSteps } from "@/content/site";

export const metadata = {
  title: "Contact",
  description: `Request a quote from ${company.name}. ${company.responseTime}`
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Send a brief. We send a scoped price."
        description="Email or the form. We reply with what we would build, in USD, and what it costs."
      />

      <Section>
        <ol className="grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title} className="border border-border bg-white p-5">
              <p className="text-xs font-bold text-brand">0{index + 1}</p>
              <h2 className="mt-2 text-lg font-bold">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section muted className="pt-8!">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-bold">Project brief</h2>
            <p className="mt-2 mb-6 text-sm leading-7 text-muted">
              Live URL if you have one, who the guests are, and whether you need a site, a gateway, or a tourism system.
            </p>
            <MarketingContactForm />
          </div>
          <div className="space-y-4">
            <GlassCard>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <p className="font-bold">Email</p>
                  <a href={`mailto:${company.email}`} className="mt-1 block text-sm text-muted hover:text-brand">
                    {company.email}
                  </a>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <p className="font-bold">Response</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{company.responseTime}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{company.workingHours}</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex gap-3">
                <Globe className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <p className="font-bold">Studio</p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {company.location}. {company.serviceArea}
                  </p>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex gap-3">
                <WalletCards className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <p className="font-bold">Pay a deposit</p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    Book a start date with Paynow — EcoCash, OneMoney, or card. No account.
                  </p>
                  <div className="mt-3">
                    <CTAButton href="/book" size="sm">
                      Go to Paynow checkout
                    </CTAButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold">Before you write</h2>
        <dl className="mt-8 grid gap-6 md:grid-cols-2">
          {faq.map((item) => (
            <div key={item.question} className="border border-border bg-white p-5">
              <dt className="font-bold">{item.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
