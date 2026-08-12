"use client";

import { Float } from "@/components/marketing/motion";

export function HeroVisual() {
  return (
    <Float className="relative mx-auto w-full max-w-lg">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6 shadow-[0_30px_80px_rgba(37,99,235,0.12)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.16),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(15,23,42,0.08),transparent_40%)]" />
        <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-4">
          <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm">
            <span className="font-medium text-foreground">AI Control Plane</span>
            <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">Live</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Agents", "12 active"],
              ["Automations", "48 flows"],
              ["Latency", "84 ms"],
              ["Accuracy", "98.2%"]
            ].map(([label, value]) => (
              <div key={label} className="glass rounded-2xl p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{label}</p>
                <p className="mt-2 font-heading text-2xl font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <p className="text-sm font-medium text-foreground">Model orchestration</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[80%] rounded-full bg-brand" />
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[60%] rounded-full bg-slate-800" />
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[66%] rounded-full bg-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Float>
  );
}
