import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function POST() {
  return NextResponse.json({
    credential_type: "api_key",
    api_key: `tmc_pending_${randomBytes(12).toString("hex")}`,
    status: "pending_review",
    scopes: ["agent:read"]
  });
}
