import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/agent/site";

export function GET() {
  const site = getSiteUrl();
  return NextResponse.json({
    name: "TMC Tech Solutions Public API",
    docs: `${site}/docs/api`,
    openapi: `${site}/openapi.json`,
    health: `${site}/api/health`,
    contact: `${site}/api/contact`,
    mcp: `${site}/mcp`
  });
}
