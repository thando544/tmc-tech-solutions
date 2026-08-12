import "server-only";
import { requireEnv } from "@/lib/integrations/config";

export async function createPaynowPayment() {
  requireEnv("PAYNOW_INTEGRATION_ID");
  requireEnv("PAYNOW_INTEGRATION_KEY");
  throw new Error("Paynow payment creation requires the provider SDK/API mapping to be completed.");
}
