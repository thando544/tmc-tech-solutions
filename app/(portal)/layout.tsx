import { PortalMobileNav, PortalSidebar, PortalTopbar } from "@/components/portal/portal-nav";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary-background lg:grid lg:grid-cols-[270px_1fr]">
      <PortalSidebar />
      <div className="min-w-0 pb-20 lg:pb-0">
        <PortalTopbar />
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
      <PortalMobileNav />
    </div>
  );
}
