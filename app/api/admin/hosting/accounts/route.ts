import { withAdminApi } from "@/lib/api/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  return withAdminApi(async () => {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("hosting_accounts")
      .select("*, hosting_packages(name, slug), hosting_orders(status, created_at)")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  });
}
