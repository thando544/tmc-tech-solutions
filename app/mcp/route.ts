import { NextRequest, NextResponse } from "next/server";
import { company, services } from "@/content/site";
import { getSiteUrl } from "@/lib/agent/site";

type JsonRpc = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

const tools = [
  {
    name: "list_services",
    description: "List TMC Tech Solutions services with descriptions and benefits.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false }
  },
  {
    name: "get_company_info",
    description: "Return company name, tagline, mission, email, and location.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false }
  },
  {
    name: "get_contact_instructions",
    description: "Explain how a person or agent can contact TMC Tech Solutions.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false }
  }
];

function result(id: JsonRpc["id"], payload: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id: id ?? null, result: payload });
}

function error(id: JsonRpc["id"], code: number, message: string) {
  return NextResponse.json({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version"
    }
  });
}

export async function GET() {
  const site = getSiteUrl();
  return NextResponse.json(
    {
      protocolVersion: "2024-11-05",
      serverInfo: { name: "tmc-tech-solutions", version: "1.0.0" },
      endpoint: `${site}/mcp`,
      capabilities: { tools: {}, resources: {}, prompts: {} }
    },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as JsonRpc;
  const { id, method } = body;
  const site = getSiteUrl();

  if (method === "initialize") {
    return result(id, {
      protocolVersion: "2024-11-05",
      serverInfo: { name: "tmc-tech-solutions", version: "1.0.0" },
      capabilities: { tools: {}, resources: {}, prompts: {} }
    });
  }

  if (method === "notifications/initialized" || method === "ping") {
    return result(id, {});
  }

  if (method === "tools/list") {
    return result(id, { tools });
  }

  if (method === "tools/call") {
    const name = String(body.params?.name ?? "");
    if (name === "list_services") {
      return result(id, {
        content: [{ type: "text", text: JSON.stringify(services.map(({ slug, title, description, benefits }) => ({ slug, title, description, benefits })), null, 2) }]
      });
    }
    if (name === "get_company_info") {
      return result(id, {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                name: company.name,
                tagline: company.tagline,
                mission: company.mission,
                email: company.email,
                location: company.location,
                url: site
              },
              null,
              2
            )
          }
        ]
      });
    }
    if (name === "get_contact_instructions") {
      return result(id, {
        content: [
          {
            type: "text",
            text: `Contact ${company.name} at ${company.email} or POST ${site}/api/contact with name, email, and message. Human form: ${site}/contact`
          }
        ]
      });
    }
    return error(id, -32601, `Unknown tool: ${name}`);
  }

  if (!method) {
    return GET();
  }

  return error(id, -32601, `Unknown method: ${method}`);
}
