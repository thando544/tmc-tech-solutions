import { NextRequest, NextResponse } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { requireHostAfricaConfigured } from "@/lib/integrations/hostafrica/client";
import { requireOpenSrsConfigured } from "@/lib/integrations/opensrs/client";
import { integrationOperationSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  const body = integrationOperationSchema.parse(await request.json());

  return withAuthedApi(request, "domains", body.operation, async (userId) => {
    await auditLog({ userId, action: body.operation, resourceType: "domain", metadata: { requested: true } });
    if (body.operation === "opensrsCheck" || body.operation === "opensrsRegister") {
      await requireOpenSrsConfigured();
    } else if (body.operation === "hostafricaCheck" || body.operation === "hostafricaRegister") {
      await requireHostAfricaConfigured();
    } else {
      return NextResponse.json({ error: "Unsupported domain operation." }, { status: 400 });
    }

    throw new Error("Domain provider operation requires final provider API mapping.");
  });
}
