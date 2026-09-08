import { Logo } from "@/components/layout/logo";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";
import Link from "next/link";

export const metadata = {
  title: "Staff sign in",
  robots: { index: false, follow: false }
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-4 py-12">
      <div className="w-full max-w-md border border-border p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-2xl font-bold">Staff sign in</h1>
        <p className="mt-3 text-center text-sm text-muted">
          This is for the TMC team. If you want a website or a system built, send a brief — you do not need an account.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/contact" className="font-semibold text-brand">
            Request a quote
          </Link>
          <span className="text-muted"> · </span>
          <Link href="/" className="text-muted hover:text-foreground">
            Back to the site
          </Link>
        </p>
      </div>
    </main>
  );
}
