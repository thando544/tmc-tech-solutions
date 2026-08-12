import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  hover = true,
  id
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        hover && "transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}
