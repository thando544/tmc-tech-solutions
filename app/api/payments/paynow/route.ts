import { NextRequest } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { createPaynowPayment } from "@/lib/integrations/payments/paynow";
import { paymentSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  const body = paymentSchema.parse(await request.json());
  return withAuthedApi(request, "paynow", "createPayment", async (userId) => {
    await auditLog({ userId, action: "createPayment", resourceType: "invoice", resourceId: body.invoiceId });
    return createPaynowPayment();
  });
}
