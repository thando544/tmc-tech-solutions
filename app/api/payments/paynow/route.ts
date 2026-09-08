import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Paynow deposits are created at POST /api/bookings from the public /book page." },
    { status: 410 }
  );
}
