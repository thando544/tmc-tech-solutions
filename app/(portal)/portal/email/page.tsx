import { ExternalLink, KeyRound, MailPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Email Accounts" };

export default async function EmailAccountsPage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("email_accounts").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <PageHeading title="Email accounts" description="Mailboxes, quotas, spam filtering, usage, forwarders, aliases, password resets, and webmail access." />
        <Button variant="cta"><MailPlus className="h-4 w-4" /> Create Email</Button>
      </div>
      {!data?.length ? (
        <EmptyState title="No email accounts" description="Mailboxes will appear after a hosting service is provisioned or an email plan is activated." />
      ) : (
        <div className="grid gap-4">
          {data.map((mailbox) => (
            <Card key={mailbox.id}>
              <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="font-heading font-semibold">{mailbox.email_address}</h2>
                  <p className="text-sm text-muted">
                    {mailbox.used_mb} MB used of {mailbox.quota_mb} MB · Spam filtering {mailbox.spam_filtering_enabled ? "enabled" : "disabled"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone={mailbox.status === "active" ? "success" : "warning"}>{mailbox.status}</Badge>
                  <Button variant="secondary" size="sm"><KeyRound className="h-4 w-4" /> Reset</Button>
                  <Button variant="secondary" size="sm"><ExternalLink className="h-4 w-4" /> Webmail</Button>
                  <Button variant="secondary" size="sm"><Trash2 className="h-4 w-4" /> Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
