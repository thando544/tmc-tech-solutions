import { CONTACT_SKILL_MD } from "@/lib/agent/skills";

export function GET() {
  return new Response(CONTACT_SKILL_MD, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
