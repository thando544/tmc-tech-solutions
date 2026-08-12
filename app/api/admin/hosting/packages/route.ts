import { NextRequest } from "next/server";
import { withAdminApi } from "@/lib/api/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hostingPackageSchema } from "@/lib/validations/hosting";

const publicFields =
  "id, name, slug, description, price, currency, billing_cycle, storage_gb, bandwidth_gb, websites_limit, email_accounts_limit, databases_limit, support_level, is_featured, is_active, sort_order, cyberpanel_package_name, created_at, updated_at";

export async function GET() {
  return withAdminApi(async () => {
    const admin = createAdminClient();
    const { data, error } = await admin.from("hosting_packages").select(publicFields).order("sort_order", { ascending: true });
    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  });
}

export async function POST(request: NextRequest) {
  return withAdminApi(async () => {
    const body = hostingPackageSchema.parse(await request.json());
    const admin = createAdminClient();
    const { data, error } = await admin.from("hosting_packages").insert(body).select(publicFields).single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });
}
