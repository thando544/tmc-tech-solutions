import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export const metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-secondary-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-center font-heading text-3xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-3 text-center text-sm text-muted">Access your TMC Tech Solutions account and portal.</p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
