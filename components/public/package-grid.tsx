import { Check } from "lucide-react";
import { hostingPackages, type CatalogPlan, type HostingPlan } from "@/lib/catalog";
import { PurchaseButton } from "@/components/cart/purchase-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PackageGrid({ compact = false, plans = hostingPackages, purchaseRedirectTo }: { compact?: boolean; plans?: CatalogPlan[]; purchaseRedirectTo?: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan) => (
        <Card key={plan.name} className={plan.featured ? "flex flex-col border-brand shadow-lg shadow-green-100/70" : "flex flex-col"}>
          <CardHeader className="border-b border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">{plan.category}</p>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.audience}</CardDescription>
            <div className="pt-3">
              <span className="font-heading text-3xl font-bold">
                {plan.cycle === "quote" ? "Request quote" : `$${(plan.priceCents / 100).toFixed(2)}`}
              </span>
              {plan.cycle !== "quote" ? <span className="text-sm text-muted">{plan.cycle === "monthly" ? " / month" : plan.cycle === "yearly" ? " / year" : " one-time"}</span> : null}
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-5 pt-5">
            <dl className="grid gap-2 text-sm">
              {"websites" in plan ? <PlanLimit label="Websites" value={(plan as HostingPlan).websites} /> : null}
              {"mailboxes" in plan && typeof plan.mailboxes === "string" ? <PlanLimit label="Mailboxes" value={plan.mailboxes} /> : null}
              {"storage" in plan && typeof plan.storage === "string" ? <PlanLimit label="Storage" value={plan.storage} /> : null}
              {Object.entries(plan.specs).slice(0, "storage" in plan ? 2 : 5).map(([label, value]) => (
                <PlanLimit key={label} label={label} value={value} />
              ))}
            </dl>
            {!compact ? (
              <ul className="space-y-3 text-sm text-muted">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            ) : null}
            <PurchaseButton type={plan.type} slug={plan.slug} redirectTo={purchaseRedirectTo}>
              {plan.type === "email" ? "Choose Email" : plan.type === "vps" ? "Choose VPS" : plan.type === "mobile_app" ? "Add Service" : plan.type === "domain" ? "Add Domain" : "Buy Hosting"}
            </PurchaseButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PlanLimit({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
