"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { HostingPackage } from "@/lib/hosting/types";

type PackageInput = Omit<HostingPackage, "id" | "created_at" | "updated_at"> & {
  cyberpanel_package_name: string;
};

const defaults: PackageInput = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  currency: "USD",
  billing_cycle: "monthly",
  storage_gb: 10,
  bandwidth_gb: 100,
  websites_limit: 1,
  email_accounts_limit: 5,
  databases_limit: 2,
  support_level: "standard",
  is_featured: false,
  is_active: true,
  sort_order: 0,
  cyberpanel_package_name: "Default"
};

type AdminPackage = HostingPackage & { cyberpanel_package_name: string };

export function HostingPackageForm({ initial }: { initial?: AdminPackage }) {
  const router = useRouter();
  const [form, setForm] = useState<PackageInput>(
    initial
      ? {
          name: initial.name,
          slug: initial.slug,
          description: initial.description,
          price: Number(initial.price),
          currency: initial.currency,
          billing_cycle: initial.billing_cycle,
          storage_gb: initial.storage_gb,
          bandwidth_gb: initial.bandwidth_gb,
          websites_limit: initial.websites_limit,
          email_accounts_limit: initial.email_accounts_limit,
          databases_limit: initial.databases_limit,
          support_level: initial.support_level,
          is_featured: initial.is_featured,
          is_active: initial.is_active,
          sort_order: initial.sort_order,
          cyberpanel_package_name: initial.cyberpanel_package_name
        }
      : defaults
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof PackageInput>(key: K, value: PackageInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const url = initial ? `/api/admin/hosting/packages/${initial.id}` : "/api/admin/hosting/packages";
    const method = initial ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const json = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(json.error ?? "Could not save package.");
      }
      router.push("/admin/hosting/packages");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not save package.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-border bg-white p-6 md:grid-cols-2">
      <Field label="Name">
        <Input value={form.name} onChange={(e) => update("name", e.target.value)} required />
      </Field>
      <Field label="Slug">
        <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} required disabled={Boolean(initial)} />
      </Field>
      <div className="md:col-span-2">
        <Field label="Description">
          <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} />
        </Field>
      </div>
      <Field label="Price">
        <Input type="number" min={0} step="0.01" value={form.price} onChange={(e) => update("price", Number(e.target.value))} />
      </Field>
      <Field label="Currency">
        <Input value={form.currency} onChange={(e) => update("currency", e.target.value.toUpperCase())} maxLength={3} />
      </Field>
      <Field label="Billing cycle">
        <select
          className="h-10 w-full rounded-md border border-border px-3"
          value={form.billing_cycle}
          onChange={(e) => update("billing_cycle", e.target.value as PackageInput["billing_cycle"])}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="one_time">One-time</option>
        </select>
      </Field>
      <Field label="Support level">
        <Input value={form.support_level} onChange={(e) => update("support_level", e.target.value)} />
      </Field>
      <Field label="Storage (GB)">
        <Input type="number" value={form.storage_gb} onChange={(e) => update("storage_gb", Number(e.target.value))} />
      </Field>
      <Field label="Bandwidth (GB)">
        <Input type="number" value={form.bandwidth_gb} onChange={(e) => update("bandwidth_gb", Number(e.target.value))} />
      </Field>
      <Field label="Websites limit">
        <Input type="number" value={form.websites_limit} onChange={(e) => update("websites_limit", Number(e.target.value))} />
      </Field>
      <Field label="Email accounts">
        <Input type="number" value={form.email_accounts_limit} onChange={(e) => update("email_accounts_limit", Number(e.target.value))} />
      </Field>
      <Field label="Databases">
        <Input type="number" value={form.databases_limit} onChange={(e) => update("databases_limit", Number(e.target.value))} />
      </Field>
      <Field label="Sort order">
        <Input type="number" value={form.sort_order} onChange={(e) => update("sort_order", Number(e.target.value))} />
      </Field>
      <Field label="CyberPanel package (internal)">
        <Input
          value={form.cyberpanel_package_name}
          onChange={(e) => update("cyberpanel_package_name", e.target.value)}
          required
        />
        <p className="mt-1 text-xs text-muted">Infrastructure mapping only — never shown on public pages.</p>
      </Field>
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => update("is_featured", e.target.checked)} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={(e) => update("is_active", e.target.checked)} />
          Active
        </label>
      </div>
      {error ? <p className="text-sm text-error md:col-span-2">{error}</p> : null}
      <div className="md:col-span-2">
        <Button type="submit" variant="cta" disabled={loading}>
          {loading ? "Saving…" : initial ? "Update package" : "Create package"}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
