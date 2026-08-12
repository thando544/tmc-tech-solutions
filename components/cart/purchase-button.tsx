"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cartStorageKey, getCatalogItem, type CartItem } from "@/lib/cart";

export function PurchaseButton({
  type,
  slug,
  children,
  redirectTo
}: {
  type: CartItem["type"];
  slug: string;
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Button
      type="button"
      variant="cta"
      className="mt-auto"
      disabled={isAdding}
      onClick={() => {
        const item = getCatalogItem(type, slug);
        if (!item) {
          return;
        }

        setIsAdding(true);
        const existing = JSON.parse(window.localStorage.getItem(cartStorageKey) ?? "[]") as CartItem[];
        const next = existing.some((cartItem) => cartItem.id === item.id) ? existing : [...existing, item];
        window.localStorage.setItem(cartStorageKey, JSON.stringify(next));
        window.dispatchEvent(new Event("tmc-cart-updated"));

        void fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, slug })
        })
          .catch(() => undefined)
          .finally(() => {
            window.dispatchEvent(new Event("tmc-cart-updated"));
            setIsAdding(false);
            router.push(redirectTo ?? "/cart");
          });
      }}
    >
      <ShoppingCart className="h-4 w-4" />
      {isAdding ? "Adding..." : children}
    </Button>
  );
}
