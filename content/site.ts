import {
  Bot,
  Cloud,
  Code2,
  Cpu,
  Headphones,
  Layers,
  Link2,
  Smartphone,
  Sparkles,
  Workflow
} from "lucide-react";

export const company = {
  name: "TMC Tech Solutions",
  domain: "https://tmctechsolutions.com",
  email: "info@tmctechsolutions.com",
  tagline: "Building Smarter Businesses with AI & Modern Technology",
  mission:
    "Helping businesses and creators leverage software, artificial intelligence, automation, and cloud technologies to improve productivity and accelerate growth.",
  vision:
    "A world where every business can operate with the clarity, speed, and intelligence of a modern technology company.",
  location: "TMC Tech Solution · Zimbabwe",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5521.022933822663!2d25.830167700000004!3d-17.9315803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x194fe54735c13ced%3A0x92d622aef65bef5a!2sTMC%20TECH%20SOLUTION!5e1!3m2!1sen!2szw!4v1786554158514!5m2!1sen!2szw"
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" }
] as const;

export const services = [
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    description: "Custom AI systems that turn data, documents, and workflows into actionable intelligence.",
    benefits: ["LLM-powered assistants", "Document intelligence", "Decision support"],
    icon: Sparkles
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    description: "Automate repetitive work with intelligent agents that learn your business processes.",
    benefits: ["Agent workflows", "Human-in-the-loop", "Ops efficiency"],
    icon: Bot
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    description: "Bespoke web platforms and internal tools designed around how your team actually works.",
    benefits: ["Product engineering", "Secure architecture", "Scalable delivery"],
    icon: Code2
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    description: "Native-quality mobile experiences for iOS and Android with shared product systems.",
    benefits: ["Cross-platform apps", "API-backed UX", "App Store readiness"],
    icon: Smartphone
  },
  {
    slug: "web-development",
    title: "Web Development",
    description: "Fast, accessible product websites and dashboards with modern front-end architecture.",
    benefits: ["Next.js apps", "Design systems", "Conversion-focused UX"],
    icon: Layers
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Cloud architecture, deployments, and reliability without the infrastructure noise.",
    benefits: ["Cloud architecture", "CI/CD pipelines", "Observability"],
    icon: Cloud
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    description: "Connect tools and eliminate manual handoffs across sales, ops, and support.",
    benefits: ["Process mapping", "Workflow engines", "ROI tracking"],
    icon: Workflow
  },
  {
    slug: "api-integrations",
    title: "API Integrations",
    description: "Reliable integrations between your product, partners, and third-party platforms.",
    benefits: ["REST & webhooks", "Data sync", "Error handling"],
    icon: Link2
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    description: "Strategic technical guidance for roadmaps, stack choices, and delivery risk.",
    benefits: ["Architecture reviews", "Build vs buy", "Team enablement"],
    icon: Cpu
  },
  {
    slug: "technical-support",
    title: "Technical Support",
    description: "Ongoing support for the software we build — monitoring, fixes, and iteration.",
    benefits: ["SLA options", "Incident response", "Continuous improvement"],
    icon: Headphones
  }
] as const;

export const whyChooseUs = [
  {
    title: "AI-native thinking",
    text: "We design products and workflows where intelligence is a core feature — not a bolted-on demo."
  },
  {
    title: "Production engineering",
    text: "Clean architecture, TypeScript rigor, and delivery practices that survive real traffic."
  },
  {
    title: "Business outcomes",
    text: "Every engagement starts with productivity, growth, and measurable operational impact."
  },
  {
    title: "Long-term partnership",
    text: "From discovery to support, we stay close so your systems keep improving after launch."
  }
] as const;

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Node.js",
  "OpenAI",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "AWS",
  "Vercel",
  "Docker"
] as const;

export const trustedBy = [
  "Startups",
  "Agencies",
  "Creators",
  "Operators",
  "Product teams"
] as const;

export const values = [
  {
    title: "Clarity",
    text: "Simple interfaces, honest timelines, and decisions you can explain to stakeholders."
  },
  {
    title: "Craft",
    text: "Premium UX and reliable engineering — the details that make software feel inevitable."
  },
  {
    title: "Leverage",
    text: "AI and automation should multiply your team’s capacity, not create more busywork."
  },
  {
    title: "Trust",
    text: "Security, privacy, and responsible AI practices are part of how we ship — not afterthoughts."
  }
] as const;

export const testimonials = [
  {
    quote:
      "TMC helped us turn scattered spreadsheets into an AI-assisted ops workflow. We moved faster without hiring a larger team.",
    name: "Operations Lead",
    role: "Growth-stage startup"
  },
  {
    quote:
      "Their product sense and engineering discipline felt like a senior in-house team — clear communication and polished delivery.",
    name: "Founder",
    role: "Digital services company"
  },
  {
    quote:
      "We needed custom software, not another template. TMC delivered a platform our customers actually enjoy using.",
    name: "Product Manager",
    role: "B2B SaaS"
  }
] as const;

export const socialLinks = [
  { href: "https://www.youtube.com/", label: "YouTube" }
] as const;
