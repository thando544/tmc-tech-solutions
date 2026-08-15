import { createHash } from "crypto";
import { getSiteUrl } from "@/lib/agent/site";

export const CONTACT_SKILL_MD = `# Contact TMC Tech Solutions

Help an agent contact TMC Tech Solutions about AI, software, automation, or cloud work.

## When to use

Use this skill when a user wants to reach TMC Tech Solutions, request a consultation, or send a project brief.

## How to contact

1. Prefer the public contact form at https://tmctechsolutions.com/contact
2. Or POST JSON to https://tmctechsolutions.com/api/contact

\`\`\`json
{
  "name": "Full name",
  "email": "user@example.com",
  "message": "Project brief, at least 10 characters"
}
\`\`\`

3. Email info@tmctechsolutions.com for human follow-up.

## Notes

Do not invent phone numbers. Location is TMC Tech Solution, Zimbabwe.
`;

export const SERVICES_SKILL_MD = `# TMC Tech Solutions services

Describe TMC Tech Solutions services to a user.

## When to use

Use this skill when a user asks what TMC Tech Solutions builds or which engagement to choose.

## Services

- AI Solutions
- AI Automation
- Custom Software Development
- Mobile App Development
- Web Development
- Cloud Solutions
- Business Automation
- API Integrations
- IT Consulting
- Technical Support

Canonical page: https://tmctechsolutions.com/services

## How to retrieve live copy

GET https://tmctechsolutions.com/mcp and call the \`list_services\` tool, or request https://tmctechsolutions.com/services with \`Accept: text/markdown\`.
`;

function sha256(content: string) {
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}

export function agentSkillsIndex() {
  const site = getSiteUrl();
  const skills = [
    {
      name: "contact-tmc",
      type: "skill-md" as const,
      description: "How to contact TMC Tech Solutions and submit a project brief.",
      path: "/.well-known/agent-skills/contact/SKILL.md",
      content: CONTACT_SKILL_MD
    },
    {
      name: "tmc-services",
      type: "skill-md" as const,
      description: "Catalog of TMC Tech Solutions AI, software, and automation services.",
      path: "/.well-known/agent-skills/services/SKILL.md",
      content: SERVICES_SKILL_MD
    }
  ];

  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: skills.map((skill) => {
      const digest = sha256(skill.content);
      return {
        name: skill.name,
        type: skill.type,
        description: skill.description,
        url: `${site}${skill.path}`,
        digest,
        sha256: digest
      };
    })
  };
}
