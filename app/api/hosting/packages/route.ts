import { NextResponse } from "next/server";
import { apiError } from "@/lib/api/errors";
import { listActiveHostingPackages } from "@/lib/hosting/service";

export async function GET() {
  try {
    const packages = await listActiveHostingPackages();
    return NextResponse.json({ data: packages });
  } catch (error) {
    return apiError(error);
  }
}
