import { company, services } from "@/content/site";
import { getSiteUrl } from "@/lib/agent/site";

export function GET() {
  const site = getSiteUrl();

  return Response.json(
    {
      openapi: "3.1.0",
      info: {
        title: `${company.name} Public API`,
        version: "1.0.0",
        description: "Public APIs for company information, contact, and agent discovery.",
        contact: { email: company.email, url: site }
      },
      servers: [{ url: site }],
      paths: {
        "/api/health": {
          get: {
            summary: "Health check",
            operationId: "getHealth",
            responses: {
              "200": {
                description: "Service is healthy"
              }
            }
          }
        },
        "/api/contact": {
          post: {
            summary: "Submit a contact enquiry",
            operationId: "createContact",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["name", "email", "message"],
                    properties: {
                      name: { type: "string", minLength: 2 },
                      email: { type: "string", format: "email" },
                      message: { type: "string", minLength: 10 }
                    }
                  }
                }
              }
            },
            responses: {
              "200": { description: "Message accepted" }
            }
          }
        },
        "/mcp": {
          post: {
            summary: "MCP Streamable HTTP endpoint",
            operationId: "mcp",
            responses: {
              "200": { description: "JSON-RPC response" }
            }
          }
        }
      },
      "x-services": services.map((service) => ({
        slug: service.slug,
        title: service.title,
        description: service.description
      }))
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}
