import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { apiError, SetupRequiredError } from "@/lib/api/errors";
import { rateLimit } from "@/lib/api/rate-limit";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    const limited = rateLimit(`contact:${ip}`, 5, 60_000);
    if (!limited.allowed) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const body = contactSchema.parse(await request.json());
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.SUPPORT_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      throw new SetupRequiredError("Transactional email is not configured on the server.");
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: `Hosting enquiry from ${body.name}`,
      replyTo: body.email,
      text: body.message
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
