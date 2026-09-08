import { LegalPage } from "@/components/marketing/legal-page";
import { company } from "@/content/site";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Cookie policy",
  description: `How ${company.name} uses cookies on tmctechsolutions.com.`,
  path: "/cookies"
});

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy" updated="8 September 2026">
      <p>
        This site uses a small number of cookies so it can work, remember your choice, and measure visits from Google
        Ads. We do not sell browsing data.
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

      <h2>Google tag (Analytics and Ads)</h2>
      <p>
        We load Google’s tag (gtag.js, measurement ID G-794EHGSX3D) on every page. It is the same tag Google Ads uses
        to count visits, Smart campaign performance, and later conversion events. Google may set cookies such as{" "}
        <strong>_ga</strong>. See{" "}
        <a href="https://policies.google.com/privacy" rel="noreferrer">
          Google’s privacy policy
        </a>
        .
      </p>

      <h2>Your choice</h2>
      <p>
        Use the banner, or clear site data in your browser to see it again. For personal data collected through the
        contact form, see the <a href="/privacy">privacy policy</a>. Questions: {company.email}.
      </p>
    </LegalPage>
  );
}
