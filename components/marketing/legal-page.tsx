import { Container } from "@/components/marketing/container";

export function LegalPage({
  title,
  updated,
  children
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-white pt-12 pb-20 md:pt-16 md:pb-28">
      <Container>
        <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">Legal</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated {updated}</p>
        <div className="mt-12 max-w-3xl space-y-8 text-base leading-8 text-muted [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
          {children}
        </div>
      </Container>
    </article>
  );
}
