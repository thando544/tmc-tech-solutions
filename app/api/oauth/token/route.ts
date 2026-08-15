import { NextResponse } from "next/server";
import { wwwAuthenticate } from "@/lib/agent/oauth";
import { originFromRequest } from "@/lib/agent/site";

export async function POST(request: Request) {
  const site = originFromRequest(request);
  return NextResponse.json(
    {
      error: "unsupported_grant_type",
      error_description: "Register at /agent/identity, then retry token exchange."
    },
    {
      status: 400,
      headers: {
        "WWW-Authenticate": wwwAuthenticate(site)
      }
    }
  );
}
