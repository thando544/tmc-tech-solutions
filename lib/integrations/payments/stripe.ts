import "server-only";
import { requireEnv } from "@/lib/integrations/config";

export async function createStripePaymentIntent() {
  requireEnv("STRIPE_SECRET_KEY");
  throw new Error("Stripe payment creation requires the Stripe SDK/API mapping to be completed.");
}
