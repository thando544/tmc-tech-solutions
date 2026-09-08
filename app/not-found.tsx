import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CTAButton } from "@/components/marketing/cta-button";
import { Container } from "@/components/marketing/container";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="border-b border-border">
        <Container className="py-24 md:py-32">
          <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">404</p>
          <h1 className="mt-3 text-4xl font-bold">This page is not on the site</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            The public site is Home, Services, Tourism, About, and Contact. If you were looking for a quote, that is
            still the right next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/">Home</CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Request a quote
            </CTAButton>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
