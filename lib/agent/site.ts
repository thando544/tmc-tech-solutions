import { company } from "@/content/site";

export function getSiteUrl() {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? company.domain).replace(/\/$/, "");
  if (!raw || raw.includes("localhost") || raw.startsWith("http://")) {
    return company.domain;
  }
  return raw;
}

export const PUBLIC_PATHS = ["/", "/about", "/services", "/contact", "/docs/api", "/auth.md"] as const;

export const AGENT_LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"; type="application/json"',
  '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"; type="application/json"',
  '</sitemap.xml>; rel="describedby"; type="application/xml"',
  '</robots.txt>; rel="describedby"; type="text/plain"'
].join(", ");

export function jsonDiscovery(body: unknown, extra?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      ...extra
    }
  });
}

export function jsonDiscoveryOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept"
    }
  });
}
