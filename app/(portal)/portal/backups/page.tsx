import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Backups" };

export default async function BackupsPage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase
    .from("backups")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeading
        title="Backups"
        description="Automatic and on-demand backups with restore point, retention, size, and provider job tracking."
      />
      {!data?.length ? (
        <EmptyState
          title="No backups"
          description="Backups appear only after real backup jobs run or are synced from the provider."
        />
      ) : (
        <div className="grid gap-4">
          {data.map((backup) => (
            <Card key={backup.id}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <h2 className="font-heading font-semibold">
                    {backup.backup_type} backup
                  </h2>
                  <p className="text-sm text-muted">{backup.size_mb ?? 0} MB</p>
                </div>
                <Badge
                  tone={backup.status === "completed" ? "success" : "warning"}
                >
                  {backup.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
