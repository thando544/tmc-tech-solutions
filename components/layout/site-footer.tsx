import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/marketing/container";
import { company, navLinks } from "@/content/site";

const footerColumns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/book", label: "Book / pay a deposit" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Work",
    links: [
      { href: "/services#websites", label: "Websites" },
      { href: "/services#payments", label: "Payments" },
      { href: "/services#setup", label: "SEO, GEO & speed" },
      { href: "/tourism", label: "Tourism systems" },
      { href: "https://www.masukusafaris.com", label: "Masuku Safaris" },
      { href: "https://awandeafricanexpeditions.com", label: "Awande Expeditions" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/cookies", label: "Cookies" },
      { href: "/terms", label: "Terms" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">{company.tagline}</p>
            <p className="mt-4 text-sm text-white/55">{company.location}</p>
            <a href={`mailto:${company.email}`} className="mt-2 inline-block text-sm text-white hover:text-brand">
              {company.email}
            </a>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-bold tracking-[0.16em] text-white uppercase">{column.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          className="hover:text-white"
                          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <div className="flex flex-wrap gap-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-6 text-white/35">
          Photographs of Victoria Falls from Wikimedia Commons: Stiac H (CC0); John Walker (public domain); Saraessop
          (CC BY-SA 4.0).
        </p>
      </Container>
    </footer>
  );
}
