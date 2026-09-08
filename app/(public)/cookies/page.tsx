import { LegalPage } from "@/components/marketing/legal-page";
import { company } from "@/content/site";

export const metadata = {
  title: "Cookie policy",
  description: `How ${company.name} uses cookies on tmctechsolutions.com.`
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy" updated="8 September 2026">
      <p>
        This site uses a small number of cookies so it can work and so we can remember your choice. We do not use
        advertising cookies and we do not sell browsing data.
      </p>

      <h2>Essential cookies</h2>
      <p>
        These keep the site usable: security, load balancing, and the record that you dismissed the cookie banner. The
        site cannot run properly without them.
      </p>

      <h2>Preference cookie</h2>
      <p>
        <strong>tmc-cookie-consent</strong> is stored in your browser when you click OK on the banner. It remembers
        that choice so the banner does not return on every visit.
      </p>

      <h2>What we do not use</h2>
      <p>
        We do not place advertising or retargeting cookies. If we add a privacy-respecting analytics tool later, this
        page will name it and the banner will ask again.
      </p>

      <h2>Your choice</h2>
      <p>
        Use the banner, or clear site data in your browser to see it again. For personal data collected through the
        contact form, see the <a href="/privacy">privacy policy</a>. Questions: {company.email}.
      </p>
    </LegalPage>
  );
}
