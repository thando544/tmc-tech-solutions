import { addOns, domainPricing, emailPlans, formatCatalogPrice, sslProducts, vpsPlans } from "@/lib/catalog";

export function ProductStrip() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <ProductColumn title="Business Email" items={emailPlans.map((plan) => `${plan.name}: ${plan.storage} from ${formatCatalogPrice(plan)}`)} />
      <ProductColumn title="VPS Hosting" items={vpsPlans.map((plan) => `${plan.name}: ${plan.specs.CPU}, ${plan.specs.RAM}`)} />
      <ProductColumn title="Domains" items={domainPricing.map((domain) => `${domain.tld}: from $${(domain.registrationCents / 100).toFixed(2)}/year`)} />
      <ProductColumn title="SSL Products" items={sslProducts.map((product) => `${product.name}: ${product.specs.Coverage}`)} />
      <ProductColumn title="Add-ons" items={addOns.map((addon) => `${addon.name}: ${addon.cycle}`)} />
    </div>
  );
}

function ProductColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-lg border border-border bg-white p-6">
      <h3 className="font-heading text-xl font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-muted">
        {items.map((item) => (
          <li key={item} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
