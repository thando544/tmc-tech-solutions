import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className="mt-2 font-heading text-3xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
