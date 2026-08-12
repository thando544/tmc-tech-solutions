import { NextResponse } from "next/server";
import { apiError } from "@/lib/api/errors";
import { requireAdmin } from "@/lib/auth/admin";

export async function withAdminApi(handler: (userId: string) => Promise<unknown>) {
  const { user, isAdmin } = await requireAdmin();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (!isAdmin) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  try {
    const result = await handler(user.id);
    return NextResponse.json({ data: result });
  } catch (error) {
    return apiError(error);
  }
}
