import "server-only";
import { requireEnv } from "@/lib/integrations/config";

export async function createPaypalOrder() {
  requireEnv("PAYPAL_CLIENT_ID");
  requireEnv("PAYPAL_CLIENT_SECRET");
  throw new Error("PayPal order creation requires the provider SDK/API mapping to be completed.");
}
