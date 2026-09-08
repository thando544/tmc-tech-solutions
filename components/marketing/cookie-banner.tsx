"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tmc-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setVisible(!saved);
  }, []);

  function choose() {
    window.localStorage.setItem(STORAGE_KEY, "essential");
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 p-4 backdrop-blur-md md:p-5">
      <div className="container-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          We use essential cookies to run this site and remember this choice. There are no advertising cookies. Read
          the{" "}
          <Link href="/cookies" className="text-foreground underline underline-offset-4">
            cookie policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-foreground underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="focus-ring h-10 bg-brand px-4 text-sm text-white hover:bg-brand-strong"
            onClick={() => choose()}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
