"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ProvisionOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function provision() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/hosting/orders/${orderId}/provision`, { method: "POST" });
      const json = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(json.error ?? "Provisioning failed.");
      }
      router.refresh();
    } catch (provisionError) {
      setError(provisionError instanceof Error ? provisionError.message : "Provisioning failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button type="button" variant="cta" size="sm" onClick={provision} disabled={loading}>
        {loading ? "Provisioning…" : "Provision"}
      </Button>
      {error ? <p className="max-w-xs text-right text-xs text-error">{error}</p> : null}
    </div>
  );
}
