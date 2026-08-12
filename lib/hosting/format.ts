import type { HostingPackage } from "@/lib/hosting/types";

export function formatHostingPrice(pkg: Pick<HostingPackage, "price" | "currency" | "billing_cycle">) {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: pkg.currency || "USD"
  }).format(Number(pkg.price));

  const cycle =
    pkg.billing_cycle === "monthly" ? "/ month" : pkg.billing_cycle === "yearly" ? "/ year" : " one-time";

  return { amount, cycle, label: `${amount}${cycle}` };
}

export function billingCycleLabel(cycle: HostingPackage["billing_cycle"]) {
  if (cycle === "monthly") return "Monthly";
  if (cycle === "yearly") return "Yearly";
  return "One-time";
}
