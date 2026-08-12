import { AdminSidebar, AdminTopbar } from "@/components/admin/admin-nav";
import { getAdminContext } from "@/lib/db/admin";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await getAdminContext();

  return (
    <div className="min-h-screen bg-secondary-background lg:grid lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div className="min-w-0">
        <AdminTopbar />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
