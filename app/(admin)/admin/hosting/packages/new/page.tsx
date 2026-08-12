import { HostingPackageForm } from "@/components/admin/hosting-package-form";

export const metadata = { title: "Admin · New hosting package" };

export default function AdminNewHostingPackagePage() {
  return (
    <>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Create hosting package</h1>
      <HostingPackageForm />
    </>
  );
}
