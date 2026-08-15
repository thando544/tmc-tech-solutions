import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { originFromRequest } from "@/lib/agent/site";

const registerSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  email: z.string().email().optional(),
  type: z.enum(["anonymous", "identity_assertion", "service_auth"]).optional(),
  identity_type: z.enum(["anonymous", "identity_assertion"]).default("anonymous"),
  redirect_uri: z.string().url().optional()
});

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization"
    }
  });
}

export async function POST(request: NextRequest) {
  const body = registerSchema.parse(await request.json().catch(() => ({})));
  const site = originFromRequest(request);
  const identityType = body.type === "service_auth" ? "anonymous" : (body.type ?? body.identity_type);

  return NextResponse.json({
    status: "pending",
    identity_type: identityType,
    identity_endpoint: `${site}/agent/identity`,
    claim_endpoint: `${site}/agent/identity/claim`,
    claim_uri: `${site}/agent/identity/claim`,
    message: "Agent registration is accepted for review. Claim an anonymous API key via POST /agent/identity/claim or complete human verification at /contact."
  });
}
