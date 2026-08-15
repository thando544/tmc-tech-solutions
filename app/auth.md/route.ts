import { company } from "@/content/site";
import { agentAuthMetadata } from "@/lib/agent/oauth";
import { getSiteUrl } from "@/lib/agent/site";

export function GET() {
  const site = getSiteUrl();
  const agentAuth = JSON.stringify(agentAuthMetadata(), null, 2);
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

## agent_auth

\`\`\`json
${agentAuth}
\`\`\`

register_uri: ${site}/api/agent/register
claim_uri: ${site}/api/agent/claim
revocation_uri: ${site}/api/agent/revoke
identity_types_supported: anonymous, identity_assertion
credential_types_supported: api_key, oauth_access_token

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
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
