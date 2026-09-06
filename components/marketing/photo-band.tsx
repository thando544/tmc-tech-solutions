import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/marketing/container";

export function PhotoHero({
  src,
  alt,
  children
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden pb-16 pt-28 md:min-h-screen md:items-center md:pb-24 md:pt-32">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 bg-navy/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/25 to-navy/20" />
      <Container className="relative z-10 w-full">{children}</Container>
    </section>
  );
}

export function PhotoBand({
  src,
  alt,
  children,
  id,
  className
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative isolate overflow-hidden py-20 md:py-28", className)}>
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-navy/70" />
      <Container className="relative z-10">{children}</Container>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <PhotoHero src="/images/victoria-falls-gorge.jpg" alt="Victoria Falls gorge and walking path, Zimbabwe">
      <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-white/70 uppercase">{eyebrow}</p>
      <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{description}</p>
    </PhotoHero>
  );
}
