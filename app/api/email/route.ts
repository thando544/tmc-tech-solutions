import { NextRequest } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { runCyberPanelOperation, type CyberPanelOperation } from "@/lib/integrations/cyberpanel/client";
import { integrationOperationSchema } from "@/lib/validations/contact";

const allowed = new Set<CyberPanelOperation>([
  "createEmail",
  "deleteEmail",
  "resetEmailPassword",
  "setMailboxQuota",
  "createEmailForwarder",
  "createEmailAlias"
]);

export async function POST(request: NextRequest) {
  const body = integrationOperationSchema.parse(await request.json());
  const operation = body.operation as CyberPanelOperation;

  if (!allowed.has(operation)) {
    return Response.json({ error: "Unsupported email operation." }, { status: 400 });
  }

  return withAuthedApi(request, "cyberpanel-email", operation, async (userId) => {
    await auditLog({ userId, action: operation, resourceType: "email_account", metadata: { requested: true } });
    return runCyberPanelOperation(operation, body.payload);
  });
}
