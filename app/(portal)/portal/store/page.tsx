import Link from "next/link";
import { Code2, Globe2, LockKeyhole, Mail, MonitorCog, Server, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeading } from "@/components/portal/page-heading";

const categories = [
  { href: "/portal/store/hosting", label: "Buy Hosting", description: "Safari shared hosting and WordPress-ready plans.", icon: Server },
  { href: "/portal/store/domains", label: "Buy Domain", description: "Register yearly domains with DNS and nameserver management.", icon: Globe2 },
  { href: "/portal/store/email", label: "Buy Email Hosting", description: "Business mailboxes, quotas, webmail, aliases, and forwarders.", icon: Mail },
  { href: "/portal/store/vps", label: "Buy VPS", description: "Hetzner-backed VPS plans with root access.", icon: MonitorCog },
  { href: "/portal/store/ssl", label: "Buy SSL", description: "Free, premium, and wildcard SSL products.", icon: LockKeyhole },
  { href: "/portal/store/website-services", label: "Website Services", description: "Website setup and care services for business sites.", icon: Code2 },
  { href: "/portal/store/mobile-app-development", label: "Mobile App Development", description: "Custom React Native / Expo app packages and quote requests.", icon: Code2 }
];

export const metadata = { title: "Store" };

export default function PortalStorePage() {
  return (
    <>
      <PageHeading title="Store" description="Buy new services while signed in. Cart, checkout, orders, and invoices stay connected to your account." />
      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild variant="cta">
          <Link href="/portal/cart">
            <ShoppingCart className="h-4 w-4" />
            View Cart
          </Link>
        </Button>
        <Button asChild variant="secondary"><Link href="/portal/checkout">Checkout</Link></Button>
        <Button asChild variant="secondary"><Link href="/portal/orders">Orders</Link></Button>
        <Button asChild variant="secondary"><Link href="/portal/invoices">Invoices</Link></Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.href} href={category.href}>
              <Card className="h-full transition hover:border-brand/70 hover:shadow-lg hover:shadow-slate-200/60">
                <CardContent className="p-6">
                  <Icon className="h-6 w-6 text-brand" aria-hidden />
                  <h2 className="mt-4 font-heading text-xl font-semibold">{category.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
