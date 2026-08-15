import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSiteUrl } from "@/lib/agent/site";

const registerSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  email: z.string().email().optional(),
  identity_type: z.enum(["anonymous", "identity_assertion"]).default("anonymous"),
  redirect_uri: z.string().url().optional()
});

export async function POST(request: NextRequest) {
  const body = registerSchema.parse(await request.json().catch(() => ({})));
  const site = getSiteUrl();

  return NextResponse.json({
    status: "pending",
    identity_type: body.identity_type,
    claim_uri: `${site}/api/agent/claim`,
    message: "Agent registration is accepted for review. Claim an anonymous API key via POST /api/agent/claim or complete human verification at /contact."
  });
}
