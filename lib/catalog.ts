import {
  ArchiveRestore,
  Clock3,
  Database,
  Globe2,
  HardDrive,
  Headphones,
  LockKeyhole,
  RefreshCcw,
  Server,
  ShieldCheck,
  Workflow
} from "lucide-react";

export type BillingCycle = "monthly" | "yearly" | "one-time" | "quote";
export type ProductType = "hosting" | "wordpress" | "email" | "vps" | "ssl" | "domain" | "website_service" | "mobile_app";

export type CatalogPlan = {
  slug: string;
  type: ProductType;
  category:
    | "Shared Hosting"
    | "WordPress Hosting"
    | "Email Hosting"
    | "VPS Hosting"
    | "SSL Certificates"
    | "Domains"
    | "Website Services"
    | "Mobile App Development";
  name: string;
  description: string;
  audience: string;
  priceCents: number;
  currency: "USD";
  cycle: BillingCycle;
  featured?: boolean;
  quoteBased?: boolean;
  serviceRequestOnly?: boolean;
  specs: Record<string, string>;
  features: string[];
};

export type HostingPlan = CatalogPlan & {
  type: "hosting" | "wordpress" | "vps";
  websites: string;
  storage: string;
  bandwidth: string;
  email: string;
  databases: string;
  backups: string;
  ssl: string;
  performance: string;
  support: string;
};

export type EmailPlan = CatalogPlan & {
  type: "email";
  mailboxes: string;
  storage: string;
};

export type DomainPrice = {
  tld: string;
  registrationCents: number;
  renewalCents: number;
  transferCents: number;
  currency: "USD";
  cycle: "yearly";
};

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export const sharedHostingPlans: HostingPlan[] = [
  {
    slug: "safari-starter",
    type: "hosting",
    category: "Shared Hosting",
    name: "Safari Starter",
    description: "Entry shared hosting for portfolios, landing pages, and personal websites.",
    audience: "For portfolios, landing pages, personal websites.",
    priceCents: 399,
    currency: "USD",
    cycle: "monthly",
    websites: "1 website",
    storage: "10GB NVMe SSD",
    bandwidth: "50GB",
    email: "5 email accounts, 1GB each",
    databases: "5 MySQL databases",
    backups: "Weekly backups",
    ssl: "Free SSL certificate",
    performance: "LiteSpeed cache",
    support: "Standard support",
    specs: {
      Websites: "1",
      Storage: "10GB NVMe SSD",
      Bandwidth: "50GB",
      Email: "5 accounts",
      Databases: "5 MySQL"
    },
    features: ["DNS management", "Webmail access", "One-click WordPress install", "LiteSpeed cache", "Standard support"]
  },
  {
    slug: "safari-business",
    type: "hosting",
    category: "Shared Hosting",
    name: "Safari Business",
    description: "Business shared hosting with more websites, daily backups, and priority support.",
    audience: "For small businesses and company websites.",
    priceCents: 799,
    currency: "USD",
    cycle: "monthly",
    featured: true,
    websites: "5 websites",
    storage: "25GB NVMe SSD",
    bandwidth: "150GB",
    email: "25 email accounts, 2GB each",
    databases: "20 MySQL databases",
    backups: "Daily backups",
    ssl: "Free SSL certificate",
    performance: "Staging-ready, LiteSpeed cache",
    support: "Priority support",
    specs: {
      Websites: "5",
      Storage: "25GB NVMe SSD",
      Bandwidth: "150GB",
      Email: "25 accounts",
      Databases: "20 MySQL"
    },
    features: ["DNS management", "WordPress installer", "Malware scan-ready structure", "Staging-ready structure", "Priority support"]
  },
  {
    slug: "safari-pro",
    type: "hosting",
    category: "Shared Hosting",
    name: "Safari Pro",
    description: "Higher allocation shared hosting for ecommerce and growing businesses.",
    audience: "For ecommerce and growing businesses.",
    priceCents: 1499,
    currency: "USD",
    cycle: "monthly",
    websites: "20 websites",
    storage: "60GB NVMe SSD",
    bandwidth: "500GB",
    email: "75 email accounts, 5GB each",
    databases: "50 MySQL databases",
    backups: "Daily backups",
    ssl: "Free SSL certificate",
    performance: "Enhanced performance allocation",
    support: "Priority support, migration assistance",
    specs: {
      Websites: "20",
      Storage: "60GB NVMe SSD",
      Bandwidth: "500GB",
      Email: "75 accounts",
      Databases: "50 MySQL"
    },
    features: ["Advanced DNS management", "LiteSpeed optimization", "Enhanced performance allocation", "Migration assistance", "Priority support"]
  },
  {
    slug: "safari-agency",
    type: "hosting",
    category: "Shared Hosting",
    name: "Safari Agency",
    description: "Multi-site hosting for agencies and teams managing client websites.",
    audience: "For agencies and multiple client websites.",
    priceCents: 2999,
    currency: "USD",
    cycle: "monthly",
    websites: "50 websites",
    storage: "120GB NVMe SSD",
    bandwidth: "Unmetered",
    email: "150 email accounts, 5GB each",
    databases: "100 MySQL databases",
    backups: "Daily backups",
    ssl: "Free SSL certificate",
    performance: "Advanced performance resources",
    support: "Priority support, migration support",
    specs: {
      Websites: "50",
      Storage: "120GB NVMe SSD",
      Bandwidth: "Unmetered",
      Email: "150 accounts",
      Databases: "100 MySQL"
    },
    features: ["White-label-ready DNS structure", "Reseller-ready architecture", "Advanced performance resources", "Migration support", "Priority support"]
  }
];

export const wordpressPlans: HostingPlan[] = [
  {
    slug: "wordpress-starter",
    type: "wordpress",
    category: "WordPress Hosting",
    name: "WordPress Starter",
    description: "Managed WordPress for one production site.",
    audience: "For a single managed WordPress website.",
    priceCents: 599,
    currency: "USD",
    cycle: "monthly",
    websites: "1 website",
    storage: "15GB NVMe SSD",
    bandwidth: "100GB",
    email: "Email-ready structure",
    databases: "5 MySQL databases",
    backups: "Automatic backups",
    ssl: "Free SSL",
    performance: "WordPress optimization, LiteSpeed cache",
    support: "Standard support",
    specs: { Websites: "1", Storage: "15GB NVMe SSD", Backups: "Automatic", Cache: "LiteSpeed" },
    features: ["Managed WordPress", "Free SSL", "WordPress optimization", "LiteSpeed cache", "Malware scan-ready structure"]
  },
  {
    slug: "wordpress-business",
    type: "wordpress",
    category: "WordPress Hosting",
    name: "WordPress Business",
    description: "Managed WordPress for small business websites and staging workflows.",
    audience: "For business WordPress sites that need daily backups and staging.",
    priceCents: 1199,
    currency: "USD",
    cycle: "monthly",
    featured: true,
    websites: "5 websites",
    storage: "40GB NVMe SSD",
    bandwidth: "250GB",
    email: "Email-ready structure",
    databases: "20 MySQL databases",
    backups: "Daily backups",
    ssl: "Free SSL",
    performance: "Enhanced caching",
    support: "Priority support",
    specs: { Websites: "5", Storage: "40GB NVMe SSD", Backups: "Daily", Cache: "Enhanced" },
    features: ["Managed WordPress", "Staging-ready structure", "Security hardening-ready structure", "Enhanced caching", "Priority support"]
  },
  {
    slug: "wordpress-pro",
    type: "wordpress",
    category: "WordPress Hosting",
    name: "WordPress Pro",
    description: "Managed WordPress for high-traffic sites and migration projects.",
    audience: "For growing WordPress businesses and ecommerce teams.",
    priceCents: 1999,
    currency: "USD",
    cycle: "monthly",
    websites: "15 websites",
    storage: "80GB NVMe SSD",
    bandwidth: "500GB",
    email: "Email-ready structure",
    databases: "50 MySQL databases",
    backups: "Daily backups",
    ssl: "Free SSL",
    performance: "Advanced caching and performance optimization",
    support: "Priority support, migration support",
    specs: { Websites: "15", Storage: "80GB NVMe SSD", Backups: "Daily", Staging: "Included" },
    features: ["Managed WordPress", "Advanced caching", "Performance optimization", "Staging", "Migration support"]
  }
];

export const emailPlans: EmailPlan[] = [
  {
    slug: "mail-starter",
    type: "email",
    category: "Email Hosting",
    name: "Mail Starter",
    description: "Mailbox hosting for small teams.",
    audience: "For basic business email.",
    priceCents: 299,
    currency: "USD",
    cycle: "monthly",
    mailboxes: "5 business mailboxes",
    storage: "2GB per mailbox",
    specs: { Mailboxes: "5", Quota: "2GB each", Protocols: "IMAP/SMTP" },
    features: ["IMAP/SMTP", "Webmail", "Spam filtering", "Mobile sync"]
  },
  {
    slug: "mail-business",
    type: "email",
    category: "Email Hosting",
    name: "Mail Business",
    description: "Team mailbox hosting with aliases and forwarders.",
    audience: "For growing teams using domain email.",
    priceCents: 599,
    currency: "USD",
    cycle: "monthly",
    featured: true,
    mailboxes: "25 mailboxes",
    storage: "5GB per mailbox",
    specs: { Mailboxes: "25", Quota: "5GB each", Protocols: "IMAP/SMTP" },
    features: ["IMAP/SMTP", "Webmail", "Spam filtering", "Aliases and forwarders"]
  },
  {
    slug: "mail-pro",
    type: "email",
    category: "Email Hosting",
    name: "Mail Pro",
    description: "Large mailbox plan with advanced email-ready structure.",
    audience: "For larger teams with heavier mailbox usage.",
    priceCents: 1199,
    currency: "USD",
    cycle: "monthly",
    mailboxes: "100 mailboxes",
    storage: "10GB per mailbox",
    specs: { Mailboxes: "100", Quota: "10GB each", Protocols: "IMAP/SMTP" },
    features: ["Advanced email-ready structure", "Spam filtering", "Webmail", "Aliases", "Forwarders", "Catch-all-ready structure"]
  }
];

export const vpsPlans: HostingPlan[] = [
  {
    slug: "vps-launch",
    type: "vps",
    category: "VPS Hosting",
    name: "VPS Launch",
    description: "Entry VPS with root access for production workloads.",
    audience: "For small isolated workloads and control-panel hosting.",
    priceCents: 1299,
    currency: "USD",
    cycle: "monthly",
    websites: "Self-managed",
    storage: "80GB NVMe SSD",
    bandwidth: "Provider fair-use transfer",
    email: "Optional CyberPanel email",
    databases: "Self-managed",
    backups: "Backup-ready structure",
    ssl: "Manual or CyberPanel SSL",
    performance: "2 vCPU, 4GB RAM",
    support: "Standard support",
    specs: { CPU: "2 vCPU", RAM: "4GB", Storage: "80GB NVMe SSD", IPv4: "1" },
    features: ["Ubuntu/Debian", "Root access", "1 IPv4", "Hetzner VPS infrastructure"]
  },
  {
    slug: "vps-scale",
    type: "vps",
    category: "VPS Hosting",
    name: "VPS Scale",
    description: "Balanced VPS for applications and heavier hosting workloads.",
    audience: "For growing applications and multi-site deployments.",
    priceCents: 2499,
    currency: "USD",
    cycle: "monthly",
    featured: true,
    websites: "Self-managed",
    storage: "160GB NVMe SSD",
    bandwidth: "Provider fair-use transfer",
    email: "Optional CyberPanel email",
    databases: "Self-managed",
    backups: "Backup-ready structure",
    ssl: "Manual or CyberPanel SSL",
    performance: "4 vCPU, 8GB RAM",
    support: "Standard support",
    specs: { CPU: "4 vCPU", RAM: "8GB", Storage: "160GB NVMe SSD", IPv4: "1" },
    features: ["Ubuntu/Debian", "Root access", "1 IPv4", "Backup-ready structure"]
  },
  {
    slug: "vps-business",
    type: "vps",
    category: "VPS Hosting",
    name: "VPS Business",
    description: "Dedicated-resource VPS for business applications.",
    audience: "For business workloads that need stronger isolation.",
    priceCents: 4999,
    currency: "USD",
    cycle: "monthly",
    websites: "Self-managed",
    storage: "320GB NVMe SSD",
    bandwidth: "Provider fair-use transfer",
    email: "Optional CyberPanel email",
    databases: "Self-managed",
    backups: "Backup-ready structure",
    ssl: "Manual or CyberPanel SSL",
    performance: "8 vCPU, 16GB RAM",
    support: "Priority support",
    specs: { CPU: "8 vCPU", RAM: "16GB", Storage: "320GB NVMe SSD", Resources: "Dedicated" },
    features: ["Root access", "Dedicated resources", "Backup-ready structure", "Priority support"]
  },
  {
    slug: "vps-performance",
    type: "vps",
    category: "VPS Hosting",
    name: "VPS Performance",
    description: "High-performance VPS for demanding production workloads.",
    audience: "For resource-intensive applications and agency infrastructure.",
    priceCents: 8999,
    currency: "USD",
    cycle: "monthly",
    websites: "Self-managed",
    storage: "640GB NVMe SSD",
    bandwidth: "Provider fair-use transfer",
    email: "Optional CyberPanel email",
    databases: "Self-managed",
    backups: "Backup-ready structure",
    ssl: "Manual or CyberPanel SSL",
    performance: "16 vCPU, 32GB RAM",
    support: "Priority support",
    specs: { CPU: "16 vCPU", RAM: "32GB", Storage: "640GB NVMe SSD", Resources: "Dedicated" },
    features: ["High performance", "Dedicated resources", "Root access", "Priority support"]
  }
];

export const sslProducts: CatalogPlan[] = [
  {
    slug: "free-ssl",
    type: "ssl",
    category: "SSL Certificates",
    name: "Free SSL",
    description: "DV SSL for eligible hosted websites.",
    audience: "For hosted websites that need HTTPS.",
    priceCents: 0,
    currency: "USD",
    cycle: "yearly",
    specs: { Validation: "DV", Coverage: "Single domain", Renewal: "Auto renewal-ready" },
    features: ["Auto issue", "Auto renewal", "HTTPS ready"]
  },
  {
    slug: "premium-ssl",
    type: "ssl",
    category: "SSL Certificates",
    name: "Premium SSL",
    description: "Commercial SSL certificate for single-domain coverage.",
    audience: "For businesses needing paid certificate records.",
    priceCents: 1600,
    currency: "USD",
    cycle: "yearly",
    specs: { Validation: "DV/OV", Coverage: "Single domain", Issuance: "Provider-ready" },
    features: ["Issued in minutes when provider is configured", "Warranty eligible", "Browser trust"]
  },
  {
    slug: "wildcard-ssl",
    type: "ssl",
    category: "SSL Certificates",
    name: "Wildcard SSL",
    description: "Wildcard SSL for subdomain-heavy environments.",
    audience: "For apps using multiple subdomains.",
    priceCents: 7900,
    currency: "USD",
    cycle: "yearly",
    specs: { Validation: "DV", Coverage: "*.domain.com", Method: "DNS validation" },
    features: ["Subdomain coverage", "DNS validation", "Automation-ready"]
  }
];

export const domainPricing: DomainPrice[] = [
  { tld: ".com", registrationCents: 1499, renewalCents: 1499, transferCents: 1499, currency: "USD", cycle: "yearly" },
  { tld: ".net", registrationCents: 1699, renewalCents: 1699, transferCents: 1699, currency: "USD", cycle: "yearly" },
  { tld: ".org", registrationCents: 1599, renewalCents: 1599, transferCents: 1599, currency: "USD", cycle: "yearly" },
  { tld: ".io", registrationCents: 4499, renewalCents: 4499, transferCents: 4499, currency: "USD", cycle: "yearly" },
  { tld: ".co", registrationCents: 2999, renewalCents: 2999, transferCents: 2999, currency: "USD", cycle: "yearly" },
  { tld: ".africa", registrationCents: 2499, renewalCents: 2499, transferCents: 2499, currency: "USD", cycle: "yearly" }
];

export const domainProducts: CatalogPlan[] = domainPricing.map((domain) => ({
  slug: `domain-${domain.tld.slice(1)}`,
  type: "domain",
  category: "Domains",
  name: `${domain.tld} domain registration`,
  description: `Register or transfer a ${domain.tld} domain through a server-side registrar workflow.`,
  audience: "For businesses securing a professional domain name.",
  priceCents: domain.registrationCents,
  currency: "USD",
  cycle: "yearly",
  specs: { TLD: domain.tld, Registration: `$${(domain.registrationCents / 100).toFixed(2)}`, Renewal: `$${(domain.renewalCents / 100).toFixed(2)}` },
  features: ["OpenSRS-ready registration", "Nameserver management", "DNS zone-ready structure", "Auto-renew-ready structure"]
}));

export const websiteServicePlans: CatalogPlan[] = [
  {
    slug: "website-setup",
    type: "website_service",
    category: "Website Services",
    name: "Website Setup",
    description: "Professional setup for a business website on your hosting account.",
    audience: "For customers who need a clean launch without a full custom build.",
    priceCents: 19900,
    currency: "USD",
    cycle: "one-time",
    serviceRequestOnly: true,
    specs: { Delivery: "Project request", Pages: "Up to 5", Platform: "WordPress or static" },
    features: ["Business website setup", "Contact form-ready structure", "Basic SEO setup", "Hosting connection", "Launch guidance"]
  },
  {
    slug: "website-care",
    type: "website_service",
    category: "Website Services",
    name: "Website Care Plan",
    description: "Monthly website maintenance, updates, and support coordination.",
    audience: "For businesses that want ongoing website support.",
    priceCents: 4900,
    currency: "USD",
    cycle: "monthly",
    serviceRequestOnly: true,
    specs: { Updates: "Monthly", Support: "Priority", Reports: "Included" },
    features: ["Content updates", "Plugin/theme update coordination", "Backup checks", "Security review-ready structure"]
  }
];

export const mobileAppPlans: CatalogPlan[] = [
  {
    slug: "mobile-starter-app",
    type: "mobile_app",
    category: "Mobile App Development",
    name: "Mobile Starter App",
    description: "For simple business apps, booking apps, portfolios, and basic customer portals.",
    audience: "For simple business apps, booking apps, portfolios, and basic customer portals.",
    priceCents: 49900,
    currency: "USD",
    cycle: "one-time",
    serviceRequestOnly: true,
    specs: { Screens: "5 core screens", Build: "Android-ready", Stack: "React Native / Expo" },
    features: ["React Native / Expo app", "Android-ready build", "5 core screens", "Contact/WhatsApp integration", "Basic admin-ready structure", "Deployment guidance"]
  },
  {
    slug: "mobile-business-app",
    type: "mobile_app",
    category: "Mobile App Development",
    name: "Mobile Business App",
    description: "For growing businesses needing authentication, dashboards, and backend data.",
    audience: "For growing businesses needing authentication, dashboards, and backend data.",
    priceCents: 149900,
    currency: "USD",
    cycle: "one-time",
    featured: true,
    serviceRequestOnly: true,
    specs: { Screens: "Up to 12", Auth: "Included", Backend: "Supabase/Firebase-ready" },
    features: ["React Native / Expo app", "Android-ready build", "iOS-ready structure", "User authentication", "Supabase/Firebase backend-ready structure", "Push notification-ready structure", "Admin dashboard-ready integration"]
  },
  {
    slug: "mobile-pro-platform",
    type: "mobile_app",
    category: "Mobile App Development",
    name: "Mobile Pro Platform",
    description: "For marketplace, SaaS, delivery, tourism, school, or internal company apps.",
    audience: "For marketplace, SaaS, delivery, tourism, school, or internal company apps.",
    priceCents: 350000,
    currency: "USD",
    cycle: "one-time",
    serviceRequestOnly: true,
    specs: { Platform: "Android and iOS-ready", Roles: "Included", Payments: "Payment-ready" },
    features: ["React Native / Expo app", "Authentication", "Roles and permissions", "Payment-ready structure", "Realtime-ready features", "Push notifications", "Backend/API integration", "Admin dashboard integration", "Deployment support"]
  },
  {
    slug: "custom-enterprise-app",
    type: "mobile_app",
    category: "Mobile App Development",
    name: "Custom Enterprise App",
    description: "For advanced platforms, multi-tenant systems, AI integrations, automation, or large business workflows.",
    audience: "For advanced platforms, multi-tenant systems, AI integrations, automation, or large business workflows.",
    priceCents: 0,
    currency: "USD",
    cycle: "quote",
    quoteBased: true,
    serviceRequestOnly: true,
    specs: { Discovery: "Required", Architecture: "Custom", Support: "Optional" },
    features: ["Discovery call", "Custom architecture", "Backend/API planning", "AI/automation-ready structure", "Security planning", "Support and maintenance options"]
  }
];

export const addOns = [
  { slug: "backup-retention", name: "Extra backup retention", cycle: "monthly", priceCents: 399, description: "More restore points and longer retention windows." },
  { slug: "additional-storage", name: "Additional NVMe storage", cycle: "monthly", priceCents: 299, description: "Expand storage without changing hosting plans." },
  { slug: "website-migration", name: "Website migration", cycle: "one-time", priceCents: 2500, description: "Assisted migration for websites, email, and databases." },
  { slug: "domain-privacy", name: "Domain privacy", cycle: "yearly", priceCents: 899, description: "WHOIS privacy for supported domain extensions." },
  { slug: "website-security", name: "Website security", cycle: "monthly", priceCents: 699, description: "Malware scanning, cleanup workflows, and security monitoring." }
] as const;

export const hostingPackages = sharedHostingPlans;
export const allHostingPlans = [...sharedHostingPlans, ...wordpressPlans, ...vpsPlans];
export const purchasablePlans = [...sharedHostingPlans, ...wordpressPlans, ...emailPlans, ...vpsPlans, ...sslProducts, ...domainProducts, ...websiteServicePlans, ...mobileAppPlans];

export const catalogGroups = [
  { title: "Shared Hosting", href: "/hosting", plans: sharedHostingPlans },
  { title: "WordPress Hosting", href: "/wordpress-hosting", plans: wordpressPlans },
  { title: "Email Hosting", href: "/email-hosting", plans: emailPlans },
  { title: "VPS Hosting", href: "/vps", plans: vpsPlans },
  { title: "Mobile App Development", href: "/mobile-app-development", plans: mobileAppPlans }
] as const;

export function formatCatalogPrice(plan: { priceCents: number; cycle: BillingCycle }) {
  if (plan.cycle === "quote") {
    return "Request quote";
  }

  const suffix = plan.cycle === "one-time" ? " one-time" : ` / ${plan.cycle === "monthly" ? "month" : "year"}`;
  return `${money(plan.priceCents)}${suffix}`;
}

export const checkoutSteps = [
  "Choose hosting, domain, email, VPS, or SSL product",
  "Register a new domain or use an existing domain",
  "Check live domain availability through a server-side registrar route",
  "Configure billing cycle and add-ons",
  "Review cart",
  "Checkout",
  "Create order and invoice",
  "Queue provisioning job",
  "Wait for real CyberPanel, OpenSRS, WHMCS, or payment provider response"
];

export const dnsRecordTypes = ["A", "AAAA", "CNAME", "MX", "TXT", "SRV", "CAA"] as const;
export const defaultNameservers = ["ns1.tmctechsolutions.com", "ns2.tmctechsolutions.com"] as const;

export const whyChooseUs = [
  { title: "Server-side integrations", icon: Server, text: "CyberPanel, OpenSRS, WHMCS, Paynow, Stripe, PayPal, and Resend calls are routed through Next.js APIs." },
  { title: "Real service records", icon: Database, text: "Services, invoices, DNS, mailboxes, SSL, backups, and jobs stay empty until real orders or provider syncs create them." },
  { title: "Security-first portal", icon: ShieldCheck, text: "Supabase Auth, RLS, audit logs, server-only provider credentials, and Zod-validated internal APIs." },
  { title: "Migration-ready support", icon: RefreshCcw, text: "Migration services are modeled as order items and support workflows with service context." }
];

export const trustSections = [
  { title: "Infrastructure", icon: Database, text: "Hetzner VPS and CyberPanel-ready server allocation for shared, WordPress, email, and VPS services." },
  { title: "Security", icon: LockKeyhole, text: "Provider credentials stay in server environment variables and never reach browser code." },
  { title: "Uptime", icon: Clock3, text: "Usage metrics, service state, SSL state, and backup status are first-class records." },
  { title: "Backups", icon: ArchiveRestore, text: "Backup products support automatic, on-demand, retention, restore, and provider job tracking." },
  { title: "Resources", icon: HardDrive, text: "Plans define storage, bandwidth, mailboxes, databases, CPU/RAM, and fair-use resource allocation." },
  { title: "Support", icon: Headphones, text: "Tickets can attach to services so support sees the relevant domain, hosting plan, invoice, or migration." },
  { title: "Domains", icon: Globe2, text: "OpenSRS-ready flows cover availability, registrations, renewals, transfers, nameservers, and DNS zones." },
  { title: "Automation", icon: Workflow, text: "Provisioning jobs track CyberPanel, WHMCS, registrar, SSL, email, database, backup, and WordPress actions." }
];

export const faqs = [
  ["How is hosting billed?", "Hosting, email, security, backups, and most add-ons are billed monthly. Domains and SSL products are normally billed yearly."],
  ["Do hosting plans include email?", "Safari shared hosting plans include business email with mailbox quotas, webmail access, spam filtering, aliases, and forwarder-ready records."],
  ["Can customers manage DNS records?", "Yes. The portal is structured for A, AAAA, CNAME, MX, TXT, SRV, and CAA records with validation, TTL, priority, confirmations, and audit logs."],
  ["Do you show fake domain availability or services?", "No. Domain checks, provider syncs, and service records stay empty or setup-required until real integrations are configured."],
  ["Where do CyberPanel and OpenSRS credentials live?", "Only in server environment variables. They are never exposed to the browser or stored in customer tables."],
  ["Is Safari a tourism package?", "No. Safari is hosting package branding only."]
];
