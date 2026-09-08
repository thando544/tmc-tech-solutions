import Link from "next/link";
import { LogoMark } from "@/components/layout/logo-mark";
import { cn } from "@/lib/utils";

export function Logo({
  onDark = false,
  compact = false
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="TMC Tech Solutions home">
      <LogoMark className={cn("h-9 w-9 md:h-10 md:w-10", compact && "h-8 w-8 md:h-9 md:w-9")} />
      <span className="hidden leading-none sm:block">
        <span
          className={cn(
            "block font-logo text-[15px] font-bold tracking-[0.04em]",
            onDark ? "text-white" : "text-foreground"
          )}
        >
          TMC
        </span>
        <span
          className={cn(
            "mt-1 block font-logo text-[10px] font-semibold tracking-[0.14em]",
            onDark ? "text-white/70" : "text-brand"
          )}
        >
          Tech Solutions
        </span>
      </span>
    </Link>
  );
}
