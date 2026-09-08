"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookingDeposits } from "@/content/site";
import { formatMoney } from "@/lib/utils";

export function BookingForm() {
  const [serviceSlug, setServiceSlug] = useState<(typeof bookingDeposits)[number]["slug"] | "custom">(
    bookingDeposits[0].slug
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const selected = bookingDeposits.find((item) => item.slug === serviceSlug);

  return (
    <form
      className="space-y-6 border border-border bg-white p-6 md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setError(null);
        startTransition(async () => {
          const customDollars = Number(data.get("customAmount"));
          const response = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: String(data.get("name")),
              email: String(data.get("email")),
              phone: String(data.get("phone") || ""),
              company: String(data.get("company") || ""),
              serviceSlug,
              amountCents: serviceSlug === "custom" && Number.isFinite(customDollars) ? Math.round(customDollars * 100) : undefined,
              notes: String(data.get("notes") || "")
            })
          });
          const result = (await response.json()) as { error?: string; redirectUrl?: string };
          if (!response.ok || !result.redirectUrl) {
            setError(result.error ?? "Paynow could not start this payment. Try again or email us.");
            return;
          }
          window.location.assign(result.redirectUrl);
        });
      }}
    >
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">What are you booking</legend>
        <div className="grid gap-3">
          {bookingDeposits.map((item) => (
            <label
              key={item.slug}
              className="flex cursor-pointer items-start justify-between gap-4 border border-border p-4 has-[:checked]:border-brand"
            >
              <span>
                <input
                  type="radio"
                  name="service"
                  className="sr-only"
                  checked={serviceSlug === item.slug}
                  onChange={() => setServiceSlug(item.slug)}
                />
                <span className="block font-bold">{item.name}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{item.detail}</span>
              </span>
              <span className="shrink-0 font-logo font-bold">{formatMoney(item.amountCents)}</span>
            </label>
          ))}
          <label className="flex cursor-pointer items-start justify-between gap-4 border border-border p-4 has-[:checked]:border-brand">
            <span>
              <input
                type="radio"
                name="service"
                className="sr-only"
                checked={serviceSlug === "custom"}
                onChange={() => setServiceSlug("custom")}
              />
              <span className="block font-bold">Quoted amount</span>
              <span className="mt-1 block text-sm leading-6 text-muted">
                Pay the deposit we already quoted. Minimum $100.
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      {serviceSlug === "custom" ? (
        <div className="space-y-2">
          <Label htmlFor="customAmount">Amount (USD)</Label>
          <Input id="customAmount" name="customAmount" type="number" min={100} step={50} required placeholder="1500" />
        </div>
      ) : (
        <p className="text-sm text-muted">
          You will pay {selected ? formatMoney(selected.amountCents) : ""} on Paynow (EcoCash, OneMoney, or card).
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (EcoCash)</Label>
          <Input id="phone" name="phone" autoComplete="tel" placeholder="07…" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Business</Label>
          <Input id="company" name="company" autoComplete="organization" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Brief (optional)</Label>
        <Textarea id="notes" name="notes" rows={4} placeholder="Live URL, dates, or the quote we sent you." />
      </div>
      {error ? <p className="text-sm font-medium text-error">{error}</p> : null}
      <Button type="submit" variant="cta" className="w-full sm:w-auto" disabled={isPending}>
        {isPending ? "Opening Paynow..." : "Pay with Paynow"}
      </Button>
    </form>
  );
}
