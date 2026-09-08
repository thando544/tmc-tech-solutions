import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/marketing/cta-button";
import { GlassCard } from "@/components/marketing/glass-card";
import { PageIntro, Section, SectionHeader } from "@/components/marketing/section";
import {
  company,
  integrationServices,
  paymentGateways,
  seoRetainers,
  setupPackages,
  websitePackages
} from "@/content/site";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services and prices",
  description:
    "Website packages, payment gateway integration, SEO and GEO setup, speed work, and WordPress migrations from TMC Tech Solutions in Victoria Falls.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="A catalogue you can budget against"
        description="Website builds, payment rails, SEO, GEO, speed, and leaving WordPress. AI only as integration into a real workflow — never as content creation."
      />

      <Section id="websites">
        <SectionHeader
          eyebrow="Websites"
          title="New sites"
          description="Every package includes mobile layout, an enquiry path, and a speed pass. Bookings & payments includes the first gateway."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {websitePackages.map((item) => (
            <GlassCard key={item.slug} id={item.slug} className="h-full" featured={"featured" in item && item.featured}>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-xl font-extrabold text-brand">{item.price}</p>
              </div>
              <p className="mt-1 text-sm tracking-wide text-brand">
                {"featured" in item && item.featured ? "Most teams buy this · " : ""}
                {item.timeline}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
              <ul className="mt-5 space-y-2">
                {item.includes.map((line) => (
                  <li key={line} className="text-sm leading-6 text-foreground">
                    {line}
                  </li>
                ))}
              </ul>
              <CTAButton href="/contact" variant="secondary" size="sm" className="mt-6">
                Request this package <ArrowRight className="h-4 w-4" />
              </CTAButton>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section muted id="payments">
        <SectionHeader
          eyebrow="Payments"
          title="Gateway integration"
          description="Priced to add a rail to an existing site. On a TMC bookings build, the first gateway is included."
        />
        <div className="overflow-x-auto border border-border bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-secondary-background text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Gateway</th>
                <th className="px-5 py-3 font-semibold">Integration</th>
                <th className="px-5 py-3 font-semibold">What it is for</th>
              </tr>
            </thead>
            <tbody>
              {paymentGateways.map((item) => (
                <tr key={item.name} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-semibold text-foreground">{item.name}</td>
                  <td className="px-5 py-4 text-foreground">{item.price}</td>
                  <td className="px-5 py-4 text-muted">{item.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="setup">
        <SectionHeader
          eyebrow="Setup"
          title="SEO, GEO, speed, and leaving WordPress"
          description="GEO here means generative engine optimisation — being cited in AI answers — not a writing service."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {setupPackages.map((item) => (
            <GlassCard key={item.slug} id={item.slug} className="h-full">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="shrink-0 text-sm font-semibold">{item.price}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-bold">SEO retainers</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
            Setup is a project. Ranking after that is a monthly job. We do not write blog posts as the product.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {seoRetainers.map((item) => (
              <GlassCard key={item.name} className="h-full">
                <p className="text-lg font-bold">{item.name}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{item.price}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      <Section muted id="integrations">
        <SectionHeader
          eyebrow="Integrations"
          title="AI and payments on systems you already run"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {integrationServices.map((item) => (
            <GlassCard key={item.slug} id={item.slug} className="h-full">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="shrink-0 text-sm font-semibold">{item.price}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section dark>
        <p className="text-xs font-bold tracking-[0.16em] text-white/50 uppercase">Tourism</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold">
          Lodges, operators, and activity desks have their own catalogue
        </h2>
        <p className="mt-4 max-w-xl text-white/70">
          Booking engines, quotes, transfers, and agent commissions — listed with starting prices.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href="/tourism" variant="onDark" size="lg">
            Tourism systems
          </CTAButton>
          <CTAButton href="/contact" variant="onPhotoGhost" size="lg">
            Talk to {company.name.split(" ")[0]}
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
