"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetBands, contactInterests } from "@/content/site";

export function MarketingContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="space-y-5 border border-border bg-white p-6 md:p-8"
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
            setStatus("Brief received. We will reply within one working day.");
            form.reset();
          } else {
            setError("Unable to send. Email info@tmctechsolutions.com directly.");
          }
        });
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Business</Label>
        <Input id="company" name="company" autoComplete="organization" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="interest">What do you need</Label>
          <select
            id="interest"
            name="interest"
            className="focus-ring h-11 w-full border border-border bg-white px-3 text-sm text-foreground"
            defaultValue="New website"
          >
            {contactInterests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget</Label>
          <select
            id="budget"
            name="budget"
            className="focus-ring h-11 w-full border border-border bg-white px-3 text-sm text-foreground"
            defaultValue="Not sure yet"
          >
            {budgetBands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Brief</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Live URL if you have one, what you sell, and how guests pay today."
        />
      </div>
      {status ? <p className="text-sm font-medium text-success">{status}</p> : null}
      {error ? <p className="text-sm font-medium text-error">{error}</p> : null}
      <Button type="submit" variant="cta" className="w-full sm:w-auto" disabled={isPending}>
        {isPending ? "Sending..." : "Send brief"}
      </Button>
    </form>
  );
}
