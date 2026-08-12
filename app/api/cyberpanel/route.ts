import { NextRequest } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { runCyberPanelOperation, type CyberPanelOperation } from "@/lib/integrations/cyberpanel/client";
import { integrationOperationSchema } from "@/lib/validations/contact";

const allowed = new Set<CyberPanelOperation>([
  "createWebsite",
  "createEmail",
  "deleteEmail",
  "resetEmailPassword",
  "setMailboxQuota",
  "createEmailForwarder",
  "createEmailAlias",
  "createDatabase",
  "deleteDatabase",
  "issueSsl",
  "renewSsl",
  "installWordPress",
  "createBackup",
  "restoreBackup",
  "switchPhpVersion",
  "usageStatistics"
]);

export async function POST(request: NextRequest) {
  const body = integrationOperationSchema.parse(await request.json());
  const operation = body.operation as CyberPanelOperation;

  if (!allowed.has(operation)) {
    return Response.json({ error: "Unsupported CyberPanel operation." }, { status: 400 });
  }

  return withAuthedApi(request, "cyberpanel", operation, async (userId) => {
    await auditLog({ userId, action: operation, resourceType: "cyberpanel", metadata: { requested: true } });
    return runCyberPanelOperation(operation, body.payload);
  });
}
