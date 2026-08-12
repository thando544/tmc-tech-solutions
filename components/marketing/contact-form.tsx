"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function MarketingContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="space-y-5 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setStatus(null);
        setError(null);
        const form = event.currentTarget;
        startTransition(async () => {
          const response = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { "Content-Type": "application/json" }
          });
          if (response.ok) {
            setStatus("Message received. We’ll get back to you soon.");
            form.reset();
          } else {
            setError("Unable to send message. Please email us directly.");
          }
        });
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-800">
            Name
          </Label>
          <Input id="name" name="name" autoComplete="name" required className="rounded-xl border-slate-200 bg-white text-foreground" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-800">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="rounded-xl border-slate-200 bg-white text-foreground"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-slate-800">
          How can we help?
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          className="rounded-xl border-slate-200 bg-white text-foreground"
          placeholder="Tell us about your project, product idea, or automation goals."
        />
      </div>
      {status ? <p className="text-sm font-medium text-success">{status}</p> : null}
      {error ? <p className="text-sm font-medium text-error">{error}</p> : null}
      <Button type="submit" className="w-full text-white sm:w-auto" disabled={isPending}>
        {isPending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
