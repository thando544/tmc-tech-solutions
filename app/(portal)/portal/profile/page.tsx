import { Card, CardContent } from "@/components/ui/card";
import { PageHeading } from "@/components/portal/page-heading";
import { getPortalContext } from "@/lib/db/portal";

export const metadata = { title: "Profile" };

export default async function PortalProfilePage() {
  const { supabase, user } = await getPortalContext();
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <>
      <PageHeading title="Profile" description="Your account profile from Supabase Auth and protected profile storage." />
      <Card>
        <CardContent className="grid gap-4 p-5 text-sm sm:grid-cols-2">
          <div>
            <p className="text-muted">Email</p>
            <p className="mt-1 font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-muted">Full name</p>
            <p className="mt-1 font-medium">{data?.full_name ?? "Not set"}</p>
          </div>
          <div>
            <p className="text-muted">Company</p>
            <p className="mt-1 font-medium">{data?.company_name ?? "Not set"}</p>
          </div>
          <div>
            <p className="text-muted">Phone</p>
            <p className="mt-1 font-medium">{data?.phone ?? "Not set"}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
