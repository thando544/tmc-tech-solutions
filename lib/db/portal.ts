import "server-only";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/server";

export async function getPortalContext() {
  const { supabase, user } = await requireUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}

export async function getPortalDashboard() {
  const { supabase, user } = await getPortalContext();

  const [hosting, websites, domains, invoices, tickets] = await Promise.all([
    supabase.from("hosting_services").select("*, hosting_plans(name)").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("websites").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("domains").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("invoices").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("support_tickets").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
  ]);

  return {
    user,
    hosting: hosting.data ?? [],
    websites: websites.data ?? [],
    domains: domains.data ?? [],
    invoices: invoices.data ?? [],
    tickets: tickets.data ?? [],
    errors: [hosting.error, websites.error, domains.error, invoices.error, tickets.error].filter(Boolean)
  };
}
