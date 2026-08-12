import { NextRequest } from "next/server";
import { withAdminApi } from "@/lib/api/admin";
import { setHostingAccountStatus } from "@/lib/hosting/service";
import { hostingAccountStatusSchema } from "@/lib/validations/hosting";

export async function POST(request: NextRequest) {
  return withAdminApi(async (adminUserId) => {
    const body = hostingAccountStatusSchema.parse(await request.json());
    return setHostingAccountStatus(body.account_id, body.action, adminUserId);
  });
}
