import { NextRequest } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { runWhmcsOperation, type WhmcsOperation } from "@/lib/integrations/whmcs/client";
import { integrationOperationSchema } from "@/lib/validations/contact";

const allowed = new Set<WhmcsOperation>(["invoices", "tickets", "products", "renewals", "serviceProvisioning"]);

export async function POST(request: NextRequest) {
  const body = integrationOperationSchema.parse(await request.json());
  const operation = body.operation as WhmcsOperation;

  if (!allowed.has(operation)) {
    return Response.json({ error: "Unsupported WHMCS operation." }, { status: 400 });
  }

  return withAuthedApi(request, "whmcs", operation, async (userId) => {
    await auditLog({ userId, action: operation, resourceType: "whmcs", metadata: { requested: true } });
    return runWhmcsOperation(operation, body.payload);
  });
}
