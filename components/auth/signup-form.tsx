"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <Card>
      <CardContent className="p-6">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            startTransition(async () => {
              try {
                const supabase = createClient();
                const email = String(formData.get("email"));
                const password = String(formData.get("password"));
                const fullName = String(formData.get("fullName"));
                const { error } = await supabase.auth.signUp({
                  email,
                  password,
                  options: {
                    data: { full_name: fullName },
                    emailRedirectTo: `${window.location.origin}/portal/dashboard`
                  }
                });
                setMessage(error ? "Could not create your account. Check the details and try again." : "Account created. Check your email to confirm your sign up.");
              } catch (error) {
                setMessage(error instanceof Error ? error.message : "Sign up is not configured.");
              }
            });
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" autoComplete="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required />
          </div>
          {message ? <p className="text-sm text-muted">{message}</p> : null}
          <Button className="w-full" variant="cta" disabled={isPending}>
            {isPending ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-center text-sm text-muted">
            Already have an account? <Link href="/login" className="font-semibold text-foreground">Sign in</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
