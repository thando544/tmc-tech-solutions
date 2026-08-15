import { oauthAuthorizationServerMetadata } from "@/lib/agent/oauth";
import { jsonDiscovery, jsonDiscoveryOptions, originFromRequest } from "@/lib/agent/site";

export function OPTIONS() {
  return jsonDiscoveryOptions();
}

export function GET(request: Request) {
  return jsonDiscovery(oauthAuthorizationServerMetadata(originFromRequest(request)));
}
