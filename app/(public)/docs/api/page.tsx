import { CTAButton } from "@/components/marketing/cta-button";
import { GlassCard } from "@/components/marketing/glass-card";
import { PageIntro, Section } from "@/components/marketing/section";
import { company } from "@/content/site";

export const metadata = {
  title: "API docs",
  description: `Machine-readable APIs and agent discovery for ${company.name}.`
};

export default function ApiDocsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Developers"
        title="API documentation"
        description="Public discovery files for humans and AI agents. Portal and admin APIs stay behind staff sign-in."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <GlassCard>
            <h2 className="text-lg font-bold">OpenAPI</h2>
            <p className="mt-2 text-sm text-muted">Machine-readable service description.</p>
            <CTAButton href="/openapi.json" variant="secondary" className="mt-4">
              /openapi.json
            </CTAButton>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-bold">API catalog</h2>
            <p className="mt-2 text-sm text-muted">RFC 9727 linkset for automated discovery.</p>
            <CTAButton href="/.well-known/api-catalog" variant="secondary" className="mt-4">
              /.well-known/api-catalog
            </CTAButton>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-bold">MCP</h2>
            <p className="mt-2 text-sm text-muted">Streamable HTTP MCP tools for company and services data.</p>
            <CTAButton href="/.well-known/mcp/server-card.json" variant="secondary" className="mt-4">
              Server card
            </CTAButton>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-bold">Health</h2>
            <p className="mt-2 text-sm text-muted">Liveness endpoint for agents and monitors.</p>
            <CTAButton href="/api/health" variant="secondary" className="mt-4">
              /api/health
            </CTAButton>
          </GlassCard>
        </div>
      </Section>
    </>
  );
}
