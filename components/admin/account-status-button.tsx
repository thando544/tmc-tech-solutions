"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AccountStatusButton({
  accountId,
  action
}: {
  accountId: string;
  action: "suspend" | "unsuspend";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runAction() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/hosting/accounts/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_id: accountId, action })
      });
      const json = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(json.error ?? "Status update failed.");
      }
      router.refresh();
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Status update failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        variant={action === "suspend" ? "destructive" : "default"}
        size="sm"
        onClick={runAction}
        disabled={loading}
      >
        {loading ? "Updating…" : action === "suspend" ? "Suspend" : "Unsuspend"}
      </Button>
      {error ? <p className="max-w-xs text-right text-xs text-error">{error}</p> : null}
    </div>
  );
}
