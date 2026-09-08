"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { CTAButton } from "@/components/marketing/cta-button";
import { formatMoney } from "@/lib/utils";

type Status = {
  reference: string;
  status: string;
  serviceName: string;
  amountCents: number;
  currency: string;
};

export function BookingReturn() {
  const reference = useSearchParams().get("reference") ?? "";
  const [data, setData] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setError("Missing booking reference.");
      return;
    }

    let cancelled = false;
    let attempts = 0;

    async function load() {
      attempts += 1;
      const response = await fetch(`/api/bookings/status?reference=${encodeURIComponent(reference)}`);
      const result = (await response.json()) as Status & { error?: string };
      if (cancelled) {
        return;
      }
      if (!response.ok) {
        setError(result.error ?? "We could not find this booking.");
        return;
      }
      setData(result);
      if (result.status !== "paid" && attempts < 20) {
        window.setTimeout(() => {
          void load();
        }, 3000);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [reference]);

  if (error) {
    return (
      <div className="mx-auto max-w-lg border border-border bg-white p-8 md:p-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Paynow</p>
        <h1 className="mt-3 text-3xl font-bold">Payment not found</h1>
        <p className="mt-4 leading-7 text-muted">{error}</p>
        <div className="mt-8">
          <CTAButton href="/book">Back to Book</CTAButton>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-lg border border-border bg-white p-8 md:p-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Paynow</p>
        <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold">
          <LoaderCircle className="h-7 w-7 animate-spin text-brand" aria-hidden />
          Confirming payment
        </h1>
        <p className="mt-4 leading-7 text-muted">Stay on this page. We are checking Paynow for your deposit.</p>
      </div>
    );
  }

  const paid = data.status === "paid";

  return (
    <div className="mx-auto max-w-lg border border-border bg-white p-8 md:p-10">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">{paid ? "Paid" : "Pending"}</p>
      <h1 className="mt-3 text-3xl font-bold">{paid ? "Deposit received" : "Waiting for Paynow"}</h1>
      <p className="mt-4 leading-7 text-muted">
        {paid
          ? "We will email you within one working day with next steps."
          : "If you just paid, this page will update. If you cancelled on Paynow, you can start again."}
      </p>
      <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Reference</dt>
          <dd className="font-semibold">{data.reference}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Work</dt>
          <dd className="text-right font-semibold">{data.serviceName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Amount</dt>
          <dd className="font-logo text-lg font-bold">{formatMoney(data.amountCents, data.currency)}</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        {paid ? <CTAButton href="/">Back to the site</CTAButton> : <CTAButton href="/book">Pay again</CTAButton>}
        <CTAButton href="/contact" variant="secondary">
          Send a brief
        </CTAButton>
      </div>
    </div>
  );
}
