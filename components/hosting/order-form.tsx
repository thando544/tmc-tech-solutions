"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatHostingPrice } from "@/lib/hosting/format";
import type { HostingPackage } from "@/lib/hosting/types";

export function HostingOrderForm({ pkg }: { pkg: HostingPackage }) {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const price = formatHostingPrice(pkg);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hosting/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package_id: pkg.id, domain: domain.trim().toLowerCase() })
      });

      const json = (await response.json()) as { error?: string; data?: { id: string } };

      if (!response.ok) {
        throw new Error(json.error ?? "Could not submit hosting order.");
      }

      router.push("/portal/hosting?ordered=1");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not submit hosting order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-border bg-white p-6 shadow-sm">
      <p className="text-sm text-muted">
        Ordering <span className="font-semibold text-foreground">{pkg.name}</span> at {price.label}
      </p>
      <div className="mt-5 space-y-2">
        <Label htmlFor="domain">Primary domain</Label>
        <Input
          id="domain"
          name="domain"
          placeholder="example.com"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          required
          autoComplete="off"
        />
        <p className="text-xs text-muted">Use the domain you want on this hosting account. Provisioning starts after admin approval.</p>
      </div>
      {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}
      <Button type="submit" variant="cta" className="mt-6 w-full" disabled={loading}>
        {loading ? "Submitting order…" : "Submit hosting order"}
      </Button>
    </form>
  );
}
