import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <rect width="80" height="80" fill="#0066BA" />
      <path fill="#fff" d="M16 18h48v8H16V18Zm0 8h8v14h-8V26Zm20 0h8v36h-8V26Zm20 0h8v24h-8V26Z" />
    </svg>
  );
}
