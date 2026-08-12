import Link from "next/link";
import { Globe2, LockKeyhole, Mail, Server, ShoppingCart, Smartphone } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/portal/page-heading";
import { StatCard } from "@/components/portal/stat-card";
import { getPortalDashboard } from "@/lib/db/portal";

export const metadata = { title: "Portal Dashboard" };

export default async function DashboardPage() {
  const data = await getPortalDashboard();
  const commerceLinks = [
    { href: "/portal/store/hosting", label: "Buy Hosting", icon: Server },
    { href: "/portal/store/domains", label: "Buy Domain", icon: Globe2 },
    { href: "/portal/store/email", label: "Buy Email Hosting", icon: Mail },
    { href: "/portal/store/vps", label: "Buy VPS", icon: Server },
    { href: "/portal/store/ssl", label: "Buy SSL", icon: LockKeyhole },
    { href: "/portal/store/website-services", label: "Website Services", icon: Globe2 },
    { href: "/portal/store/mobile-app-development", label: "Mobile App Development", icon: Smartphone },
    { href: "/portal/cart", label: "View Cart", icon: ShoppingCart },
    { href: "/portal/checkout", label: "Checkout", icon: ShoppingCart },
    { href: "/portal/orders", label: "Orders", icon: ShoppingCart },
    { href: "/portal/invoices", label: "Invoices", icon: ShoppingCart }
  ];

  return (
    <>
      <PageHeading title="Dashboard" description="Your secure hosting operations summary." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Hosting services" value={data.hosting.length} />
        <StatCard label="Websites" value={data.websites.length} />
        <StatCard label="Domains" value={data.domains.length} />
        <StatCard label="Invoices" value={data.invoices.length} />
      </div>
      <section className="mt-8">
        <h2 className="font-heading text-2xl font-bold">Buy and manage services</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {commerceLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 text-sm font-semibold text-foreground transition hover:border-brand/70 hover:bg-secondary-background">
                <Icon className="h-5 w-5 text-brand" aria-hidden />
                {link.label}
              </Link>
            );
          })}
        </div>
      </section>
      <div className="mt-6">
        {data.hosting.length === 0 ? (
          <EmptyState title="No hosting services yet" description="Real hosting services will appear here after an order, WHMCS sync, or authorized provisioning job." />
        ) : null}
      </div>
    </>
  );
}
