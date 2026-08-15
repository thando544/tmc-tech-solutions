import { getSiteUrl } from "@/lib/agent/site";

export function GET() {
  const site = getSiteUrl();
  const body = `# TMC Tech Solutions robots.txt
# https://www.rfc-editor.org/rfc/rfc9309

User-agent: *
Allow: /
Allow: /about
Allow: /services
Allow: /contact
Allow: /docs/
Allow: /openapi.json
Allow: /sitemap.xml
Allow: /.well-known/
Disallow: /portal
Disallow: /portal/
Disallow: /admin
Disallow: /admin/
Disallow: /login
Disallow: /signup
Disallow: /api/
Allow: /api/health
Allow: /api/contact
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: GPTBot
Allow: /
Disallow: /portal
Disallow: /admin
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: OAI-SearchBot
Allow: /
Disallow: /portal
Disallow: /admin
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: Claude-Web
Allow: /
Disallow: /portal
Disallow: /admin
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: Google-Extended
Allow: /
Disallow: /portal
Disallow: /admin
Content-Signal: ai-train=no, search=yes, ai-input=no

User-agent: Amazonbot
Allow: /
Disallow: /portal
Disallow: /admin
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: anthropic-ai
Allow: /
Disallow: /portal
Disallow: /admin
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: Bytespider
Disallow: /
Content-Signal: ai-train=no, search=no, ai-input=no

User-agent: CCBot
Allow: /
Disallow: /portal
Disallow: /admin
Content-Signal: ai-train=no, search=yes, ai-input=no

User-agent: Applebot-Extended
Allow: /
Disallow: /portal
Disallow: /admin
Content-Signal: ai-train=no, search=yes, ai-input=no

Sitemap: ${site}/sitemap.xml
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
