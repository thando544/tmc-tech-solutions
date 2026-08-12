import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatHostingPrice } from "@/lib/hosting/format";
import type { HostingPackage } from "@/lib/hosting/types";

export function HostingPackageCard({
  pkg,
  ctaHref,
  ctaLabel = "View plan"
}: {
  pkg: HostingPackage;
  ctaHref: string;
  ctaLabel?: string;
}) {
  const price = formatHostingPrice(pkg);

  return (
    <Card className={pkg.is_featured ? "flex flex-col border-cta shadow-lg shadow-orange-100/60" : "flex flex-col"}>
      <CardHeader className="border-b border-border">
        {pkg.is_featured ? (
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cta">Most popular</p>
        ) : (
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">{pkg.support_level} support</p>
        )}
        <CardTitle>{pkg.name}</CardTitle>
        <CardDescription>{pkg.description}</CardDescription>
        <div className="pt-3">
          <span className="font-heading text-3xl font-bold text-navy">{price.amount}</span>
          <span className="text-sm text-muted">{price.cycle}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 pt-5">
        <dl className="grid gap-2 text-sm">
          <Row label="Websites" value={String(pkg.websites_limit)} />
          <Row label="Storage" value={`${pkg.storage_gb} GB`} />
          <Row label="Bandwidth" value={`${pkg.bandwidth_gb} GB`} />
          <Row label="Email accounts" value={String(pkg.email_accounts_limit)} />
          <Row label="Databases" value={String(pkg.databases_limit)} />
        </dl>
        <ul className="space-y-2 text-sm text-muted">
          <Feature>SSL included</Feature>
          <Feature>Daily backups</Feature>
          <Feature>{pkg.support_level} support</Feature>
        </ul>
        <Button asChild variant={pkg.is_featured ? "cta" : "default"} className="mt-auto w-full">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <Check className="mt-0.5 h-4 w-4 flex-none text-cta" aria-hidden />
      {children}
    </li>
  );
}
