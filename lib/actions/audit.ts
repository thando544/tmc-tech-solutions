import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/types";

export async function auditLog(input: {
  userId?: string | null;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  metadata?: Json;
}) {
  const supabase = createAdminClient();
  await supabase.from("audit_logs").insert({
    user_id: input.userId ?? null,
    action: input.action,
    resource_type: input.resourceType,
    resource_id: input.resourceId ?? null,
    metadata: input.metadata ?? {}
  });
}

export async function apiOperationLog(input: {
  userId?: string | null;
  provider: string;
  operation: string;
  status: "started" | "succeeded" | "failed" | "setup_required";
  errorMessage?: string | null;
}) {
  const supabase = createAdminClient();
  await supabase.from("provider_sync_logs").insert({
    user_id: input.userId ?? null,
    provider: input.provider,
    operation: input.operation,
    status: input.status,
    error_message: input.errorMessage ?? null
  });
}
