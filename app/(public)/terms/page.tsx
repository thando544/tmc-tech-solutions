import { LegalPage } from "@/components/marketing/legal-page";
import { company } from "@/content/site";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms",
  description: `Terms for quoting and delivering work with ${company.name}.`,
  path: "/terms"
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="8 September 2026">
      <p>
        These terms cover enquiries and projects with {company.name}, {company.location}. Sending a brief or paying an
        invoice means you accept them. Questions: {company.email}.
      </p>

      <h2>Quotes</h2>
      <p>
        Prices on this website are starting prices in USD, not a live cart. A written quote is the offer. Work starts
        when that quote is accepted and any agreed deposit is paid. Merchant fees charged by Stripe, PayPal, Paynow, or
        another gateway are theirs, not ours.
      </p>

      <h2>Delivery</h2>
      <p>
        Timelines in the quote assume you supply content, access, and decisions when asked. Delays on your side move the
        date. We do not provide content writing unless the quote says so.
      </p>

      <h2>What you own</h2>
      <p>
        After final payment you own the site and code we built for you, except third-party tools, fonts, photos, and
        libraries that keep their own licences. We may show the work as a case study unless you ask us not to in
        writing.
      </p>

      <h2>Liability</h2>
      <p>
        We are not liable for lost bookings, gateway downtime, or search ranking changes outside our control. Our
        liability for a project is limited to the fees paid for that project.
      </p>

      <h2>Law</h2>
      <p>
        These terms are governed by the laws of Zimbabwe, without stopping you from any consumer rights you have in
        your own country. Privacy and cookies are in separate policies on this site.
      </p>
    </LegalPage>
  );
}
