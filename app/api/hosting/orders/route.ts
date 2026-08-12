import { NextRequest } from "next/server";
import { withAuthedApi } from "@/lib/api/handler";
import { createHostingOrder } from "@/lib/hosting/service";
import { hostingOrderSchema } from "@/lib/validations/hosting";

export async function POST(request: NextRequest) {
  return withAuthedApi(request, "hosting", "create_order", async (userId) => {
    const body = hostingOrderSchema.parse(await request.json());
    const order = await createHostingOrder(userId, body.package_id, body.domain);
    return order;
  });
}

export async function GET(request: NextRequest) {
  return withAuthedApi(request, "hosting", "list_orders", async (userId) => {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("hosting_orders")
      .select("*, hosting_packages(name, slug, price, currency, billing_cycle)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  });
}
