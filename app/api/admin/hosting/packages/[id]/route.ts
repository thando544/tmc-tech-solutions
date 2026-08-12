import { NextRequest } from "next/server";
import { withAdminApi } from "@/lib/api/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hostingPackageSchema } from "@/lib/validations/hosting";

const publicFields =
  "id, name, slug, description, price, currency, billing_cycle, storage_gb, bandwidth_gb, websites_limit, email_accounts_limit, databases_limit, support_level, is_featured, is_active, sort_order, cyberpanel_package_name, created_at, updated_at";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return withAdminApi(async () => {
    const body = hostingPackageSchema.partial().parse(await request.json());
    const admin = createAdminClient();
    const { data, error } = await admin.from("hosting_packages").update(body).eq("id", id).select(publicFields).single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return withAdminApi(async () => {
    const admin = createAdminClient();
    const { error } = await admin.from("hosting_packages").update({ is_active: false }).eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return { id, deactivated: true };
  });
}
