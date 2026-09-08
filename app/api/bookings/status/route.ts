import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api/errors";
import { notifyBooking } from "@/lib/bookings/notify";
import { getBooking, markBookingStatus } from "@/lib/bookings/store";
import { bookingPaymentUrls, isPaidStatus, pollPaynow } from "@/lib/integrations/payments/paynow";

export async function GET(request: NextRequest) {
  try {
    const reference = request.nextUrl.searchParams.get("reference")?.trim();
    if (!reference) {
      return NextResponse.json({ error: "Missing booking reference." }, { status: 400 });
    }

    const booking = await getBooking(reference);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    if (booking.status === "paid" || !booking.paynowPollUrl) {
      return NextResponse.json({
        reference: booking.reference,
        status: booking.status,
        serviceName: booking.serviceName,
        amountCents: booking.amountCents,
        currency: booking.currency
      });
    }

    const urls = bookingPaymentUrls(request, reference);
    const poll = await pollPaynow(booking.paynowPollUrl, urls.resultUrl, urls.returnUrl);
    const paid = isPaidStatus(poll.status);
    const next = paid
      ? await markBookingStatus(reference, "paid", { paynowStatus: poll.status })
      : await markBookingStatus(reference, booking.status, { paynowStatus: poll.status });

    if (paid && next) {
      await notifyBooking(next, "paid").catch(() => undefined);
    }

    const current = next ?? booking;
    return NextResponse.json({
      reference: current.reference,
      status: current.status,
      serviceName: current.serviceName,
      amountCents: current.amountCents,
      currency: current.currency,
      paynowStatus: poll.status
    });
  } catch (error) {
    return apiError(error);
  }
}
