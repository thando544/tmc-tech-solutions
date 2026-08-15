import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "temporarily_unavailable",
      error_description: "OAuth token issuance for agents is metadata-complete. Complete registration via /api/agent/register."
    },
    { status: 501 }
  );
}
