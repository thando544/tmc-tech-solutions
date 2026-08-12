import { NextRequest } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { createPaypalOrder } from "@/lib/integrations/payments/paypal";
import { paymentSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  const body = paymentSchema.parse(await request.json());
  return withAuthedApi(request, "paypal", "createOrder", async (userId) => {
    await auditLog({ userId, action: "createOrder", resourceType: "invoice", resourceId: body.invoiceId });
    return createPaypalOrder();
  });
}
