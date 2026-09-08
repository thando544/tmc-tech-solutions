import { LegalPage } from "@/components/marketing/legal-page";
import { company } from "@/content/site";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy policy",
  description: `How ${company.name} collects and uses personal information when you enquire or become a client.`,
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="8 September 2026">
      <p>
        This policy is for people who visit {company.domain}, send a brief, or become a client. We are {company.name},
        based in {company.location}. Contact: {company.email}.
      </p>

      <h2>Who this is for</h2>
      <p>
        We work with international clients. If you are in the UK, EU, or another jurisdiction with data-protection
        rights, you can ask us for a copy of what we hold, a correction, or a deletion, unless we must keep it for a
        contract or the law.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Contact form and email: name, email, business name, project type, budget band, and your message.</li>
        <li>Client work: contracts, invoices, site credentials you choose to share, and project files.</li>
        <li>Technical: standard server logs (IP address, browser, pages requested) for security and uptime.</li>
        <li>
          Analytics: pages viewed and traffic source via Google’s tag, used for site performance and Google Ads
          measurement.
        </li>
        <li>Cookie preference, if you use the banner on this site.</li>
      </ul>
      <p>
        We do not store card numbers. Payment gateways (Stripe, PayPal, Paynow, Flutterwave, PayFast, and others)
        process those under their own terms.
      </p>

      <h2>Why we use it</h2>
      <p>
        To reply to enquiries, quote and deliver work, invoice in USD, and keep the site secure. Legal bases are
        steps toward a contract, our legitimate interest in running the studio, and consent where you accept cookies
        beyond the essential set.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Hosting and email providers that run this website and our inbox. Google receives page-view data through the
        Google tag (Analytics / Ads measurement ID G-794EHGSX3D) so we can see which ads and pages work. We do not
        sell contact lists.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Unsuccessful enquiries: up to 24 months. Contracts, invoices, and tax records: as long as the law in Zimbabwe
        and any agreed governing law require. You can ask us to delete an enquiry sooner.
      </p>

      <h2>International transfers</h2>
      <p>
        The studio is in Zimbabwe. Email and hosting may be processed in the EU, UK, or US. By sending a brief you
        understand that. We only use established providers.
      </p>

      <h2>Your rights</h2>
      <p>
        Email {company.email} to access, correct, or delete personal data, or to object to a use that is not required
        for a live contract. We will answer within one month.
      </p>

      <h2>Cookies</h2>
      <p>
        See the <a href="/cookies">cookie policy</a> and the <a href="/terms">terms</a>. Those two documents plus this
        privacy notice are what apply to this website.
      </p>
    </LegalPage>
  );
}
