"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { addOns } from "@/lib/catalog";
import { cartStorageKey, type CartItem } from "@/lib/cart";
import { formatMoney } from "@/lib/utils";

export function CartView({ mode = "public", checkoutHref = "/checkout" }: { mode?: "public" | "portal"; checkoutHref?: string }) {
  const [items, setItems] = useState<CartItem[]>([]);

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

    window.addEventListener("tmc-cart-updated", mode === "portal" ? loadLocal : loadLocal);
    window.addEventListener("storage", loadLocal);
    return () => {
      window.removeEventListener("tmc-cart-updated", loadLocal);
      window.removeEventListener("storage", loadLocal);
    };
  }, [mode]);

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const addonTotal = (item.addons ?? []).reduce((addonSum, slug) => addonSum + (addOns.find((addon) => addon.slug === slug)?.priceCents ?? 0), 0);
        return sum + item.priceCents + addonTotal;
      }, 0),
    [items]
  );

  function remove(id: string) {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    window.localStorage.setItem(cartStorageKey, JSON.stringify(next));
    if (mode === "portal") {
      void fetch(`/api/cart?itemId=${encodeURIComponent(id)}`, { method: "DELETE" });
    }
    window.dispatchEvent(new Event("tmc-cart-updated"));
  }

  function configure(id: string, patch: Partial<CartItem>) {
    const next = items.map((item) => (item.id === id ? { ...item, ...patch } : item));
    setItems(next);
    window.localStorage.setItem(cartStorageKey, JSON.stringify(next));
    if (mode === "portal") {
      void fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...patch })
      });
    }
    window.dispatchEvent(new Event("tmc-cart-updated"));
  }

  if (items.length === 0) {
    return <EmptyState title="Your cart is empty" description="Choose hosting, domains, email, VPS, SSL, website services, or mobile app development to start an order." />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_auto]">
              <div className="space-y-4">
                <h2 className="font-heading font-semibold">{item.name}</h2>
                <p className="text-sm capitalize text-muted">{item.type.replaceAll("_", " ")} · billed {item.billingCycle === "quote" ? "request quote" : item.billingCycle}</p>
                {["hosting", "wordpress", "email", "domain"].includes(item.type) ? (
                  <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
                    <select
                      className="h-10 rounded-md border border-border bg-white px-3 text-sm"
                      value={item.domainMode ?? "existing"}
                      onChange={(event) => configure(item.id, { domainMode: event.target.value as CartItem["domainMode"] })}
                      aria-label={`${item.name} domain option`}
                    >
                      <option value="existing">Use existing domain</option>
                      <option value="register">Register new domain</option>
                    </select>
                    <input
                      className="h-10 rounded-md border border-border px-3 text-sm"
                      value={item.domainName ?? ""}
                      onChange={(event) => configure(item.id, { domainName: event.target.value })}
                      placeholder="example.com"
                      aria-label={`${item.name} domain name`}
                    />
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {addOns.slice(0, 3).map((addon) => {
                    const selected = item.addons?.includes(addon.slug) ?? false;
                    return (
                      <label key={addon.slug} className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={(event) => {
                            const addons = new Set(item.addons ?? []);
                            if (event.target.checked) {
                              addons.add(addon.slug);
                            } else {
                              addons.delete(addon.slug);
                            }
                            configure(item.id, { addons: [...addons] });
                          }}
                        />
                        {addon.name}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 lg:justify-end">
                <p className="font-semibold">{formatMoney(item.priceCents, item.currency)}</p>
                <Button variant="secondary" size="icon" aria-label={`Remove ${item.name}`} onClick={() => remove(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-5">
          <h2 className="font-heading text-xl font-semibold">Order summary</h2>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
            <span className="font-medium">Due now</span>
            <span className="font-heading text-2xl font-bold">{formatMoney(total)}</span>
          </div>
          <Button asChild variant="cta" className="mt-6 w-full">
            <Link href={checkoutHref}>Continue to Checkout</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
