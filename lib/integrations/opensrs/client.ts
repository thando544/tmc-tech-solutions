import "server-only";
import { requireEnv } from "@/lib/integrations/config";

export async function requireOpenSrsConfigured() {
  requireEnv("OPENSRS_USERNAME");
  requireEnv("OPENSRS_API_KEY");
  requireEnv("OPENSRS_API_URL");
}
