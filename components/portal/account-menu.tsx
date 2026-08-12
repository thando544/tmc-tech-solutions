"use client";

import Link from "next/link";
import { LogOut, Menu, UserCircle, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type AccountMenuProps = {
  mobile?: boolean;
};

export function AccountMenu({ mobile = false }: AccountMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (!confirmOpen) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isPending) {
        setConfirmOpen(false);
        previousActiveElement?.focus();
      }

      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>("[data-sign-out-dialog]");
        const focusable = dialog
          ? Array.from(dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(
              (element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden")
            )
          : [];

        if (!focusable.length) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [confirmOpen, isPending]);

  useEffect(() => {
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("tmc-auth") : null;
    channel?.addEventListener("message", (event) => {
      if (event.data === "signed-out" && pathname.startsWith("/portal")) {
        queryClient.clear();
        router.replace("/login");
        router.refresh();
      }
    });

    return () => channel?.close();
  }, [pathname, queryClient, router]);

  function signOut() {
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        setError(signOutError.message);
        return;
      }

      queryClient.clear();
      window.sessionStorage.clear();
      window.dispatchEvent(new Event("tmc-auth-signed-out"));

      if (typeof BroadcastChannel !== "undefined") {
        const channel = new BroadcastChannel("tmc-auth");
        channel.postMessage("signed-out");
        channel.close();
      }

      router.replace("/login");
      router.refresh();
    });
  }

  return (
    <div className={mobile ? "contents" : "relative"}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={mobile ? "mobile-account-menu" : "desktop-account-menu"}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-white text-sm font-medium text-muted transition hover:bg-secondary-background hover:text-foreground focus-ring",
          mobile ? "flex flex-col border-0 px-2 py-1 text-[11px]" : "px-3 py-2"
        )}
      >
        {mobile ? <Menu className="h-4 w-4" aria-hidden /> : <UserCircle className="h-4 w-4" aria-hidden />}
        Account
      </button>

      {open ? (
        mobile ? (
          <div className="fixed inset-0 z-40 lg:hidden" role="presentation">
            <button className="absolute inset-0 cursor-default bg-navy/30" aria-label="Close account menu" onClick={() => setOpen(false)} />
            <div
              id="mobile-account-menu"
              role="menu"
              aria-label="Account menu"
              className="absolute inset-x-0 bottom-0 rounded-t-lg border border-border bg-white p-4 shadow-2xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="font-heading text-sm font-semibold">Account</p>
                <button type="button" className="rounded-md p-2 text-muted hover:bg-secondary-background hover:text-foreground focus-ring" onClick={() => setOpen(false)} aria-label="Close account menu">
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <AccountMenuItems onClose={() => setOpen(false)} onConfirm={() => setConfirmOpen(true)} />
            </div>
          </div>
        ) : (
          <div
            id="desktop-account-menu"
            role="menu"
            aria-label="Account menu"
            className="absolute right-0 top-11 z-40 w-64 rounded-lg border border-border bg-white p-2 shadow-xl shadow-slate-200/70"
          >
            <AccountMenuItems onClose={() => setOpen(false)} onConfirm={() => setConfirmOpen(true)} />
          </div>
        )
      ) : null}

      {confirmOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/40 p-4" role="presentation">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="sign-out-title"
            aria-describedby="sign-out-description"
            data-sign-out-dialog
            className="w-full max-w-sm rounded-lg border border-border bg-white p-5 shadow-2xl"
          >
            <h2 id="sign-out-title" className="font-heading text-lg font-semibold">
              Are you sure you want to sign out?
            </h2>
            <p id="sign-out-description" className="mt-2 text-sm leading-6 text-muted">
              This will end your dashboard session on this browser and redirect you to the sign-in page.
            </p>
            {error ? <p className="mt-3 rounded-md border border-error/30 bg-error/10 p-3 text-sm text-error">{error}</p> : null}
            <div className="mt-5 flex justify-end gap-3">
              <Button ref={cancelRef} type="button" variant="secondary" disabled={isPending} onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" disabled={isPending} onClick={signOut}>
                <LogOut className="h-4 w-4" aria-hidden />
                {isPending ? "Signing out..." : "Sign out"}
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function AccountMenuItems({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="grid gap-1">
      <Link
        href="/portal/profile"
        role="menuitem"
        onClick={onClose}
        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-secondary-background hover:text-foreground focus-ring"
      >
        <UserCircle className="h-4 w-4" aria-hidden />
        Profile settings
      </Link>
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onClose();
          onConfirm();
        }}
        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-muted transition hover:bg-secondary-background hover:text-foreground focus-ring"
      >
        <LogOut className="h-4 w-4" aria-hidden />
        Sign out
      </button>
    </div>
  );
}
