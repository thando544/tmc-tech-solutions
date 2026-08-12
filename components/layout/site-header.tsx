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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition duration-300",
        scrolled || open ? "border-b border-border bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition",
                  active ? "text-brand" : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="text-sm font-semibold text-slate-700 transition hover:text-foreground">
            Sign in
          </Link>
          <CTAButton href="/contact" size="sm">
            Talk to us
          </CTAButton>
        </div>
        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white lg:hidden"
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
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary-background"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <Link href="/login" className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-800">
                Sign in
              </Link>
              <CTAButton href="/contact" className="w-full">
                Talk to us
              </CTAButton>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
