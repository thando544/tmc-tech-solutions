import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CookieBanner } from "@/components/marketing/cookie-banner";
import { company } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  url: company.domain,
  email: company.email,
  description: company.mission,
  areaServed: ["Africa", "Europe", "United Kingdom", "United States"],
  currenciesAccepted: "USD",
  priceRange: "$$–$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Victoria Falls",
    addressCountry: "ZW"
  },
  knowsAbout: [
    "Website development",
    "Payment gateway integration",
    "SEO",
    "Generative engine optimization",
    "Website speed optimization",
    "WordPress migration",
    "Tourism booking systems"
  ]
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <CookieBanner />
    </>
  );
}
