import { getSiteUrl } from "@/lib/agent/site";

export function GET() {
  const site = getSiteUrl();

  return Response.json(
    {
      resource: site,
      authorization_servers: [site],
      scopes_supported: ["openid", "profile", "email", "offline_access", "agent:read", "agent:write"],
      bearer_methods_supported: ["header"],
      resource_documentation: `${site}/auth.md`,
      resource_signing_alg_values_supported: ["RS256"]
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}
