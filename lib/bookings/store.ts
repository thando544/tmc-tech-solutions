import "server-only";
import { bookingDeposits } from "@/content/site";
import { createAdminClient } from "@/lib/supabase/admin";

export type BookingStatus = "pending" | "paid" | "cancelled" | "failed" | "expired";

export type BookingRecord = {
  reference: string;
  status: BookingStatus;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceSlug: string;
  serviceName: string;
  amountCents: number;
  currency: "USD";
  notes: string | null;
  paynowPollUrl: string | null;
  paynowReference: string | null;
  paynowStatus: string | null;
  paidAt: string | null;
  createdAt: string;
};

const g = globalThis as unknown as { __tmcBookings?: Map<string, BookingRecord> };

function memory() {
  g.__tmcBookings ??= new Map();
  return g.__tmcBookings;
}

export function resolveDeposit(slug: string, customAmountCents?: number) {
  if (slug === "custom") {
    if (!customAmountCents) {
      throw new Error("Enter an amount for a custom deposit.");
    }
    return {
      slug: "custom",
      name: "Custom deposit",
      amountCents: customAmountCents,
      detail: "Applied to the quoted project."
    };
  }

  const item = bookingDeposits.find((deposit) => deposit.slug === slug);
  if (!item) {
    throw new Error("Unknown booking option.");
  }
  return item;
}

export function createReference() {
  return `TMC-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

function fromRow(row: Record<string, unknown>): BookingRecord {
  return {
    reference: String(row.reference),
    status: row.status as BookingStatus,
    name: String(row.name),
    email: String(row.email),
    phone: (row.phone as string | null) ?? null,
    company: (row.company as string | null) ?? null,
    serviceSlug: String(row.service_slug),
    serviceName: String(row.service_name),
    amountCents: Number(row.amount_cents),
    currency: "USD",
    notes: (row.notes as string | null) ?? null,
    paynowPollUrl: (row.paynow_poll_url as string | null) ?? null,
    paynowReference: (row.paynow_reference as string | null) ?? null,
    paynowStatus: (row.paynow_status as string | null) ?? null,
    paidAt: (row.paid_at as string | null) ?? null,
    createdAt: String(row.created_at)
  };
}

export async function saveBooking(record: BookingRecord) {
  memory().set(record.reference, record);

  try {
    const supabase = createAdminClient();
    await supabase.from("project_bookings").upsert(
      {
        reference: record.reference,
        status: record.status,
        name: record.name,
        email: record.email,
        phone: record.phone,
        company: record.company,
        service_slug: record.serviceSlug,
        service_name: record.serviceName,
        amount_cents: record.amountCents,
        currency: record.currency,
        notes: record.notes,
        paynow_poll_url: record.paynowPollUrl,
        paynow_reference: record.paynowReference,
        paynow_status: record.paynowStatus,
        paid_at: record.paidAt,
        created_at: record.createdAt
      },
      { onConflict: "reference" }
    );
  } catch {
    // Local/dev still works from memory if the table is not migrated yet.
  }
}

export async function getBooking(reference: string) {
  const cached = memory().get(reference);
  if (cached) {
    return cached;
  }

  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("project_bookings").select("*").eq("reference", reference).maybeSingle();
    if (data) {
      const record = fromRow(data as Record<string, unknown>);
      memory().set(reference, record);
      return record;
    }
  } catch {
    return cached ?? null;
  }

  return null;
}

export async function markBookingStatus(
  reference: string,
  status: BookingStatus,
  extra?: Partial<Pick<BookingRecord, "paynowPollUrl" | "paynowReference" | "paynowStatus" | "paidAt">>
) {
  const current = await getBooking(reference);
  if (!current) {
    return null;
  }

  const next: BookingRecord = {
    ...current,
    ...extra,
    status,
    paidAt: status === "paid" ? extra?.paidAt ?? new Date().toISOString() : current.paidAt
  };
  await saveBooking(next);
  return next;
}
