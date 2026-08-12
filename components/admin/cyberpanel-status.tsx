import { isCyberPanelApiDisabled, listCyberPanelPackages, verifyCyberPanelConnection } from "@/lib/cyberpanel/client";

export async function CyberPanelStatus() {
  let verify: Awaited<ReturnType<typeof verifyCyberPanelConnection>> | null = null;
  let packages: Awaited<ReturnType<typeof listCyberPanelPackages>> | null = null;
  let configError: string | null = null;

  try {
    verify = await verifyCyberPanelConnection();
    packages = await listCyberPanelPackages();
  } catch (error) {
    configError = error instanceof Error ? error.message : "CyberPanel is not configured.";
  }

  const apiDisabled = verify ? isCyberPanelApiDisabled(verify.message) : false;
  const connected = Boolean(verify?.success || (packages && packages.connected));

  return (
    <div
      className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
        configError || apiDisabled
          ? "border-warning/40 bg-warning/10 text-navy"
          : connected
            ? "border-success/30 bg-success/10 text-navy"
            : "border-border bg-white text-muted"
      }`}
    >
      <p className="font-semibold">CyberPanel infrastructure</p>
      {configError ? (
        <p className="mt-1">{configError}</p>
      ) : apiDisabled ? (
        <>
          <p className="mt-1">Credentials are set, but API access is disabled on the panel.</p>
          <p className="mt-2 text-muted">
            In CyberPanel: <strong>Users → admin → Edit</strong> → turn <strong>API Access</strong> ON, then refresh this page.
          </p>
        </>
      ) : connected ? (
        <>
          <p className="mt-1 text-muted">Connected to {process.env.CYBERPANEL_URL}</p>
          {packages?.packages.length ? (
            <p className="mt-2 text-muted">
              Available infrastructure packages:{" "}
              <span className="font-mono text-xs">{packages.packages.map((p) => p.name).join(", ")}</span>
            </p>
          ) : (
            <p className="mt-2 text-muted">Connected. Map each business package to a CyberPanel package name when editing plans.</p>
          )}
        </>
      ) : (
        <p className="mt-1 text-muted">{verify?.message ?? packages?.message ?? "Could not verify CyberPanel connection."}</p>
      )}
    </div>
  );
}
