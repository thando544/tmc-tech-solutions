import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/marketing/container";
import { clients } from "@/content/site";

export function ClientsSection() {
  return (
    <section className="border-b border-border bg-white">
      <Container className="py-16 md:py-24">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Work</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Operators we have built for</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Live sites. Click through to the work.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {clients.map((client) => (
            <li key={client.href}>
              <a
                href={client.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col border border-border bg-white transition hover:border-foreground"
              >
                <div className="flex min-h-[220px] items-center justify-center bg-black px-10 py-12 md:min-h-[260px]">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={client.width}
                    height={client.height}
                    className="h-auto w-full max-w-[280px] object-contain"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-border p-5">
                  <div>
                    <p className="font-bold">{client.name}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{client.summary}</p>
                    <p className="mt-2 text-sm font-medium text-brand">
                      {client.href.replace(/^https:\/\/(www\.)?/, "")}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition group-hover:text-foreground" aria-hidden />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
