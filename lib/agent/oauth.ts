import { company } from "@/content/site";
import { getSiteUrl } from "@/lib/agent/site";

const LOGO_URI =
  "https://res.cloudinary.com/dnqjax5ut/image/upload/v1779049221/tmctechsolutions_oc321y.png";

export function agentAuthMetadata(site = getSiteUrl()) {
  return {
    skill: "https://workos.com/auth.md",
    register_uri: `${site}/agent/identity`,
    identity_endpoint: `${site}/agent/identity`,
    claim_uri: `${site}/agent/identity/claim`,
    claim_endpoint: `${site}/agent/identity/claim`,
    revocation_uri: `${site}/oauth2/revoke`,
    events_endpoint: `${site}/agent/event/notify`,
    identity_types_supported: ["anonymous", "identity_assertion"],
    methods: ["anonymous", "identity_assertion", "verified_email"],
    identity_assertion: {
      assertion_types_supported: ["urn:ietf:params:oauth:token-type:id-jag", "verified_email"],
      credential_types_supported: ["oauth_access_token", "api_key"],
      claim_uri: `${site}/agent/identity/claim`
    },
    anonymous: {
      credential_types_supported: ["api_key"],
      claim_uri: `${site}/agent/identity/claim`
    },
    events_supported: [
      "credential_revoked",
      "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked"
    ]
  };
}

export function oauthAuthorizationServerMetadata(site = getSiteUrl()) {
  return {
    issuer: site,
    authorization_endpoint: `${site}/login`,
    token_endpoint: `${site}/oauth2/token`,
    jwks_uri: `${site}/api/oauth/jwks`,
    registration_endpoint: `${site}/agent/identity`,
    revocation_endpoint: `${site}/oauth2/revoke`,
    grant_types_supported: [
      "authorization_code",
      "refresh_token",
      "client_credentials",
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
      "urn:workos:agent-auth:grant-type:claim"
    ],
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post", "none"],
    scopes_supported: ["openid", "profile", "email", "offline_access", "agent:read", "agent:write"],
    code_challenge_methods_supported: ["S256"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    agent_auth: agentAuthMetadata(site)
  };
}

export function oauthProtectedResourceMetadata(site = getSiteUrl()) {
  return {
    resource: site,
    resource_name: company.name,
    resource_logo_uri: LOGO_URI,
    authorization_servers: [site],
    scopes_supported: ["openid", "profile", "email", "offline_access", "agent:read", "agent:write"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${site}/auth.md`,
    resource_signing_alg_values_supported: ["RS256"],
    issuer: site,
    token_endpoint: `${site}/oauth2/token`,
    revocation_endpoint: `${site}/oauth2/revoke`,
    grant_types_supported: [
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
      "urn:workos:agent-auth:grant-type:claim"
    ],
    agent_auth: agentAuthMetadata(site)
  };
}

export function wwwAuthenticate(site = getSiteUrl()) {
  return `Bearer realm="${company.name}", resource_metadata="${site}/.well-known/oauth-protected-resource"`;
}
