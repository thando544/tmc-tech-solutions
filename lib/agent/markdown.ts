import { company, services, values, whyChooseUs } from "@/content/site";

export function markdownForPath(pathname: string): string | null {
  if (pathname === "/") {
    return `# ${company.name}

${company.tagline}

${company.mission}

## Services
${services.map((service) => `- **${service.title}**: ${service.description}`).join("\n")}

## Why TMC
${whyChooseUs.map((item) => `- **${item.title}**: ${item.text}`).join("\n")}

## Contact
Email: ${company.email}
Location: ${company.location}
Website: ${company.domain}
`;
  }

  if (pathname === "/about") {
    return `# About ${company.name}

${company.mission}

## Vision
${company.vision}

## Values
${values.map((value) => `- **${value.title}**: ${value.text}`).join("\n")}
`;
  }

  if (pathname === "/services") {
    return `# Services

${services
  .map(
    (service) => `## ${service.title}

${service.description}

Benefits: ${service.benefits.join(", ")}
`
  )
  .join("\n")}
`;
  }

  if (pathname === "/contact") {
    return `# Contact ${company.name}

Email: ${company.email}
Location: ${company.location}

Send a project brief via POST /api/contact with JSON: \`{ "name", "email", "message" }\`.
`;
  }

  if (pathname === "/docs/api") {
    return `# API documentation

- OpenAPI: /openapi.json
- API catalog: /.well-known/api-catalog
- MCP: /mcp
- Health: /api/health
`;
  }

  return null;
}

export function estimateTokens(markdown: string) {
  return Math.max(1, Math.ceil(markdown.length / 4));
}
