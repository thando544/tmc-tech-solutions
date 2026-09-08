"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { CTAButton } from "@/components/marketing/cta-button";
import { Container } from "@/components/marketing/container";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
      <Container className="flex h-[4.25rem] items-center justify-between gap-6 md:h-[4.75rem]">
        <Logo />
        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] font-medium tracking-[0.01em] transition",
                  active ? "text-brand" : "text-foreground hover:text-brand"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <CTAButton href="/contact" size="sm">
            Request a quote
          </CTAButton>
        </div>
        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center border border-border bg-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>
      {open ? (
        <div className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary-background"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-border pt-4">
              <CTAButton href="/contact" className="w-full">
                Request a quote
              </CTAButton>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
