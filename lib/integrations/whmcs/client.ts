import "server-only";
import { requireEnv } from "@/lib/integrations/config";

export type WhmcsOperation = "invoices" | "tickets" | "products" | "renewals" | "serviceProvisioning";

export async function runWhmcsOperation(operation: WhmcsOperation, payload: Record<string, unknown>) {
  const endpoint = requireEnv("WHMCS_API_URL");
  const identifier = requireEnv("WHMCS_IDENTIFIER");
  const secret = requireEnv("WHMCS_SECRET");

  const body = new URLSearchParams({
    identifier,
    secret,
    action: operation,
    responsetype: "json",
    ...Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, String(value)]))
  });

  const response = await fetch(endpoint, {
    method: "POST",
    body,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`WHMCS operation failed with status ${response.status}.`);
  }

  return response.json() as Promise<unknown>;
}
