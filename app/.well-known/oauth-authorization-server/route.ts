import { oauthAuthorizationServerMetadata } from "@/lib/agent/oauth";

export function GET() {
  return Response.json(oauthAuthorizationServerMetadata(), {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
