import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    revoked: true,
    event: "credential_revoked"
  });
}
