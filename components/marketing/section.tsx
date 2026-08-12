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
      className={cn(
        "py-20 md:py-28",
        muted && "section-muted",
        dark && "bg-navy text-white",
        className
      )}
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
    <div className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-[0.14em] uppercase",
            light ? "text-blue-300" : "text-brand"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("font-heading text-3xl font-semibold tracking-tight md:text-4xl", light ? "text-white" : "text-foreground")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-7 md:text-lg", light ? "text-slate-300" : "text-muted")}>{description}</p>
      ) : null}
    </div>
  );
}
