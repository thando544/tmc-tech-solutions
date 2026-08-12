import "server-only";
import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/auth/admin";
import { requireUser } from "@/lib/supabase/server";

export async function getAdminContext() {
  const { supabase, user } = await requireUser();

  if (!user) {
    redirect("/login?next=/admin/hosting/orders");
  }

  const allowed = await isAdminUser(user.id, user.email);
  if (!allowed) {
    redirect("/portal/dashboard");
  }

  return { supabase, user };
}
