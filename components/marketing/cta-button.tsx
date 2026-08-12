import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-sm shadow-blue-600/25 hover:bg-brand-strong hover:shadow-md hover:shadow-blue-600/30",
  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:border-brand hover:text-brand-strong",
  ghost: "text-slate-800 hover:bg-secondary-background hover:text-foreground",
  onDark:
    "border border-white/20 bg-brand text-white shadow-lg shadow-blue-950/40 hover:bg-brand-strong hover:border-white/30"
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  size = "md"
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200",
        size === "sm" && "h-9 px-3.5 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
