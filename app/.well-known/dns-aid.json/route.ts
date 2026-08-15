import { getSiteUrl, jsonDiscovery, jsonDiscoveryOptions } from "@/lib/agent/site";

export function OPTIONS() {
  return jsonDiscoveryOptions();
}

export function GET() {
  const site = getSiteUrl();
  const host = new URL(site).hostname;

  return jsonDiscovery({
    $schema: "https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/",
    domain: host,
    namespace: `_agents.${host}`,
    records: [
      {
        name: `_index._agents.${host}`,
        type: "HTTPS",
        mode: "ServiceMode",
        priority: 1,
        target: host,
        alpn: ["h2", "h3"],
        port: 443,
        endpoint: `${site}/.well-known/agent-skills/index.json`
      },
      {
        name: `_a2a._agents.${host}`,
        type: "SVCB",
        mode: "ServiceMode",
        priority: 1,
        target: host,
        alpn: ["a2a", "h2"],
        port: 443,
        endpoint: `${site}/mcp`
      },
      {
        name: `_mcp._agents.${host}`,
        type: "HTTPS",
        mode: "ServiceMode",
        priority: 1,
        target: host,
        alpn: ["h2", "h3"],
        port: 443,
        endpoint: `${site}/mcp`
      }
    ],
    dnssec: "required",
    instructions: `${site}/.well-known/dns-aid.txt`
  });
}
