import { company } from "@/content/site";
import { agentAuthMetadata } from "@/lib/agent/oauth";
import { originFromRequest } from "@/lib/agent/site";

export function GET(request: Request) {
  const site = originFromRequest(request);
  const agentAuth = JSON.stringify(agentAuthMetadata(site), null, 2);
  const body = `# auth.md

This document describes how AI agents register and authenticate with ${company.name}.

## Audience

Software agents that need to call public TMC Tech Solutions APIs or MCP tools.

## Step 1 — Discover

1. GET ${site}/.well-known/oauth-protected-resource
2. GET ${site}/.well-known/oauth-authorization-server and read the agent_auth block.

## Step 2 — Pick a method

Supported identity_types_supported: anonymous, identity_assertion (ID-JAG and verified_email).

## Step 3 — Register

POST JSON to ${site}/agent/identity (also advertised as register_uri and identity_endpoint).

## Step 4 — Claim

Anonymous credentials are claimed at ${site}/agent/identity/claim.

## Step 5 — Exchange the assertion

POST ${site}/oauth2/token with grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer.

## Step 6 — Use the access_token

Send Authorization: Bearer <token> for protected portal APIs.

Public marketing APIs (/api/contact, /api/health, /mcp catalog tools) do not require a token.

## agent_auth

\`\`\`json
${agentAuth}
\`\`\`

## Errors

Standard OAuth error codes apply (invalid_request, invalid_grant, unsupported_grant_type, unauthorized_client).

## Revocation

Credential layer: POST ${site}/oauth2/revoke
Registration layer: POST ${site}/agent/event/notify (Security Event Tokens)

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
