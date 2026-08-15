import { getSiteUrl } from "@/lib/agent/site";

export function GET() {
  const site = getSiteUrl();

  return Response.json(
    {
      serverInfo: {
        name: "tmc-tech-solutions",
        version: "1.0.0",
        title: "TMC Tech Solutions",
        description: "Public MCP tools for company information, services, and contact."
      },
      transport: {
        type: "streamable-http",
        endpoint: `${site}/mcp`
      },
      endpoint: `${site}/mcp`,
      capabilities: {
        tools: {},
        resources: {},
        prompts: {}
      }
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}
