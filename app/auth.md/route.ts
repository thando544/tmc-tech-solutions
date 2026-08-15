import { company } from "@/content/site";
import { getSiteUrl } from "@/lib/agent/site";

export function GET() {
  const site = getSiteUrl();
  const body = `# auth.md

This document describes how AI agents register and authenticate with ${company.name}.

## Audience

Software agents that need to call public TMC Tech Solutions APIs or MCP tools.

## Registration

Agents may register by posting JSON to \`${site}/api/agent/register\`.

Supported methods:

- anonymous (API key claim)
- verified_email
- identity_assertion (ID-JAG)

## Protected resource

OAuth Protected Resource Metadata: ${site}/.well-known/oauth-protected-resource

Authorization server metadata: ${site}/.well-known/oauth-authorization-server

OpenID configuration: ${site}/.well-known/openid-configuration

## Credential use

Send a Bearer token in the \`Authorization\` header for protected portal APIs.

Public marketing APIs (\`/api/contact\`, \`/api/health\`, \`/mcp\` tools for catalog data) do not require a token.

## Human contact

${company.email}
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
