import { getSiteUrl } from "@/lib/agent/site";

export function GET() {
  const site = getSiteUrl();

  return Response.json(
    {
      linkset: [
        {
          anchor: `${site}/api`,
          "service-desc": [
            {
              href: `${site}/openapi.json`,
              type: "application/json"
            }
          ],
          "service-doc": [
            {
              href: `${site}/docs/api`,
              type: "text/html"
            }
          ],
          status: [
            {
              href: `${site}/api/health`
            }
          ]
        },
        {
          anchor: `${site}/mcp`,
          "service-desc": [
            {
              href: `${site}/.well-known/mcp/server-card.json`,
              type: "application/json"
            }
          ],
          "service-doc": [
            {
              href: `${site}/docs/api`,
              type: "text/html"
            }
          ],
          status: [
            {
              href: `${site}/api/health`
            }
          ]
        }
      ]
    },
    {
      headers: {
        "Content-Type": "application/linkset+json",
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}
