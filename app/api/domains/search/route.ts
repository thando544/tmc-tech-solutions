import { NextRequest, NextResponse } from "next/server";
import { apiError, SetupRequiredError } from "@/lib/api/errors";
import { rateLimit } from "@/lib/api/rate-limit";
import { requireOpenSrsConfigured } from "@/lib/integrations/opensrs/client";
import { domainAvailabilitySchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(`domain-search:${request.headers.get("x-forwarded-for") ?? "anonymous"}`, 20, 60_000);
    if (!limited.allowed) {
      return NextResponse.json({ error: "Too many domain searches. Please wait a moment." }, { status: 429 });
    }

    const body = domainAvailabilitySchema.parse(await request.json());
    await requireOpenSrsConfigured();

    throw new SetupRequiredError(`Live OpenSRS availability mapping is not connected yet for ${body.domainName}.`);
  } catch (error) {
    return apiError(error);
  }
}
