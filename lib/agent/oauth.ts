import { getSiteUrl } from "@/lib/agent/site";

export function agentAuthMetadata() {
  const site = getSiteUrl();
  return {
    skill: "https://workos.com/auth.md",
    register_uri: `${site}/api/agent/register`,
    identity_types_supported: ["anonymous", "identity_assertion"],
    methods: ["anonymous", "identity_assertion", "verified_email"],
    identity_assertion: {
      assertion_types_supported: ["urn:ietf:params:oauth:token-type:id-jag", "verified_email"],
      credential_types_supported: ["oauth_access_token", "api_key"],
      claim_uri: `${site}/api/agent/claim`
    },
    anonymous: {
      credential_types_supported: ["api_key"],
      claim_uri: `${site}/api/agent/claim`
    },
    revocation_uri: `${site}/api/agent/revoke`,
    events_supported: ["credential_revoked"]
  };
}

export function oauthAuthorizationServerMetadata() {
  const site = getSiteUrl();

  return {
    issuer: site,
    authorization_endpoint: `${site}/login`,
    token_endpoint: `${site}/api/oauth/token`,
    jwks_uri: `${site}/api/oauth/jwks`,
    registration_endpoint: `${site}/api/agent/register`,
    revocation_endpoint: `${site}/api/agent/revoke`,
    grant_types_supported: ["authorization_code", "refresh_token", "client_credentials"],
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post", "none"],
    scopes_supported: ["openid", "profile", "email", "offline_access", "agent:read", "agent:write"],
    code_challenge_methods_supported: ["S256"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    agent_auth: agentAuthMetadata()
  };
}

export function oauthProtectedResourceMetadata() {
  const site = getSiteUrl();
  return {
    resource: site,
    authorization_servers: [site],
    scopes_supported: ["openid", "profile", "email", "offline_access", "agent:read", "agent:write"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${site}/auth.md`,
    resource_signing_alg_values_supported: ["RS256"],
    agent_auth: agentAuthMetadata()
  };
}
