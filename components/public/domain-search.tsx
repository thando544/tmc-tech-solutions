"use client";

import { Search } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DomainSearch() {
  const [domainName, setDomainName] = useState("");
  const [message, setMessage] = useState("Live availability requires OpenSRS server credentials. No fake domain results are shown.");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="rounded-lg border border-border bg-white p-3 shadow-lg shadow-slate-200/70"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("");
        startTransition(async () => {
          const response = await fetch("/api/domains/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domainName, operation: "checkAvailability" })
          });
          const result = (await response.json()) as { error?: string; message?: string };
          setMessage(result.message ?? result.error ?? "Domain availability could not be checked.");
        });
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
          <Input
            className="h-12 pl-10"
            placeholder="Search yourdomain.com"
            aria-label="Domain name"
            value={domainName}
            onChange={(event) => setDomainName(event.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="cta" size="lg" disabled={isPending}>
          {isPending ? "Checking..." : "Search Domains"}
        </Button>
      </div>
      <p className="px-1 pt-3 text-xs text-muted">{message}</p>
    </form>
  );
}
