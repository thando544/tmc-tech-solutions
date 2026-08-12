import { hostingPackages, type HostingPlan } from "@/lib/catalog";

const rows = [
  ["Websites", "websites"],
  ["Storage", "storage"],
  ["Bandwidth", "bandwidth"],
  ["Email accounts", "email"],
  ["Databases", "databases"],
  ["SSL", "ssl"],
  ["Backups", "backups"],
  ["Performance", "performance"],
  ["Support", "support"]
] as const;

export function ComparisonTable({ plans = hostingPackages }: { plans?: HostingPlan[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-white">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead className="bg-secondary-background text-left">
          <tr>
            <th className="border-b border-border p-4 font-semibold">Feature</th>
            {plans.map((plan) => (
              <th key={plan.name} className="border-b border-border p-4 font-semibold">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, key]) => (
            <tr key={label}>
              <td className="border-b border-border p-4 font-medium">{label}</td>
              {plans.map((plan) => (
                <td key={plan.name} className="border-b border-border p-4 text-muted">
                  {plan[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
