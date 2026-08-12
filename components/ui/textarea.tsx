import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "focus-ring min-h-32 w-full rounded-md border border-border bg-white px-3 py-3 text-sm text-foreground placeholder:text-muted",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
