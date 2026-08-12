import { NextRequest } from "next/server";
import { withAdminApi } from "@/lib/api/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  return withAdminApi(async () => {
    const admin = createAdminClient();
    let query = admin.from("hosting_orders").select("*, hosting_packages(name, slug)").order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  });
}
