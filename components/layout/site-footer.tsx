import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/marketing/container";
import { company, navLinks, socialLinks } from "@/content/site";

const footerColumns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Services",
    links: [
      { href: "/services#ai-solutions", label: "AI Solutions" },
      { href: "/services#custom-software", label: "Custom Software" },
      { href: "/services#cloud-solutions", label: "Cloud Solutions" },
      { href: "/services#business-automation", label: "Automation" }
    ]
  },
  {
    title: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: `mailto:${company.email}`, label: "Email us" },
      { href: socialLinks[0]?.href ?? "https://www.youtube.com/", label: "YouTube" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-navy text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">{company.tagline}</p>
            <p className="mt-4 text-sm text-slate-300">
              <a href={`mailto:${company.email}`} className="font-medium text-white transition hover:text-blue-300">
                {company.email}
              </a>
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-slate-200 underline-offset-4 transition hover:text-white hover:underline"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold text-white">{column.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-slate-800 pt-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-300 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
