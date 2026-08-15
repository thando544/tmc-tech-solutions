import { getSiteUrl } from "@/lib/agent/site";

export function GET() {
  const site = getSiteUrl();
  const host = new URL(site).hostname;
  const body = `; DNS for AI Discovery (DNS-AID) — ${host}
; draft-mozleywilliams-dnsop-dnsaid + RFC 9460 ServiceMode SVCB/HTTPS
; Publish these at your DNS host and enable DNSSEC on ${host}.

_index._agents.${host}. 3600 IN HTTPS 1 ${host}. alpn="h2,h3" port=443
_a2a._agents.${host}. 3600 IN SVCB 1 ${host}. alpn="a2a,h2" port=443 mandatory=alpn,port
_mcp._agents.${host}. 3600 IN HTTPS 1 ${host}. alpn="h2,h3" port=443

; Optional TXT locators for HTTP discovery documents
_index._agents.${host}. 3600 IN TXT "endpoint=${site}/.well-known/agent-skills/index.json"
_a2a._agents.${host}. 3600 IN TXT "endpoint=${site}/mcp"
_mcp._agents.${host}. 3600 IN TXT "endpoint=${site}/mcp"
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
