import Link from "next/link";
import { ClipboardList, Package, Server } from "lucide-react";
import { Logo } from "@/components/layout/logo";

const items = [
  { href: "/admin/hosting/packages", label: "Packages", icon: Package },
  { href: "/admin/hosting/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/hosting/accounts", label: "Accounts", icon: Server }
];

export function AdminSidebar() {
  return (
    <aside className="hidden border-r border-slate-800 bg-navy text-white lg:block">
      <div className="flex h-16 items-center border-b border-slate-800 px-5">
        <Logo onDark />
      </div>
      <p className="px-5 pt-4 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Admin</p>
      <nav className="space-y-1 p-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-800 p-3">
        <Link href="/portal/dashboard" className="text-sm text-slate-400 hover:text-white">
          ← Customer portal
        </Link>
      </div>
    </aside>
  );
}

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b border-border bg-white px-6">
      <div>
        <p className="text-sm font-semibold text-navy">Hosting administration</p>
        <p className="text-xs text-muted">Manage business packages, orders, and accounts</p>
      </div>
    </header>
  );
}
