export function PageHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-heading text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
}
