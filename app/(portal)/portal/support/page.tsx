import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Support" };

export default async function PortalSupportPage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("support_tickets").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

  return (
    <>
      <PageHeading title="Support" description="Authenticated support tickets and service requests." />
      {!data?.length ? (
        <EmptyState title="No support tickets" description="Create a support request when you need help with hosting, domains, email, SSL, backups, or billing." />
      ) : (
        <div className="grid gap-4">
          {data.map((ticket) => (
            <Card key={ticket.id}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <h2 className="font-heading font-semibold">{ticket.subject}</h2>
                  <p className="text-sm text-muted">{ticket.priority}</p>
                </div>
                <Badge>{ticket.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
