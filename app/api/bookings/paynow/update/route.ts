import { NextRequest, NextResponse } from "next/server";
import { notifyBooking } from "@/lib/bookings/notify";
import { getBooking, markBookingStatus, type BookingStatus } from "@/lib/bookings/store";
import { isPaidStatus, parsePaynowUpdate } from "@/lib/integrations/payments/paynow";

function mapPaynowStatus(status: string): BookingStatus {
  const value = status.toLowerCase();
  if (value === "paid") return "paid";
  if (value === "cancelled") return "cancelled";
  if (value === "failed") return "failed";
  if (value === "expired") return "expired";
  return "pending";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const update = parsePaynowUpdate(body);
    const reference = update.reference;
    if (!reference) {
      return new NextResponse("ok", { status: 200 });
    }

    const booking = await getBooking(reference);
    if (!booking) {
      return new NextResponse("ok", { status: 200 });
    }

    const status = String(update.status ?? "").toLowerCase();
    const mapped = mapPaynowStatus(status);
    const paid = isPaidStatus(status);

    const next = await markBookingStatus(reference, mapped, {
      paynowReference: update.paynowReference ?? booking.paynowReference,
      paynowStatus: status,
      paynowPollUrl: update.pollUrl ?? booking.paynowPollUrl
    });

    if (paid && next && booking.status !== "paid") {
      await notifyBooking(next, "paid").catch(() => undefined);
    }

    return new NextResponse("ok", { status: 200 });
  } catch {
    return new NextResponse("ok", { status: 200 });
  }
}
