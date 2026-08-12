import "server-only";
import { requireEnv } from "@/lib/integrations/config";

export async function requireHostAfricaConfigured() {
  requireEnv("HOSTAFRICA_API_URL");
  requireEnv("HOSTAFRICA_API_TOKEN");
}
