import { whyChooseUs } from "@/lib/catalog";

export function ServiceGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {whyChooseUs.map((service) => {
        const Icon = service.icon;
        return (
          <article key={service.title} className="rounded-lg border border-border bg-white p-6">
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-md bg-green-50 text-brand">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="font-heading text-lg font-semibold">{service.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{service.text}</p>
          </article>
        );
      })}
    </div>
  );
}
