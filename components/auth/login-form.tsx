"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const next = useSearchParams().get("next") ?? "/portal/dashboard";
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
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                  setMessage("Sign in failed. Check your credentials.");
                  return;
                }
                window.location.assign(next);
              } catch (error) {
                setMessage(error instanceof Error ? error.message : "Authentication is not configured.");
              }
            });
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          {message ? <p className="text-sm text-error">{message}</p> : null}
          <Button className="w-full" variant="cta" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
          <p className="text-center text-sm text-muted">
            New customer? <Link href="/signup" className="font-semibold text-foreground">Create an account</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
