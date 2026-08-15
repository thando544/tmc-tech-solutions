import { oauthProtectedResourceMetadata } from "@/lib/agent/oauth";
import { jsonDiscovery, jsonDiscoveryOptions } from "@/lib/agent/site";

export function OPTIONS() {
  return jsonDiscoveryOptions();
}

export function GET() {
  return jsonDiscovery(oauthProtectedResourceMetadata());
}
