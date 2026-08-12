"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { cartStorageKey, type CartItem } from "@/lib/cart";

export function PortalCartLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function load() {
      const localItems = JSON.parse(window.localStorage.getItem(cartStorageKey) ?? "[]") as CartItem[];
      setCount(localItems.length);
      void fetch("/api/cart")
        .then((response) => (response.ok ? response.json() : Promise.reject()))
        .then((data: { count: number }) => setCount(data.count))
        .catch(() => setCount(localItems.length));
    }

    load();
    window.addEventListener("tmc-cart-updated", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("tmc-cart-updated", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return (
    <Link href="/portal/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted transition hover:bg-secondary-background hover:text-foreground" aria-label={`Cart with ${count} item${count === 1 ? "" : "s"}`}>
      <ShoppingCart className="h-4 w-4" aria-hidden />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cta px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
