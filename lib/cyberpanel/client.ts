import "server-only";
import { requireEnv } from "@/lib/integrations/config";

export type CyberPanelResponse<T = Record<string, unknown>> = {
  success: boolean;
  message?: string;
  data?: T;
  raw?: unknown;
};

type CreateWebsiteInput = {
  domainName: string;
  packageName: string;
  ownerEmail: string;
  websiteOwner?: string;
};

type WebsiteStatusInput = {
  domainName: string;
  status: "Suspend" | "Active";
};

function getCredentials() {
  return {
    baseUrl: requireEnv("CYBERPANEL_URL").replace(/\/$/, ""),
    adminUser: requireEnv("CYBERPANEL_USERNAME"),
    adminPass: requireEnv("CYBERPANEL_PASSWORD"),
    defaultOwner: process.env.CYBERPANEL_DEFAULT_WEBSITE_OWNER ?? requireEnv("CYBERPANEL_USERNAME")
  };
}

async function cyberPanelRequest<T extends Record<string, unknown>>(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<CyberPanelResponse<T>> {
  const { baseUrl, adminUser, adminPass } = getCredentials();

  const response = await fetch(`${baseUrl}/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      adminUser,
      adminPass,
      ...payload
    }),
    cache: "no-store"
  });

  const text = await response.text();
  let parsed: unknown = null;

  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = { message: text || "Invalid CyberPanel response." };
  }

  const body = (parsed && typeof parsed === "object" ? parsed : { message: String(parsed) }) as Record<string, unknown>;
  const statusValue = body.status ?? body.Status;
  const success =
    response.ok &&
    (statusValue === 1 ||
      statusValue === "1" ||
      body.success === true ||
      body.success === 1 ||
      (typeof body.error_message === "string" && body.error_message.toLowerCase().includes("success")));

  if (!success) {
    const message =
      (typeof body.error_message === "string" && body.error_message) ||
      (typeof body.message === "string" && body.message) ||
      `CyberPanel request failed (${response.status}).`;

    return { success: false, message, raw: body };
  }

  return {
    success: true,
    message: typeof body.error_message === "string" ? body.error_message : undefined,
    data: body as T,
    raw: body
  };
}

export async function createHostingWebsite(input: CreateWebsiteInput): Promise<CyberPanelResponse> {
  const { defaultOwner } = getCredentials();

  return cyberPanelRequest("createWebsite", {
    domainName: input.domainName,
    packageName: input.packageName,
    ownerEmail: input.ownerEmail,
    websiteOwner: input.websiteOwner ?? defaultOwner,
    ssl: 1
  });
}

export async function setHostingWebsiteStatus(input: WebsiteStatusInput): Promise<CyberPanelResponse> {
  return cyberPanelRequest("submitWebsiteStatus", {
    websiteName: input.domainName,
    state: input.status
  });
}

export function getHostingPanelUrl(): string {
  const base = process.env.HOSTING_PANEL_URL ?? process.env.CYBERPANEL_URL ?? "";
  const normalized = base.replace(/\/$/, "");
  if (!normalized) {
    return "";
  }
  return `${normalized}/`;
}

export function getHostingServerIp(): string | null {
  return process.env.HOSTING_SERVER_IP ?? null;
}

export type CyberPanelPackage = {
  name: string;
  diskQuota?: number;
  bandwidth?: number;
};

/** Verifies admin credentials and whether the CyberPanel API is enabled. */
export async function verifyCyberPanelConnection(): Promise<CyberPanelResponse> {
  return cyberPanelRequest("verifyConn", {});
}

/** Lists infrastructure packages (admin-only; never expose to clients). */
export async function listCyberPanelPackages(): Promise<{
  connected: boolean;
  packages: CyberPanelPackage[];
  message?: string;
}> {
  const result = await cyberPanelRequest<{ listPackages?: unknown[] }>("listPackage", {});

  if (!result.success) {
    return { connected: false, packages: [], message: result.message };
  }

  const raw = result.data?.listPackages ?? (result.raw as { listPackages?: unknown[] })?.listPackages ?? [];
  const packages = (Array.isArray(raw) ? raw : [])
    .map((item) => {
      if (typeof item === "string") {
        return { name: item };
      }
      if (item && typeof item === "object" && "packageName" in item) {
        const row = item as { packageName: string; diskQuota?: number; bandwidth?: number };
        return { name: row.packageName, diskQuota: row.diskQuota, bandwidth: row.bandwidth };
      }
      if (item && typeof item === "object" && "name" in item) {
        const row = item as { name: string; diskQuota?: number; bandwidth?: number };
        return { name: row.name, diskQuota: row.diskQuota, bandwidth: row.bandwidth };
      }
      return null;
    })
    .filter((item): item is CyberPanelPackage => Boolean(item?.name));

  return { connected: true, packages };
}

export function isCyberPanelApiDisabled(message?: string) {
  return Boolean(message?.toLowerCase().includes("api access disabled"));
}
