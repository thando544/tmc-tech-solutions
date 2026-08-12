import { withAdminApi } from "@/lib/api/admin";
import { isCyberPanelApiDisabled, listCyberPanelPackages, verifyCyberPanelConnection } from "@/lib/cyberpanel/client";

export async function GET() {
  return withAdminApi(async () => {
    const verify = await verifyCyberPanelConnection();
    const packages = await listCyberPanelPackages();

    return {
      url: process.env.CYBERPANEL_URL ?? null,
      verify,
      packages,
      apiEnabled: verify.success || !isCyberPanelApiDisabled(verify.message),
      setupHint: isCyberPanelApiDisabled(verify.message)
        ? "Enable API access in CyberPanel: Users → admin → Edit → API Access ON, then retry."
        : null
    };
  });
}
