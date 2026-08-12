import "server-only";
import { requireEnv } from "@/lib/integrations/config";

export type CyberPanelOperation =
  | "createWebsite"
  | "createEmail"
  | "deleteEmail"
  | "resetEmailPassword"
  | "setMailboxQuota"
  | "createEmailForwarder"
  | "createEmailAlias"
  | "createDatabase"
  | "deleteDatabase"
  | "issueSsl"
  | "renewSsl"
  | "installWordPress"
  | "createBackup"
  | "restoreBackup"
  | "switchPhpVersion"
  | "usageStatistics";

/** Legacy operation runner — credentials stay server-side only. */
export async function runCyberPanelOperation(operation: CyberPanelOperation, payload: Record<string, unknown>) {
  const baseUrl = requireEnv("CYBERPANEL_URL").replace(/\/$/, "");
  const adminUser = requireEnv("CYBERPANEL_USERNAME");
  const adminPass = requireEnv("CYBERPANEL_PASSWORD");

  const response = await fetch(`${baseUrl}/api/${operation}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminUser, adminPass, ...payload }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`CyberPanel operation failed with status ${response.status}.`);
  }

  return response.json() as Promise<unknown>;
}

export { createHostingWebsite, getHostingPanelUrl, getHostingServerIp, setHostingWebsiteStatus } from "@/lib/cyberpanel/client";
