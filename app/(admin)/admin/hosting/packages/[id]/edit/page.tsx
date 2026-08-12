import { notFound } from "next/navigation";
import { HostingPackageForm } from "@/components/admin/hosting-package-form";
import { createAdminClient } from "@/lib/supabase/admin";
import type { HostingPackage } from "@/lib/hosting/types";

export const metadata = { title: "Admin · Edit hosting package" };

export default async function AdminEditHostingPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = createAdminClient();
  const { data } = await admin.from("hosting_packages").select("*").eq("id", id).maybeSingle();

  if (!data) {
    notFound();
  }

  const initial = data as HostingPackage & { cyberpanel_package_name: string };

  return (
    <>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Edit {initial.name}</h1>
      <HostingPackageForm initial={initial} />
    </>
  );
}
