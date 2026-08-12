import { NextRequest, NextResponse } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { SetupRequiredError } from "@/lib/api/errors";
import { createAdminClient } from "@/lib/supabase/admin";
import { dnsRecordSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  const body = dnsRecordSchema.parse(await request.json());

  return withAuthedApi(request, "dns", "upsertRecord", async (userId) => {
    const supabase = createAdminClient();
    const { data: zone } = await supabase.from("dns_zones").select("id").eq("id", body.zoneId).eq("user_id", userId).single();
    if (!zone) {
      throw new Error("DNS zone not found.");
    }

    await auditLog({
      userId,
      action: body.recordId ? "dns_record_update_requested" : "dns_record_create_requested",
      resourceType: "dns_record",
      resourceId: body.recordId ?? null,
      metadata: body
    });

    throw new SetupRequiredError("DNS provider update route is prepared but CyberPanel/OpenSRS DNS mapping is not connected yet.");
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const recordId = searchParams.get("recordId");

  return withAuthedApi(request, "dns", "deleteRecord", async (userId) => {
    if (!recordId) {
      return NextResponse.json({ error: "recordId is required." }, { status: 400 });
    }

    await auditLog({ userId, action: "dns_record_delete_requested", resourceType: "dns_record", resourceId: recordId });
    throw new SetupRequiredError("DNS record deletion is prepared but provider mapping is not connected yet.");
  });
}
