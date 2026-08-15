import { company } from "@/content/site";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? company.domain;
  return raw.replace(/\/$/, "");
}

export const PUBLIC_PATHS = ["/", "/about", "/services", "/contact", "/docs/api", "/auth.md"] as const;

export const AGENT_LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</sitemap.xml>; rel="describedby"; type="application/xml"',
  '</robots.txt>; rel="describedby"; type="text/plain"'
].join(", ");
