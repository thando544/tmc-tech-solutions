import { bookingDeposits, company, setupPackages, tourismProducts, values, websitePackages, whyChooseUs } from "@/content/site";

export function markdownForPath(pathname: string): string | null {
  if (pathname === "/") {
    return `# ${company.name}

${company.tagline}

${company.mission}

## Website packages
${websitePackages.map((item) => `- **${item.name}** (${item.price}): ${item.summary}`).join("\n")}

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

## Websites
${websitePackages.map((item) => `### ${item.name} — ${item.price}\n\n${item.summary}\n`).join("\n")}

## Setup
${setupPackages.map((item) => `### ${item.name} — ${item.price}\n\n${item.detail}\n`).join("\n")}
`;
  }

  if (pathname === "/tourism") {
    return `# Tourism systems

${tourismProducts.map((item) => `### ${item.name} — ${item.price}\n\n${item.detail}\n`).join("\n")}
`;
  }

  if (pathname === "/contact") {
    return `# Contact ${company.name}

Email: ${company.email}
Location: ${company.location}
${company.responseTime}

Send a project brief via POST /api/contact with JSON: \`{ "name", "email", "message" }\`. Optional: company, interest, budget.

You do not need an account to enquire. Login is for the TMC team only.
`;
  }

  if (pathname === "/book") {
    return `# Book a start date

Pay a USD project deposit with ${company.name} via Paynow. EcoCash, OneMoney, or card. Card details are entered on Paynow, never on this website.

Deposits:
${bookingDeposits.map((item) => `- ${item.name}: $${(item.amountCents / 100).toLocaleString("en-US")}`).join("\n")}

Book: ${company.domain}/book
Quote first: ${company.domain}/contact
`;
  }

  if (pathname === "/privacy") {
    return `# Privacy policy

${company.name}, ${company.location}. Contact ${company.email}.

We collect enquiry details (name, email, business, brief) to quote and deliver work. We do not store card numbers. We do not sell lists. Full policy: ${company.domain}/privacy
`;
  }

  if (pathname === "/cookies") {
    return `# Cookie policy

Essential cookies run the site. tmc-cookie-consent stores your banner choice. We do not use advertising cookies. Full policy: ${company.domain}/cookies
`;
  }

  if (pathname === "/terms") {
    return `# Terms

Quotes on ${company.domain} are starting prices in USD. A written quote is the offer. Full terms: ${company.domain}/terms
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
