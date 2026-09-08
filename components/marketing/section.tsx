import { cn } from "@/lib/utils";
import { Container } from "@/components/marketing/container";

export function Section({
  children,
  className,
  muted = false,
  dark = false,
  id
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-20", muted && "section-muted", dark && "bg-navy text-white", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  light = false
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className={cn("mb-2 text-xs font-bold tracking-[0.16em] uppercase", light ? "text-white/60" : "text-brand")}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("text-2xl font-bold tracking-tight md:text-3xl", light ? "text-white" : "text-foreground")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-3 text-base leading-7", light ? "text-white/70" : "text-muted")}>{description}</p>
      ) : null}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-border bg-white pt-10 pb-12 md:pt-14 md:pb-16">
      <Container>
        <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{description}</p>
      </Container>
    </section>
  );
}
