export const company = {
  name: "TMC Tech Solutions",
  domain: "https://www.tmctechsolutions.com",
  email: "info@tmctechsolutions.com",
  tagline: "Websites, payments, and systems that take bookings and get you paid.",
  mission:
    "We design and build professional websites, connect international payment gateways, and set up SEO and GEO for operators, lodges, and companies that sell to guests worldwide — from Victoria Falls.",
  vision:
    "A business that takes international cards and local rails on a fast site should not have to rebuild every two years.",
  location: "Victoria Falls, Zimbabwe",
  serviceArea: "Clients in Africa, Europe, the UK, and further afield. Invoices in USD.",
  responseTime: "We reply within one working day (CAT, UTC+2), wherever you are.",
  workingHours: "Central Africa Time. Calls arranged for UK, EU, US, and African hours.",
  mapsEmbedUrl: ""
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/tourism", label: "Tourism" },
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export const clients = [
  {
    name: "Masuku Adventure Safaris",
    href: "https://www.masukusafaris.com",
    logo: "/clients/masuku-logo.png",
    width: 324,
    height: 248,
    summary: "Safari packages and Victoria Falls itineraries."
  },
  {
    name: "Awande African Expeditions",
    href: "https://awandeafricanexpeditions.com",
    logo: "/clients/awande-logo.png",
    width: 340,
    height: 203,
    summary: "Game drives and walking safaris in Zambezi National Park."
  },
  {
    name: "Culture Vault",
    href: "https://culturevolt.tmctechsolutions.com",
    logo: "/clients/culture-vault-logo.png",
    width: 1000,
    height: 280,
    summary: "Streetwear shop in Bulawayo — EcoCash checkout, pickup at HNS, nationwide delivery."
  }
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

export const bookingDeposits = [
  {
    slug: "slot",
    name: "Hold a start date",
    amountCents: 150000,
    detail: "$1,500 deposit, applied to the quoted project."
  },
  {
    slug: "presence",
    name: "Presence website",
    amountCents: 120000,
    detail: "50% of $2,400 to start the five-page site."
  },
  {
    slug: "business",
    name: "Business website",
    amountCents: 290000,
    detail: "50% of $5,800. Most teams start here."
  },
  {
    slug: "bookings",
    name: "Bookings & payments",
    amountCents: 490000,
    detail: "50% of $9,800 for a site that takes deposits."
  },
  {
    slug: "tourism",
    name: "Tourism system",
    amountCents: 270000,
    detail: "Deposit against a lodge, activity, or operator system."
  }
] as const;

export const paymentGateways = [
  {
    name: "Stripe",
    price: "$1,400",
    detail: "Visa, Mastercard, and Apple Pay for overseas guests and USD invoices."
  },
  {
    name: "PayPal",
    price: "$1,200",
    detail: "The checkout international travellers already trust for deposits."
  },
  {
    name: "Flutterwave",
    price: "$1,500",
    detail: "African cards and mobile money in one integration."
  },
  {
    name: "PayFast",
    price: "$1,300",
    detail: "South African cards and instant EFT."
  },
  {
    name: "Paynow",
    price: "$1,600",
    detail: "Zimbabwe cards, EcoCash, and OneMoney for guests already on the ground."
  },
  {
    name: "Multi-gateway checkout",
    price: "From $2,800",
    detail: "International card and local mobile money on the same booking."
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

export const tourismLayers = [
  {
    slug: "website",
    index: "01",
    title: "Website",
    price: "From $2,400",
    href: "/services#websites",
    text: "The guest-facing site: packages, itineraries, fleet, and gallery. Fast, mobile, SEO and GEO. Not a template with a sunset stock photo."
  },
  {
    slug: "operations",
    index: "02",
    title: "Operations",
    price: "From $2,500",
    href: "#operations",
    text: "Boats, rooms, vehicles, and dates in one calendar. Slot limits so the desk cannot sell the same 16:00 sailing twice."
  },
  {
    slug: "payments",
    index: "03",
    title: "Payments",
    price: "From $1,200",
    href: "#payments",
    text: "Stripe and PayPal for overseas cards. Paynow for EcoCash, OneMoney, and local cards. Wired into the booking, not dropped in as a plugin."
  },
  {
    slug: "whatsapp",
    index: "04",
    title: "WhatsApp",
    price: "From $2,800",
    href: "#whatsapp",
    text: "Booking received, pickup time, and weather cancels on WhatsApp. Email is backup."
  }
] as const;

export const bookingJourney = [
  {
    index: "01",
    title: "Guest picks a date",
    text: "Cruise, room, activity, or transfer. Remaining seats or rooms come from the operations calendar, not a static price page."
  },
  {
    index: "02",
    title: "Deposit is paid",
    text: "Paynow, Stripe, or both. Card numbers stay on the gateway. The office is notified when the money actually lands."
  },
  {
    index: "03",
    title: "WhatsApp confirmation",
    text: "Guest and desk get the same facts: date, boat or room, pickup, what is paid."
  },
  {
    index: "04",
    title: "Calendar updates",
    text: "Capacity drops. The next enquiry cannot take a seat that is already sold."
  }
] as const;

export const tourismProducts = [
  {
    slug: "boat-cruise",
    name: "Boat and cruise operations",
    price: "From $2,500",
    layer: "operations",
    detail:
      "Guest site, cruise catalogue, enquiry, WhatsApp, and capacity rules so a sailing is not sold twice. Next.js public site plus operations logic for boats, departure slots, and remaining seats."
  },
  {
    slug: "lodge-booking",
    name: "Lodge and hotel booking engine",
    price: "From $8,500",
    layer: "operations",
    detail:
      "Room types, seasonal rates, deposits, and a calendar your front desk can trust. Pays through Paynow, Stripe, or both."
  },
  {
    slug: "tour-quotes",
    name: "Tour operator quote and itinerary",
    price: "From $6,500",
    layer: "operations",
    detail:
      "Build a multi-day itinerary, send a branded quote, take a deposit, and lock the dates."
  },
  {
    slug: "activity-desk",
    name: "Activity and adventure booking",
    price: "From $5,800",
    layer: "operations",
    detail:
      "Rafting, transfers, sunset cruises, and slot limits so you stop double-booking boats and vehicles."
  },
  {
    slug: "agent-portal",
    name: "Travel agent and commission portal",
    price: "From $7,200",
    layer: "operations",
    detail:
      "Agents log in, book on net or commission rates, and see what they are owed."
  },
  {
    slug: "transfers",
    name: "Airport transfer and driver dispatch",
    price: "From $5,400",
    layer: "operations",
    detail:
      "Flight times, vehicle assignment, and driver updates. Useful for lodges and meet-and-greet desks."
  },
  {
    slug: "multi-property",
    name: "Multi-property calendar",
    price: "From $9,200",
    layer: "operations",
    detail:
      "One operator, several lodges or camps, one availability picture."
  },
  {
    slug: "occupancy",
    name: "Occupancy and revenue dashboard",
    price: "From $4,600",
    layer: "operations",
    detail:
      "Tonight’s rooms, next week’s activities, and what has actually been paid."
  },
  {
    slug: "guest-alerts",
    name: "Guest WhatsApp confirmations",
    price: "From $2,800",
    layer: "whatsapp",
    detail:
      "Booking, pickup, and activity reminders on WhatsApp instead of a mailbox nobody checks."
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
    title: "Payments that work for international guests",
    text: "Stripe and PayPal for overseas cards. Local rails where they matter. Wired into the booking, not dropped in as a plugin screenshot."
  },
  {
    title: "Found, not just launched",
    text: "SEO and GEO are setup work, not a blog package. We do not sell content creation."
  },
  {
    title: "Based in Victoria Falls, built for worldwide buyers",
    text: "The photography is the place. The work is scoped, invoiced in USD, and written so a UK or EU operator can sign it."
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
  "Boat / cruise operations",
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

export const faq = [
  {
    question: "Can I pay a deposit now?",
    answer:
      "Yes. Use Book — Paynow takes EcoCash, OneMoney, and cards. No account. The deposit is applied to the quoted project."
  },
  {
    question: "Why did Paynow say the email must match the merchant address?",
    answer:
      "The Paynow integration is still in test mode. Test keys only accept the email registered on the Paynow merchant account. Switch the integration to live in the Paynow dashboard, put the live ID and key in the server env, then guests can pay with their own email."
  },
  {
    question: "Do I need an account to enquire?",
    answer:
      "No. Send a brief on the contact page or email us. Login is only for the TMC team and existing hosting work — not for new clients."
  },
  {
    question: "Are the prices on the site what I will pay?",
    answer:
      "They are starting prices in USD so you can budget. The written quote is the offer. Merchant fees from Stripe, PayPal, or a local gateway are theirs, not ours."
  },
  {
    question: "Do you write content or post on social?",
    answer:
      "No. We build the site, the payments, and the search setup. You supply the words, photos, and offers — or we scope that separately."
  },
  {
    question: "Can you work with a client outside Zimbabwe?",
    answer:
      "Yes. Invoices are in USD. Calls are arranged for UK, EU, US, and African hours. The studio is in Victoria Falls; the work is remote-first."
  }
] as const;

export const services = websitePackages.map((item) => ({
  slug: item.slug,
  title: item.name,
  description: item.summary,
  benefits: item.includes.slice(0, 3)
}));
