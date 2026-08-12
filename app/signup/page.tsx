import { Suspense } from "react";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = { title: "Create Account" };

export default function SignupPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-secondary-background px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-center font-heading text-3xl font-bold">Create your hosting account</h1>
        <p className="mt-3 text-center text-sm text-muted">Order hosting, manage domains, email, SSL, invoices, backups, and support.</p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
