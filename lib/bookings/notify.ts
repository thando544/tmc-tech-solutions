import "server-only";
import { Resend } from "resend";
import type { BookingRecord } from "@/lib/bookings/store";
import { formatMoney } from "@/lib/utils";

export async function notifyBooking(booking: BookingRecord, event: "started" | "paid") {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SUPPORT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return;
  }

  const resend = new Resend(apiKey);
  const subject =
    event === "paid"
      ? `Deposit paid: ${booking.reference} (${formatMoney(booking.amountCents)})`
      : `Deposit started: ${booking.reference}`;

  await resend.emails.send({
    from,
    to,
    replyTo: booking.email,
    subject,
    text: [
      `${booking.name} <${booking.email}>`,
      booking.phone ? `Phone: ${booking.phone}` : null,
      booking.company ? `Business: ${booking.company}` : null,
      `Service: ${booking.serviceName}`,
      `Amount: ${formatMoney(booking.amountCents)} ${booking.currency}`,
      `Reference: ${booking.reference}`,
      `Status: ${booking.status}`,
      booking.notes ? `\nNotes:\n${booking.notes}` : null
    ]
      .filter(Boolean)
      .join("\n")
  });
}
