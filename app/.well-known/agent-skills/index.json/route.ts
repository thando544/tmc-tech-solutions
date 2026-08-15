import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { join } from "path";
import { getSiteUrl } from "@/lib/agent/site";

const skills = [
  {
    name: "contact-tmc",
    type: "skill-md" as const,
    description: "How to contact TMC Tech Solutions and submit a project brief.",
    file: "public/.well-known/agent-skills/contact/SKILL.md",
    path: "/.well-known/agent-skills/contact/SKILL.md"
  },
  {
    name: "tmc-services",
    type: "skill-md" as const,
    description: "Catalog of TMC Tech Solutions AI, software, and automation services.",
    file: "public/.well-known/agent-skills/services/SKILL.md",
    path: "/.well-known/agent-skills/services/SKILL.md"
  }
];

export async function GET() {
  const site = getSiteUrl();
  const entries = await Promise.all(
    skills.map(async (skill) => {
      const bytes = await readFile(join(process.cwd(), skill.file));
      return {
        name: skill.name,
        type: skill.type,
        description: skill.description,
        url: `${site}${skill.path}`,
        digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`
      };
    })
  );

  return Response.json(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: entries
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}
