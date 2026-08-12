import Link from "next/link";
import { ArchiveRestore, ClipboardList, Code2, CreditCard, Database, Globe2, Headphones, Home, LockKeyhole, Mail, Server, ShoppingBag, ShoppingCart, Smartphone, UserCircle } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { AccountMenu } from "@/components/portal/account-menu";
import { PortalCartLink } from "@/components/portal/portal-cart-link";

const items = [
  { href: "/portal/dashboard", label: "Dashboard", icon: Home },
  { href: "/portal/store", label: "Store", icon: ShoppingBag },
  { href: "/portal/cart", label: "Cart", icon: ShoppingCart },
  { href: "/portal/orders", label: "Orders", icon: ClipboardList },
  { href: "/portal/services", label: "Services", icon: Server },
  { href: "/portal/hosting", label: "Hosting", icon: Server },
  { href: "/portal/websites", label: "Websites", icon: Globe2 },
  { href: "/portal/email", label: "Email", icon: Mail },
  { href: "/portal/databases", label: "Databases", icon: Database },
  { href: "/portal/ssl", label: "SSL", icon: LockKeyhole },
  { href: "/portal/backups", label: "Backups", icon: ArchiveRestore },
  { href: "/portal/domains", label: "Domains", icon: Globe2 },
  { href: "/portal/invoices", label: "Invoices", icon: CreditCard },
  { href: "/portal/support", label: "Support", icon: Headphones },
  { href: "/portal/profile", label: "Profile", icon: UserCircle }
];

const commerceItems = [
  { href: "/portal/store/hosting", label: "Buy Hosting", icon: Server },
  { href: "/portal/store/domains", label: "Buy Domain", icon: Globe2 },
  { href: "/portal/store/email", label: "Buy Email Hosting", icon: Mail },
  { href: "/portal/store/vps", label: "Buy VPS", icon: Database },
  { href: "/portal/store/ssl", label: "Buy SSL", icon: LockKeyhole },
  { href: "/portal/store/website-services", label: "Website Services", icon: Code2 },
  { href: "/portal/store/mobile-app-development", label: "Mobile App Development", icon: Smartphone }
];

export function PortalSidebar() {
  return (
    <aside className="hidden border-r border-border bg-white lg:block">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo />
      </div>
      <nav className="space-y-1 p-3">
        <p className="px-3 pb-1 text-xs font-semibold uppercase text-muted">Account</p>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-secondary-background hover:text-foreground"
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
        <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase text-muted">Buy Services</p>
        {commerceItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-secondary-background hover:text-foreground"
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-3">
        <Link
          href="/portal/profile"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-secondary-background hover:text-foreground"
        >
          <UserCircle className="h-4 w-4" aria-hidden />
          Account settings
        </Link>
      </div>
    </aside>
  );
}

export function PortalTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-white px-4 sm:px-6 lg:px-8">
      <div className="lg:hidden">
        <Logo />
      </div>
      <div className="hidden lg:block">
        <p className="text-sm font-semibold">Customer Portal</p>
        <p className="text-xs text-muted">Hosting, domains, invoices, DNS, SSL, email, backups, and support</p>
      </div>
      <div className="flex items-center gap-2">
        <PortalCartLink />
        <AccountMenu />
      </div>
    </header>
  );
}

export function PortalMobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-white px-2 py-2 shadow-lg lg:hidden">
      {[items[0], items[1], items[2], items[4]].map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 rounded-md px-2 py-1 text-[11px] text-muted">
            <Icon className="h-4 w-4" aria-hidden />
            {item.label}
          </Link>
        );
      })}
      <AccountMenu mobile />
    </nav>
  );
}
