import { NextRequest } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { createStripePaymentIntent } from "@/lib/integrations/payments/stripe";
import { paymentSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  const body = paymentSchema.parse(await request.json());
  return withAuthedApi(request, "stripe", "createPaymentIntent", async (userId) => {
    await auditLog({ userId, action: "createPaymentIntent", resourceType: "invoice", resourceId: body.invoiceId });
    return createStripePaymentIntent();
  });
}
