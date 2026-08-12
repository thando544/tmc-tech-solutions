import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/server";

function envAdminIds(): Set<string> {
  const raw = process.env.ADMIN_USER_IDS ?? "";
  return new Set(raw.split(",").map((id) => id.trim()).filter(Boolean));
}

function envAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return new Set(raw.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean));
}

export async function isAdminUser(userId: string, email?: string | null): Promise<boolean> {
  if (envAdminIds().has(userId)) {
    return true;
  }

  if (email && envAdminEmails().has(email.toLowerCase())) {
    return true;
  }

  const admin = createAdminClient();
  const { data } = await admin.from("profiles").select("is_admin").eq("id", userId).maybeSingle();
  return Boolean(data?.is_admin);
}

export async function requireAdmin() {
  const { supabase, user } = await requireUser();
  if (!user) {
    return { supabase, user: null, isAdmin: false as const };
  }

  const allowed = await isAdminUser(user.id, user.email);
  if (!allowed) {
    return { supabase, user, isAdmin: false as const };
  }

  return { supabase, user, isAdmin: true as const };
}
