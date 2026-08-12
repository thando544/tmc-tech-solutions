import { NextRequest, NextResponse } from "next/server";
import { apiOperationLog } from "@/lib/actions/audit";
import { apiError } from "@/lib/api/errors";
import { rateLimit } from "@/lib/api/rate-limit";
import { requireUser } from "@/lib/supabase/server";

export async function withAuthedApi(
  request: NextRequest,
  provider: string,
  operation: string,
  handler: (userId: string) => Promise<unknown>
) {
  const { user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const limited = rateLimit(`${provider}:${operation}:${user.id}`, 30);
  if (!limited.allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  try {
    await apiOperationLog({ userId: user.id, provider, operation, status: "started" });
    const result = await handler(user.id);
    await apiOperationLog({ userId: user.id, provider, operation, status: "succeeded" });
    return NextResponse.json({ data: result });
  } catch (error) {
    const setupRequired = error instanceof Error && error.name === "SetupRequiredError";
    await apiOperationLog({
      userId: user.id,
      provider,
      operation,
      status: setupRequired ? "setup_required" : "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown error"
    }).catch(() => undefined);
    return apiError(error);
  }
}
