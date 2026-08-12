import {
  type BillingCycle,
  domainProducts,
  emailPlans,
  mobileAppPlans,
  sharedHostingPlans,
  sslProducts,
  vpsPlans,
  websiteServicePlans,
  wordpressPlans
} from "@/lib/catalog";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  type: "hosting" | "wordpress" | "email" | "vps" | "ssl" | "domain" | "website_service" | "mobile_app";
  priceCents: number;
  currency: "USD";
  billingCycle: BillingCycle;
  quantity: 1;
  domainMode?: "register" | "existing";
  domainName?: string;
  addons?: string[];
};

export const cartStorageKey = "tmc_cart";

export function getCatalogItem(type: CartItem["type"], slug: string): CartItem | null {
  if (type === "hosting") {
    const plan = sharedHostingPlans.find((item) => item.slug === slug);
    return plan
      ? {
          id: `${type}:${slug}`,
          slug,
          name: plan.name,
          type,
          priceCents: plan.priceCents,
          currency: "USD",
          billingCycle: plan.cycle,
          quantity: 1
        }
      : null;
  }

  if (type === "wordpress") {
    const plan = wordpressPlans.find((item) => item.slug === slug);
    return plan
      ? {
          id: `${type}:${slug}`,
          slug,
          name: plan.name,
          type,
          priceCents: plan.priceCents,
          currency: "USD",
          billingCycle: plan.cycle,
          quantity: 1
        }
      : null;
  }

  if (type === "email") {
    const plan = emailPlans.find((item) => item.slug === slug);
    return plan
      ? {
          id: `${type}:${slug}`,
          slug,
          name: plan.name,
          type,
          priceCents: plan.priceCents,
          currency: "USD",
          billingCycle: plan.cycle,
          quantity: 1
        }
      : null;
  }

  if (type === "vps") {
    const plan = vpsPlans.find((item) => item.slug === slug);
    return plan
      ? {
          id: `${type}:${slug}`,
          slug,
          name: plan.name,
          type,
          priceCents: plan.priceCents,
          currency: "USD",
          billingCycle: plan.cycle,
          quantity: 1
        }
      : null;
  }

  if (type === "domain") {
    const plan = domainProducts.find((item) => item.slug === slug);
    return plan
      ? {
          id: `${type}:${slug}`,
          slug,
          name: plan.name,
          type,
          priceCents: plan.priceCents,
          currency: "USD",
          billingCycle: plan.cycle,
          quantity: 1,
          domainMode: "register"
        }
      : null;
  }

  if (type === "website_service") {
    const plan = websiteServicePlans.find((item) => item.slug === slug);
    return plan
      ? {
          id: `${type}:${slug}`,
          slug,
          name: plan.name,
          type,
          priceCents: plan.priceCents,
          currency: "USD",
          billingCycle: plan.cycle,
          quantity: 1
        }
      : null;
  }

  if (type === "mobile_app") {
    const plan = mobileAppPlans.find((item) => item.slug === slug);
    return plan
      ? {
          id: `${type}:${slug}`,
          slug,
          name: plan.name,
          type,
          priceCents: plan.priceCents,
          currency: "USD",
          billingCycle: plan.cycle,
          quantity: 1
        }
      : null;
  }

  const product = sslProducts.find((item) => item.slug === slug);
  return product
    ? {
        id: `${type}:${slug}`,
        slug,
        name: product.name,
        type,
        priceCents: product.priceCents,
        currency: "USD",
        billingCycle: product.cycle,
        quantity: 1
      }
    : null;
}
