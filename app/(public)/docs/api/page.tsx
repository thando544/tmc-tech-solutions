import { CTAButton } from "@/components/marketing/cta-button";
import { GlassCard } from "@/components/marketing/glass-card";
import { Section } from "@/components/marketing/section";
import { company } from "@/content/site";

export const metadata = {
  title: "API docs",
  description: `Machine-readable APIs and agent discovery for ${company.name}.`
};

export default function ApiDocsPage() {
  return (
    <Section className="!pt-16 md:!pt-24">
      <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase">Developers</p>
      <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight">API documentation</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Public discovery files and APIs for humans and AI agents. Portal and admin APIs remain authenticated.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <GlassCard>
          <h2 className="font-heading text-lg font-semibold">OpenAPI</h2>
          <p className="mt-2 text-sm text-muted">Machine-readable service description.</p>
          <CTAButton href="/openapi.json" variant="secondary" className="mt-4">
            /openapi.json
          </CTAButton>
        </GlassCard>
        <GlassCard>
          <h2 className="font-heading text-lg font-semibold">API catalog</h2>
          <p className="mt-2 text-sm text-muted">RFC 9727 linkset for automated discovery.</p>
          <CTAButton href="/.well-known/api-catalog" variant="secondary" className="mt-4">
            /.well-known/api-catalog
          </CTAButton>
        </GlassCard>
        <GlassCard>
          <h2 className="font-heading text-lg font-semibold">MCP</h2>
          <p className="mt-2 text-sm text-muted">Streamable HTTP MCP tools for company and services data.</p>
          <CTAButton href="/.well-known/mcp/server-card.json" variant="secondary" className="mt-4">
            Server card
          </CTAButton>
        </GlassCard>
        <GlassCard>
          <h2 className="font-heading text-lg font-semibold">Health</h2>
          <p className="mt-2 text-sm text-muted">Liveness endpoint for agents and monitors.</p>
          <CTAButton href="/api/health" variant="secondary" className="mt-4">
            /api/health
          </CTAButton>
        </GlassCard>
      </div>
    </Section>
  );
}
