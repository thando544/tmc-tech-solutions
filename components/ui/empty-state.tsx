import { ServerOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="rounded-md border border-border bg-secondary-background p-3 text-muted">
          <ServerOff className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h3 className="font-heading text-base font-semibold">{title}</h3>
          <p className="mt-1 max-w-md text-sm text-muted">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
