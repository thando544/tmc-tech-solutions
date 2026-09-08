import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  hover = false,
  id,
  featured = false
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
  featured?: boolean;
}) {
  return (
    <div
      id={id}
      className={cn(
        "border border-border bg-white p-6",
        featured && "border-brand",
        hover && "transition hover:border-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}
