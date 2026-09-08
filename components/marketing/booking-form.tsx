"use client";

import { useMemo, useState, useTransition } from "react";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookingDeposits } from "@/content/site";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/utils";

export function BookingForm() {
  const [serviceSlug, setServiceSlug] = useState<(typeof bookingDeposits)[number]["slug"] | "custom">(
    bookingDeposits[0].slug
  );
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selected = bookingDeposits.find((item) => item.slug === serviceSlug);
  const amountLabel = useMemo(() => {
    if (serviceSlug === "custom") {
      const dollars = Number(customAmount);
      return Number.isFinite(dollars) && dollars >= 100 ? formatMoney(Math.round(dollars * 100)) : "Quoted amount";
    }
    return selected ? formatMoney(selected.amountCents) : "";
  }, [customAmount, selected, serviceSlug]);

  return (
    <form
      className="border border-border bg-white"
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
              amountCents:
                serviceSlug === "custom" && Number.isFinite(customDollars) ? Math.round(customDollars * 100) : undefined,
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
      <div className="border-b border-border px-6 py-5 md:px-8">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">1 · Work</p>
        <h2 className="mt-2 text-xl font-bold">Choose a deposit</h2>
      </div>

      <fieldset className="space-y-3 px-6 py-6 md:px-8">
        <legend className="sr-only">Deposit option</legend>
        {bookingDeposits.map((item) => {
          const active = serviceSlug === item.slug;
          return (
            <label
              key={item.slug}
              className={cn(
                "flex cursor-pointer items-start justify-between gap-4 border p-4 transition",
                active ? "border-brand bg-[rgba(0,102,186,0.04)]" : "border-border hover:border-foreground"
              )}
            >
              <span className="flex min-w-0 gap-3">
                <span
                  className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border",
                    active ? "border-brand bg-brand text-white" : "border-border bg-white"
                  )}
                  aria-hidden
                >
                  {active ? <Check className="h-3 w-3" /> : null}
                </span>
                <span>
                  <input
                    type="radio"
                    name="service"
                    className="sr-only"
                    checked={active}
                    onChange={() => setServiceSlug(item.slug)}
                  />
                  <span className="block font-bold">{item.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{item.detail}</span>
                </span>
              </span>
              <span className="shrink-0 font-logo text-lg font-bold">{formatMoney(item.amountCents)}</span>
            </label>
          );
        })}
        <label
          className={cn(
            "flex cursor-pointer items-start gap-3 border p-4 transition",
            serviceSlug === "custom" ? "border-brand bg-[rgba(0,102,186,0.04)]" : "border-border hover:border-foreground"
          )}
        >
          <span
            className={cn(
              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border",
              serviceSlug === "custom" ? "border-brand bg-brand text-white" : "border-border bg-white"
            )}
            aria-hidden
          >
            {serviceSlug === "custom" ? <Check className="h-3 w-3" /> : null}
          </span>
          <span className="min-w-0 flex-1">
            <input
              type="radio"
              name="service"
              className="sr-only"
              checked={serviceSlug === "custom"}
              onChange={() => setServiceSlug("custom")}
            />
            <span className="block font-bold">Quoted amount</span>
            <span className="mt-1 block text-sm leading-6 text-muted">Pay the deposit from a written quote. Minimum $100.</span>
            {serviceSlug === "custom" ? (
              <span className="mt-4 block max-w-xs space-y-2">
                <Label htmlFor="customAmount">Amount (USD)</Label>
                <Input
                  id="customAmount"
                  name="customAmount"
                  type="number"
                  min={100}
                  step={50}
                  required
                  placeholder="1500"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                />
              </span>
            ) : null}
          </span>
        </label>
      </fieldset>

      <div className="border-t border-border px-6 py-6 md:px-8">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">2 · Your details</p>
        <h2 className="mt-2 text-xl font-bold">Who should we confirm with</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" autoComplete="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" autoComplete="tel" placeholder="07… for EcoCash" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Business</Label>
            <Input id="company" name="company" autoComplete="organization" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Brief (optional)</Label>
            <Textarea id="notes" name="notes" rows={4} placeholder="Live URL, dates, or the quote we sent you." />
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-secondary-background px-6 py-6 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted">You will pay on Paynow</p>
            <p className="mt-1 font-logo text-2xl font-bold">{amountLabel}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <Lock className="h-3.5 w-3.5" aria-hidden />
              Card numbers stay on Paynow. This site never collects them.
            </p>
          </div>
          <Button type="submit" variant="cta" size="lg" className="h-12 w-full sm:w-auto" disabled={isPending}>
            {isPending ? "Opening Paynow..." : "Continue to Paynow"}
          </Button>
        </div>
        {error ? <p className="mt-4 text-sm font-medium text-error">{error}</p> : null}
      </div>
    </form>
  );
}
