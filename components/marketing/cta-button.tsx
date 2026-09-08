import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onPhoto" | "onPhotoGhost";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-strong",
  secondary: "border border-foreground bg-white text-foreground hover:bg-secondary-background",
  ghost: "text-foreground hover:bg-secondary-background",
  onDark: "bg-brand text-white hover:bg-brand-strong",
  onPhoto: "bg-brand text-white hover:bg-brand-strong",
  onPhotoGhost: "border border-white text-white hover:bg-white hover:text-foreground"
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
        "focus-ring inline-flex items-center justify-center gap-2 font-semibold transition duration-150",
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
