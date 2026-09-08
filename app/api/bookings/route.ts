import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api/errors";
import { rateLimit } from "@/lib/api/rate-limit";
import { notifyBooking } from "@/lib/bookings/notify";
import { createReference, resolveDeposit, saveBooking, type BookingRecord } from "@/lib/bookings/store";
import { bookingPaymentUrls, initiatePaynowCheckout } from "@/lib/integrations/payments/paynow";
import { bookingSchema } from "@/lib/validations/booking";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    const limited = rateLimit(`booking:${ip}`, 8, 60_000);
    if (!limited.allowed) {
      return NextResponse.json({ error: "Too many payment attempts. Wait a minute and try again." }, { status: 429 });
    }

    const body = bookingSchema.parse(await request.json());
    const deposit = resolveDeposit(body.serviceSlug, body.amountCents);
    const reference = createReference();
    const urls = bookingPaymentUrls(request, reference);
    const amount = deposit.amountCents / 100;

    const checkout = await initiatePaynowCheckout({
      reference,
      email: body.email,
      description: `${deposit.name} — ${reference}`,
      amount,
      resultUrl: urls.resultUrl,
      returnUrl: urls.returnUrl
    });

    const booking: BookingRecord = {
      reference,
      status: "pending",
      name: body.name,
      email: body.email,
      phone: body.phone?.trim() || null,
      company: body.company?.trim() || null,
      serviceSlug: deposit.slug,
      serviceName: deposit.name,
      amountCents: deposit.amountCents,
      currency: "USD",
      notes: body.notes?.trim() || null,
      paynowPollUrl: checkout.pollUrl,
      paynowReference: null,
      paynowStatus: "created",
      paidAt: null,
      createdAt: new Date().toISOString()
    };

    await saveBooking(booking);
    await notifyBooking(booking, "started").catch(() => undefined);

    return NextResponse.json({
      ok: true,
      reference,
      redirectUrl: checkout.redirectUrl
    });
  } catch (error) {
    return apiError(error);
  }
}
