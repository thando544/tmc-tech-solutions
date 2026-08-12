"use client";

import Link from "next/link";
import { CreditCard, Smartphone, WalletCards } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addOns, checkoutSteps } from "@/lib/catalog";
import { cartStorageKey, type CartItem } from "@/lib/cart";
import { formatMoney } from "@/lib/utils";

const methods = [
  { id: "ecocash", label: "EcoCash", description: "Mobile money via Paynow Zimbabwe.", icon: Smartphone },
  { id: "card", label: "Card", description: "Visa or Mastercard via card processor.", icon: CreditCard },
  { id: "paypal", label: "PayPal", description: "Pay with a PayPal account.", icon: WalletCards }
] as const;

export function CheckoutForm({ mode = "public" }: { mode?: "public" | "portal" }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("ecocash");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const addonTotal = (item.addons ?? []).reduce((addonSum, slug) => addonSum + (addOns.find((addon) => addon.slug === slug)?.priceCents ?? 0), 0);
        return sum + item.priceCents + addonTotal;
      }, 0),
    [items]
  );
  const monthlyTotal = useMemo(() => items.filter((item) => item.billingCycle === "monthly").reduce((sum, item) => sum + item.priceCents, 0), [items]);
  const yearlyTotal = useMemo(() => items.filter((item) => item.billingCycle === "yearly").reduce((sum, item) => sum + item.priceCents, 0), [items]);
  const oneTimeTotal = useMemo(() => items.filter((item) => item.billingCycle === "one-time").reduce((sum, item) => sum + item.priceCents, 0), [items]);
  const quoteItems = useMemo(() => items.filter((item) => item.billingCycle === "quote").length, [items]);

  useEffect(() => {
    function loadLocal() {
      setItems(JSON.parse(window.localStorage.getItem(cartStorageKey) ?? "[]") as CartItem[]);
    }

    if (mode === "portal") {
      loadLocal();
      void fetch("/api/cart")
        .then((response) => (response.ok ? response.json() : Promise.reject()))
        .then((data: { items: CartItem[] }) => setItems(data.items))
        .catch(loadLocal);
    } else {
      loadLocal();
    }
  }, [mode]);

  if (items.length === 0) {
    return <EmptyState title="No items to checkout" description="Add hosting, domains, email, VPS, SSL, website services, or mobile app development to your cart first." />;
  }

  return (
    <form
      className="grid gap-6 lg:grid-cols-[1fr_380px]"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setMessage(null);
        startTransition(async () => {
          const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items,
              paymentMethod: method,
              customer: {
                fullName: String(formData.get("fullName")),
                email: String(formData.get("email")),
                phone: String(formData.get("phone"))
              }
            })
          });
          const result = (await response.json()) as { error?: string };
          setMessage(response.ok ? "Checkout started." : result.error ?? "Checkout could not be started.");
        });
      }}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4 p-5">
            <h2 className="font-heading text-xl font-semibold">Customer details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" name="fullName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Phone for EcoCash</Label>
                <Input id="phone" name="phone" placeholder="+263..." />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-5">
            <h2 className="font-heading text-xl font-semibold">Checkout flow</h2>
            <ol className="grid gap-2 text-sm text-muted sm:grid-cols-2">
              {checkoutSteps.map((step, index) => (
                <li key={step} className="rounded-md border border-border bg-secondary-background p-3">
                  <span className="font-semibold text-foreground">{index + 1}. </span>
                  {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-5">
            <h2 className="font-heading text-xl font-semibold">Payment method</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {methods.map((paymentMethod) => {
                const Icon = paymentMethod.icon;
                return (
                  <label key={paymentMethod.id} className="cursor-pointer rounded-lg border border-border bg-white p-4 has-[:checked]:border-brand has-[:checked]:ring-2 has-[:checked]:ring-green-100">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={paymentMethod.id}
                      checked={method === paymentMethod.id}
                      onChange={() => setMethod(paymentMethod.id)}
                      className="sr-only"
                    />
                    <Icon className="h-5 w-5 text-brand" />
                    <p className="mt-3 font-semibold">{paymentMethod.label}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{paymentMethod.description}</p>
                  </label>
                );
              })}
            </div>
            <p className="text-sm text-muted">
              Payments are created server-side only. Provider setup is required before real payments can be accepted.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="font-heading text-xl font-semibold">Order summary</h2>
          <div className="mt-5 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="space-y-1 border-b border-border pb-3 text-sm last:border-b-0 last:pb-0">
                <div className="flex justify-between gap-4">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.billingCycle === "quote" ? "Request quote" : formatMoney(item.priceCents)}</span>
                </div>
                <p className="text-xs text-muted">
                  {item.billingCycle === "monthly" ? "/month" : item.billingCycle === "yearly" ? "/year" : item.billingCycle === "one-time" ? "one-time" : "request quote"}
                </p>
                {item.domainName ? <p className="text-xs text-muted">{item.domainMode === "register" ? "Register" : "Use"} {item.domainName}</p> : null}
                {item.type === "email" ? <p className="text-xs text-muted">Email account limits follow the selected mailbox plan.</p> : null}
                {(item.addons ?? []).map((slug) => {
                  const addon = addOns.find((entry) => entry.slug === slug);
                  return addon ? (
                    <div key={slug} className="flex justify-between gap-4 text-xs text-muted">
                      <span>{addon.name}</span>
                      <span>{formatMoney(addon.priceCents)}</span>
                    </div>
                  ) : null;
                })}
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-between border-t border-border pt-5 font-heading text-xl font-bold">
            <span>Total</span>
            <span>{formatMoney(total)}</span>
          </div>
          <div className="mt-4 space-y-1 text-sm text-muted">
            <div className="flex justify-between"><span>Monthly items</span><span>{formatMoney(monthlyTotal)}</span></div>
            <div className="flex justify-between"><span>Yearly items</span><span>{formatMoney(yearlyTotal)}</span></div>
            <div className="flex justify-between"><span>One-time items</span><span>{formatMoney(oneTimeTotal)}</span></div>
            {quoteItems ? <div className="flex justify-between"><span>Quote requests</span><span>{quoteItems}</span></div> : null}
          </div>
          {message ? <p className="mt-4 text-sm text-muted">{message}</p> : null}
          <Button className="mt-6 w-full" variant="cta" disabled={isPending}>
            {isPending ? "Starting checkout..." : "Pay securely"}
          </Button>
          {mode === "public" ? <Button asChild className="mt-3 w-full" variant="secondary">
            <Link href="/signup">Create account</Link>
          </Button> : null}
        </CardContent>
      </Card>
    </form>
  );
}
