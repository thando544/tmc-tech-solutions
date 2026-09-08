import { company } from "@/content/site";
import { LogoMark } from "@/components/layout/logo-mark";
import { PrintQuoteButton } from "./print-button";

const quote = {
  number: "TMC-Q-260908",
  date: "8 September 2026",
  validUntil: "8 October 2026",
  preparedFor: "Boat cruise operator",
  timeline: "3–4 weeks from deposit and content",
  currency: "USD"
} as const;

const lineItems = [
  {
    amount: 300,
    title: "Discovery, brand and cruise UX",
    detail:
      "Operator brief, page map, cruise catalogue structure, and a custom visual design that uses your logo, colours, photography and boat names — not a tourism template."
  },
  {
    amount: 750,
    title: "Custom Next.js website (10 pages, responsive)",
    detail:
      "Home, About Us, Cruises & Packages, Cruise Details, Destinations, Ships / Fleet, Special Offers, Gallery, FAQ, Contact. Built for mobile, tablet and desktop."
  },
  {
    amount: 300,
    title: "Cruise and package catalogue",
    detail:
      "Listings with pricing, duration, destinations, itinerary, inclusions, exclusions, images and package detail pages. Enquiry from any cruise."
  },
  {
    amount: 250,
    title: "Guest enquiry and contact stack",
    detail:
      "Contact form, cruise enquiry form (boat, date, party size), WhatsApp click-to-chat, click-to-call, email notifications, and social links."
  },
  {
    amount: 400,
    title: "C++ boat operations engine",
    detail:
      "Compiled C++ service for boat capacity, departure slots, occupancy rules and overbooking checks. This is the operations maths — not a brochure plugin."
  },
  {
    amount: 150,
    title: "Next.js ↔ C++ integration",
    detail:
      "Secure API so the website can ask the engine which departures still have seats, and staff can keep boats, times and capacities in one place."
  },
  {
    amount: 150,
    title: "SEO, analytics and sharing metadata",
    detail:
      "Search-friendly URLs, meta titles and descriptions, XML sitemap, robots.txt, Google Analytics, Search Console, and social sharing cards."
  },
  {
    amount: 200,
    title: "Launch, security and handover",
    detail:
      "SSL/HTTPS, security headers, performance pass, production deploy, domain connection, basic backup setup, and 14 days of post-launch fixes."
  }
] as const;

const pages = [
  "Home — hero, featured cruises, next departures, enquiry CTA",
  "About Us — operator story, safety, crew, licences",
  "Cruises & Packages — filterable catalogue (sunset, sunset-plus, private, transfers)",
  "Cruise Details — itinerary, price, duration, inclusions, exclusions, boat, enquire",
  "Destinations — river, gorge, islands, viewing points you actually run",
  "Ships / Fleet — each boat, capacity, facilities, photos",
  "Special Offers — seasonal and group rates",
  "Gallery — photo grid from your shoots",
  "FAQ — boarding, children, weather, what to bring, payment on the day",
  "Contact Us — form, map, WhatsApp, phone, email, hours"
] as const;

const operations = [
  "Boat register: name, type, licensed capacity, status",
  "Departure timetable: cruise type, days, boarding time, duration",
  "Seat occupancy: remaining seats per departure (C++ engine)",
  "Party-size check on enquiry so you are not sold past capacity",
  "Inclusions / exclusions stored per package, not buried in a PDF",
  "Staff-facing list of today’s boats and remaining seats (simple ops view)",
  "Content you can send us to update: prices, offers, photos, cancelled days"
] as const;

const notIncluded = [
  "Web hosting, domain registration/renewal, and business email",
  "Payment processor fees (Stripe, PayPal, Paynow, etc.)",
  "Card checkout or a full online booking/payment engine",
  "Live cruise-line inventory, GDS, or third-party cruise APIs",
  "Agent / commission portal, guest accounts, or a native mobile app",
  "Online advertising, content writing, and professional photography",
  "Major new features after launch — quoted separately"
] as const;

const clientPays = [
  { item: "Domain", typical: "about $15–$20 / year" },
  { item: "Web hosting", typical: "about $0–$25 / month" },
  { item: "Business email", typical: "about $6–$12 / mailbox / month" },
  { item: "WhatsApp Business (basic)", typical: "usually $0" },
  { item: "Google Analytics and Search Console", typical: "$0" }
] as const;

const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

export default function BoatCruiseQuotationPage() {
  return (
    <article className="mx-auto max-w-[880px] bg-white px-5 py-8 text-foreground shadow-sm print:max-w-none print:px-0 print:py-0 print:shadow-none sm:px-10 sm:py-12">
      <div className="mb-8 flex items-center justify-between gap-4 print:hidden">
        <p className="text-sm text-muted">Internal / client quotation — not in the public menu</p>
        <PrintQuoteButton />
      </div>

      <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <LogoMark className="h-[72px] w-[72px] sm:h-[88px] sm:w-[88px]" />
          <div>
            <p className="font-logo text-[22px] font-bold tracking-[0.04em]">TMC</p>
            <p className="mt-1 font-logo text-[11px] font-semibold tracking-[0.14em] text-brand">Tech Solutions</p>
            <p className="mt-3 text-sm text-muted">{company.location}</p>
            <a href={company.domain} className="mt-1 block text-sm font-semibold text-brand">
              www.tmctechsolutions.com
            </a>
          </div>
        </div>
        <div className="text-sm sm:text-right">
          <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">Quotation</p>
          <p className="mt-2 font-semibold">{quote.number}</p>
          <p className="mt-1 text-muted">Date: {quote.date}</p>
          <p className="text-muted">Valid until: {quote.validUntil}</p>
          <p className="mt-2 text-muted">Currency: {quote.currency}</p>
        </div>
      </header>

      <div className="mt-8 grid gap-6 border-b border-border pb-8 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">From</p>
          <p className="mt-2 font-semibold">{company.name}</p>
          <p className="mt-1 text-sm text-muted">{company.tagline}</p>
          <a href={`mailto:${company.email}`} className="mt-2 block text-sm text-brand">
            {company.email}
          </a>
          <a href={company.domain} className="mt-1 block text-sm text-brand">
            {company.domain.replace("https://", "")}
          </a>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Prepared for</p>
          <p className="mt-2 font-semibold">{quote.preparedFor}</p>
          <p className="mt-1 text-sm text-muted">
            Website and operations system for a boat cruise company: guest site, cruise catalogue, enquiries, and boat-capacity logic.
          </p>
          <p className="mt-3 text-sm text-muted">Build window: {quote.timeline}</p>
        </div>
      </div>

      <section className="mt-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Boat cruise website and operations system
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          A professional guest website in <strong className="text-foreground">Next.js</strong>, plus a{" "}
          <strong className="text-foreground">C++ operations engine</strong> for boat capacity, departure slots and occupancy.
          Guests enquire. You see remaining seats. This is not a live cruise-line booking engine and it does not take card payments — those are later phases.
        </p>
      </section>

      <section className="mt-8 grid gap-3 border border-border bg-secondary-background p-5 sm:grid-cols-3">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Build</p>
          <p className="mt-1 text-2xl font-extrabold text-brand">US$ {total.toLocaleString("en-US")}</p>
          <p className="mt-1 text-sm text-muted">One-time, fixed</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Maintenance</p>
          <p className="mt-1 text-2xl font-extrabold">US$ 200</p>
          <p className="mt-1 text-sm text-muted">Per month, optional from month 2</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Stack</p>
          <p className="mt-1 text-lg font-bold">Next.js + C++</p>
          <p className="mt-1 text-sm text-muted">Guest site + operations engine</p>
        </div>
      </section>

      <section className="mt-3 border border-border p-5">
        <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">Payment before work starts</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          <strong className="text-foreground">30% is paid before any work begins</strong> (US$ 750 deposit). Build, design and coding start only after that deposit clears. The remaining{" "}
          <strong className="text-foreground">70% (US$ 1,750) is paid before go-live</strong>.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Investment breakdown — US$ 2,500</h2>
        <p className="mt-2 text-sm text-muted">Every line is in the build. Nothing below is an optional add-on inside this fee.</p>
        <div className="mt-5 overflow-x-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary-background">
              <tr>
                <th className="px-4 py-3 font-semibold">Included work</th>
                <th className="px-4 py-3 text-right font-semibold">USD</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item) => (
                <tr key={item.title} className="border-b border-border last:border-0">
                  <td className="px-4 py-4">
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 leading-6 text-muted">{item.detail}</p>
                  </td>
                  <td className="px-4 py-4 align-top text-right font-semibold tabular-nums">
                    {item.amount.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
              <tr className="bg-secondary-background">
                <td className="px-4 py-4 font-bold">Total development (fixed)</td>
                <td className="px-4 py-4 text-right text-lg font-extrabold text-brand tabular-nums">
                  {total.toLocaleString("en-US")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">How Next.js and C++ split the work</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="border border-border p-5">
            <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">Next.js — guest website</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <li>Public pages, cruise catalogue, gallery, FAQ</li>
              <li>Mobile layout and Core Web Vitals pass</li>
              <li>Enquiry forms, WhatsApp, email alerts</li>
              <li>SEO, sitemap, analytics, social cards</li>
              <li>Fast, search-friendly, easy to host</li>
            </ul>
          </div>
          <div className="border border-border p-5">
            <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">C++ — boat operations</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <li>Boat capacity and licensed headcount</li>
              <li>Departure slot calendar (time, duration, boat)</li>
              <li>Remaining seats / occupancy rules</li>
              <li>Rejects an enquiry that would overfill a sailing</li>
              <li>Small ops view: today’s boats and seats left</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Website pages</h2>
        <ul className="mt-4 space-y-2">
          {pages.map((page) => (
            <li key={page} className="border-b border-border py-2.5 text-sm leading-6 last:border-0">
              {page}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Boat-cruise operations included in this fee</h2>
        <ul className="mt-4 space-y-2">
          {operations.map((item) => (
            <li key={item} className="border-b border-border py-2.5 text-sm leading-6 last:border-0">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Customer enquiries</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2">
          <li>General contact form</li>
          <li>Cruise enquiry: cruise, date, adults/children, notes</li>
          <li>WhatsApp deep link with the cruise name pre-filled where possible</li>
          <li>Email notification to your operations inbox</li>
          <li>Click-to-call and click-to-email</li>
          <li>Facebook / Instagram / TripAdvisor links as supplied</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">SEO, analytics and launch</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2">
          <li>Meta titles and descriptions per page</li>
          <li>XML sitemap and robots.txt</li>
          <li>Google Analytics 4</li>
          <li>Google Search Console</li>
          <li>Open Graph / social sharing images</li>
          <li>SSL, security headers, performance pass</li>
          <li>Production deployment and domain connection</li>
          <li>Basic backup configuration</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Monthly maintenance — US$ 200</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Starts after the 14-day handover. About 4 hours per month. Unused hours do not roll over. Quoted separately if a month needs more than that.
        </p>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2">
          <li>Security and dependency updates</li>
          <li>Uptime and backup monitoring</li>
          <li>Form / enquiry troubleshooting</li>
          <li>Cruise, price, offer and image updates</li>
          <li>Broken-link and performance checks</li>
          <li>Minor design adjustments</li>
          <li>Basic SEO health and analytics glance</li>
          <li>Deploy of maintenance changes</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Not included in US$ 2,500</h2>
        <ul className="mt-4 space-y-2">
          {notIncluded.map((item) => (
            <li key={item} className="border-b border-border py-2.5 text-sm leading-6 last:border-0">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">What the client pays separately (running costs)</h2>
        <p className="mt-2 text-sm text-muted">
          These are not TMC fees. We help you set them up. Typical amounts:
        </p>
        <div className="mt-5 overflow-x-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary-background">
              <tr>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Typical cost</th>
              </tr>
            </thead>
            <tbody>
              {clientPays.map((row) => (
                <tr key={row.item} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{row.item}</td>
                  <td className="px-4 py-3 text-muted">{row.typical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          Year-one picture if you take maintenance: <strong className="text-foreground">US$ 2,500 build</strong> +{" "}
          <strong className="text-foreground">US$ 200 × 11 months ≈ US$ 2,200</strong> + hosting/email of about{" "}
          <strong className="text-foreground">US$ 15–$50 / month</strong>.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Later work (quoted separately)</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Card deposits, Paynow / Stripe checkout, live availability calendars sold to the public, agent portals, redesigns, and native apps.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Payment and terms</h2>
        <div className="mt-5 overflow-x-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary-background">
              <tr>
                <th className="px-4 py-3 font-semibold">When</th>
                <th className="px-4 py-3 font-semibold">Share</th>
                <th className="px-4 py-3 text-right font-semibold">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3">
                  <p className="font-semibold">Before any work starts</p>
                  <p className="mt-1 text-muted">Deposit. Design and development do not begin until this is paid.</p>
                </td>
                <td className="px-4 py-3 font-semibold">30%</td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums">750</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3">
                  <p className="font-semibold">Before go-live</p>
                  <p className="mt-1 text-muted">Balance. Domain is connected and the site is published after this is paid.</p>
                </td>
                <td className="px-4 py-3 font-semibold">70%</td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums">1,750</td>
              </tr>
              <tr className="bg-secondary-background">
                <td className="px-4 py-3 font-bold">Total</td>
                <td className="px-4 py-3 font-bold">100%</td>
                <td className="px-4 py-3 text-right font-extrabold text-brand tabular-nums">2,500</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
          <li>You supply logo, colours, boat names, prices, itineraries, photos and copy. Photography and copywriting are not in this fee.</li>
          <li>This quotation is valid until {quote.validUntil}. After that, reconfirm in writing.</li>
          <li>Invoices in USD. {company.location}.</li>
          <li>
            Reply to <a href={`mailto:${company.email}`} className="text-brand">{company.email}</a> or see{" "}
            <a href={company.domain} className="text-brand">{company.domain.replace("https://", "")}</a>.
          </li>
        </ul>
      </section>

      <section className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">For TMC Tech Solutions</p>
          <div className="mt-10 border-t border-border pt-2 text-sm">
            <p className="font-semibold">{company.name}</p>
            <p className="text-muted">{company.location}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Accepted by the client</p>
          <p className="mt-10 text-sm text-muted">Name / signature / date</p>
          <div className="mt-8 border-t border-border pt-2 text-sm text-muted">Print name and company</div>
        </div>
      </section>

      <footer className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {company.name} · {quote.number}
        </p>
        <a href={company.domain} className="font-semibold text-brand">
          {company.domain.replace("https://", "")}
        </a>
      </footer>
    </article>
  );
}
