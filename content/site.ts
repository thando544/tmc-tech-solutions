export const company = {
  name: "TMC Tech Solutions",
  domain: "https://www.tmctechsolutions.com",
  email: "info@tmctechsolutions.com",
  tagline: "Websites, payments, and systems that take bookings and get you paid.",
  mission:
    "We build professional websites, connect payment gateways, and set up SEO and GEO for lodges, operators, and growing businesses — from Victoria Falls, working across Southern Africa.",
  vision:
    "Local companies should take cards, EcoCash, and international payments on sites that load fast, rank properly, and do not depend on a WordPress plugin stack.",
  location: "Victoria Falls, Zimbabwe",
  serviceArea: "Southern Africa and international tourism brands",
  responseTime: "We reply within one working day with a scoped next step.",
  mapsEmbedUrl: ""
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/tourism", label: "Tourism" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export const websitePackages = [
  {
    slug: "presence",
    name: "Presence",
    price: "$2,400",
    timeline: "2–3 weeks",
    summary: "A clean 5-page site that looks like a real company, not a template.",
    includes: [
      "Home, about, services, contact, plus one extra page",
      "Mobile layout and enquiry form",
      "SEO foundation: titles, schema, sitemap, Search Console",
      "Speed pass to a passing Core Web Vitals score",
      "Handover and 14 days of fixes"
    ]
  },
  {
    slug: "business",
    name: "Business",
    price: "$5,800",
    timeline: "4–6 weeks",
    featured: true,
    summary: "The catalogue most established businesses should buy.",
    includes: [
      "10–12 pages with a simple CMS for your team",
      "SEO and GEO launch setup",
      "Analytics, conversion events, and two forms",
      "Speed optimisation baked into the build",
      "30 days of post-launch support"
    ]
  },
  {
    slug: "bookings",
    name: "Bookings & payments",
    price: "$9,800",
    timeline: "6–8 weeks",
    summary: "For anyone who needs to take a deposit or a full payment online.",
    includes: [
      "Booking or checkout flow on a custom site",
      "One payment gateway wired end to end",
      "SEO, GEO, and speed included",
      "Email or WhatsApp booking confirmation",
      "45 days of post-launch support"
    ]
  },
  {
    slug: "custom",
    name: "Custom platform",
    price: "From $18,000",
    timeline: "Scoped",
    summary: "Multi-property, agent portals, or anything with real business rules.",
    includes: [
      "Discovery workshop and written specification",
      "Custom architecture and staged delivery",
      "Integrations quoted as their own line items",
      "Training for your operations team"
    ]
  }
] as const;

export const paymentGateways = [
  {
    name: "Paynow",
    price: "$1,600",
    detail: "Zimbabwe cards, EcoCash, and OneMoney — the default for local guests."
  },
  {
    name: "Stripe",
    price: "$1,400",
    detail: "International cards. Best for overseas guests and USD invoices."
  },
  {
    name: "PayPal",
    price: "$1,200",
    detail: "Familiar checkout for international FIT and tour-operator deposits."
  },
  {
    name: "Flutterwave",
    price: "$1,500",
    detail: "Regional African cards and mobile money in one integration."
  },
  {
    name: "PayFast",
    price: "$1,300",
    detail: "South African cards and instant EFT for SA-sourced bookings."
  },
  {
    name: "Multi-gateway checkout",
    price: "From $2,800",
    detail: "Let the guest pick local mobile money or an international card."
  }
] as const;

export const setupPackages = [
  {
    slug: "seo-setup",
    name: "SEO setup",
    price: "$1,600",
    detail:
      "Technical SEO on an existing site: titles, headings, schema, sitemap, redirects, Search Console, and a keyword map for the pages that should rank."
  },
  {
    slug: "geo-setup",
    name: "GEO setup",
    price: "$1,200",
    detail:
      "Generative engine optimisation so ChatGPT, Gemini, Perplexity, and AI overviews can cite the business. Not content writing — structure, schema, and machine-readable pages."
  },
  {
    slug: "seo-geo-launch",
    name: "SEO + GEO launch",
    price: "$2,400",
    detail: "Both setups together when we are launching or rebuilding the site."
  },
  {
    slug: "speed",
    name: "Speed optimisation",
    price: "$1,100",
    detail: "Images, caching, fonts, and Core Web Vitals on a site that already exists."
  },
  {
    slug: "wp-migration",
    name: "WordPress to custom",
    price: "From $3,800",
    detail:
      "Move off WordPress without killing rankings: URL map, 301s, content transfer, and a faster stack."
  }
] as const;

export const seoRetainers = [
  { name: "Local", price: "$650 / month", detail: "One location, core pages, monthly technical pass." },
  { name: "Growth", price: "$1,200 / month", detail: "Competitive terms, GEO monitoring, monthly reporting." },
  { name: "Portfolio", price: "$2,200 / month", detail: "Several properties or brands under one operator." }
] as const;

export const integrationServices = [
  {
    slug: "ai-integration",
    name: "AI integration",
    price: "From $3,200",
    detail:
      "Connect a model to a real workflow: availability, booking questions, invoices, or internal ops. We do not sell content-creation tools or chatbot demos."
  },
  {
    slug: "payments-integration",
    name: "Payment gateway integration",
    price: "From $1,200",
    detail: "Add or replace a gateway on a site you already have. Priced per gateway above."
  }
] as const;

export const tourismProducts = [
  {
    slug: "lodge-booking",
    name: "Lodge and hotel booking engine",
    price: "From $8,500",
    detail:
      "Room types, seasonal rates, deposits, and a calendar your front desk can trust. Pays through Paynow, Stripe, or both."
  },
  {
    slug: "tour-quotes",
    name: "Tour operator quote and itinerary",
    price: "From $6,500",
    detail:
      "Build a multi-day itinerary, send a branded quote, take a deposit, and lock the dates."
  },
  {
    slug: "activity-desk",
    name: "Activity and adventure booking",
    price: "From $5,800",
    detail:
      "Rafting, transfers, sunset cruises, and slot limits so you stop double-booking boats and vehicles."
  },
  {
    slug: "agent-portal",
    name: "Travel agent and commission portal",
    price: "From $7,200",
    detail:
      "Agents log in, book on net or commission rates, and see what they are owed."
  },
  {
    slug: "transfers",
    name: "Airport transfer and driver dispatch",
    price: "From $5,400",
    detail:
      "Flight times, vehicle assignment, and driver updates. Useful for lodges and meet-and-greet desks."
  },
  {
    slug: "multi-property",
    name: "Multi-property calendar",
    price: "From $9,200",
    detail:
      "One operator, several lodges or camps, one availability picture."
  },
  {
    slug: "guest-alerts",
    name: "Guest WhatsApp confirmations",
    price: "From $2,800",
    detail:
      "Booking, pickup, and activity reminders on WhatsApp instead of a mailbox nobody checks."
  },
  {
    slug: "occupancy",
    name: "Occupancy and revenue dashboard",
    price: "From $4,600",
    detail:
      "Tonight’s rooms, next week’s activities, and what has actually been paid."
  }
] as const;

export const processSteps = [
  {
    title: "Brief",
    text: "You send the business, the pages, and how you take money today. We reply within a working day."
  },
  {
    title: "Quote",
    text: "A written scope with a fixed price, timeline, and what is not included. No hourly surprise."
  },
  {
    title: "Build",
    text: "Weekly check-ins. You see the site before the public does."
  },
  {
    title: "Launch",
    text: "DNS, payments test, SEO/GEO go-live, and a handover your team can run."
  }
] as const;

export const whyChooseUs = [
  {
    title: "Priced like a firm, not a weekend job",
    text: "Cheap WordPress sites get rebuilt in 18 months. We publish real starting prices so serious buyers can plan."
  },
  {
    title: "Payments that work here",
    text: "Paynow and EcoCash for local guests. Stripe or PayPal for the overseas booking. Wired properly, not a plugin screenshot."
  },
  {
    title: "Found, not just launched",
    text: "SEO and GEO are setup work, not a blog package. We do not sell content creation."
  },
  {
    title: "Built in Victoria Falls",
    text: "We understand lodges, operators, and the season. The work is professional enough to sit next to an international brand."
  }
] as const;

export const values = [
  {
    title: "Clarity",
    text: "A fixed quote, a timeline, and a site a manager can update without calling us every Friday."
  },
  {
    title: "Craft",
    text: "Photography, type, and performance. The page should look like the place, not a theme."
  },
  {
    title: "Money in",
    text: "If the business takes deposits, the site has to take them. Integrations are the product."
  },
  {
    title: "Stay fast",
    text: "Speed and search setup are part of launch, not a later upsell if we built the site."
  }
] as const;

export const contactInterests = [
  "New website",
  "Bookings and payments",
  "Payment gateway only",
  "SEO / GEO setup",
  "Speed optimisation",
  "Leave WordPress",
  "Tourism system",
  "AI integration",
  "Something else"
] as const;

export const budgetBands = [
  "Under $3,000",
  "$3,000 – $6,000",
  "$6,000 – $12,000",
  "$12,000 – $20,000",
  "$20,000+",
  "Not sure yet"
] as const;

export const socialLinks = [{ href: "https://www.youtube.com/", label: "YouTube" }] as const;

/** @deprecated Kept so older imports do not break during the catalogue rewrite. */
export const services = websitePackages.map((item) => ({
  slug: item.slug,
  title: item.name,
  description: item.summary,
  benefits: item.includes.slice(0, 3)
}));
