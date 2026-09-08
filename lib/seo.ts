import type { Metadata } from "next";
import { company } from "@/content/site";
import { getSiteUrl } from "@/lib/agent/site";

const image = {
  url: "/images/victoria-falls-hero.jpg",
  width: 1600,
  height: 900,
  alt: "Victoria Falls, Zimbabwe"
};

export function pageMeta({
  title,
  description,
  path,
  index = true,
  canonicalPath
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  canonicalPath?: string;
}): Metadata {
  const site = getSiteUrl();
  const canonical = `${site}${canonicalPath ?? (path === "/" ? "" : path)}`;
  const socialTitle = path === "/" ? `${company.name} | ${title}` : `${title} | ${company.name}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: company.name,
      type: "website",
      locale: "en_GB",
      images: [image]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url]
    }
  };
}
