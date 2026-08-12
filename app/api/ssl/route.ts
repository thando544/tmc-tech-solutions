import { NextRequest } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { runCyberPanelOperation, type CyberPanelOperation } from "@/lib/integrations/cyberpanel/client";
import { integrationOperationSchema } from "@/lib/validations/contact";

const allowed = new Set<CyberPanelOperation>(["issueSsl", "renewSsl"]);

export async function POST(request: NextRequest) {
  const body = integrationOperationSchema.parse(await request.json());
  const operation = body.operation as CyberPanelOperation;

  if (!allowed.has(operation)) {
    return Response.json({ error: "Unsupported SSL operation." }, { status: 400 });
  }

  return withAuthedApi(request, "cyberpanel-ssl", operation, async (userId) => {
    await auditLog({ userId, action: operation, resourceType: "ssl_certificate", metadata: { requested: true } });
    return runCyberPanelOperation(operation, body.payload);
  });
}
