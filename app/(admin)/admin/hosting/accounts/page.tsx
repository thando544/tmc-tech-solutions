import { AccountStatusButton } from "@/components/admin/account-status-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = { title: "Admin · Hosting accounts" };

export default async function AdminHostingAccountsPage() {
  const admin = createAdminClient();
  const { data: accounts } = await admin
    .from("hosting_accounts")
    .select("*, hosting_packages(name)")
    .order("created_at", { ascending: false });

  const userIds = [...new Set((accounts ?? []).map((account) => account.user_id))];
  const { data: profiles } = userIds.length
    ? await admin.from("profiles").select("id, email").in("id", userIds)
    : { data: [] };
  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));

  return (
    <>
      <h1 className="mb-2 font-heading text-2xl font-bold text-navy">Hosting accounts</h1>
      <p className="mb-6 text-sm text-muted">Active customer hosting accounts provisioned on infrastructure.</p>
      <div className="grid gap-4">
        {(accounts ?? []).map((account) => {
          const profile = profileById.get(account.user_id);
          return (
            <Card key={account.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-heading font-semibold">{account.domain}</p>
                  <p className="text-sm text-muted">
                    {account.hosting_packages?.name ?? "Package"} · {profile?.email ?? "—"}
                  </p>
                  <p className="mt-1 text-xs text-muted">IP: {account.server_ip ?? "—"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={account.status === "active" ? "success" : "warning"}>{account.status}</Badge>
                  {account.status === "active" ? (
                    <AccountStatusButton accountId={account.id} action="suspend" />
                  ) : (
                    <AccountStatusButton accountId={account.id} action="unsuspend" />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
