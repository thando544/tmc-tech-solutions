import { NextRequest } from "next/server";
import { withAdminApi } from "@/lib/api/admin";
import { provisionHostingOrder } from "@/lib/hosting/service";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return withAdminApi(async (adminUserId) => provisionHostingOrder(id, adminUserId));
}
