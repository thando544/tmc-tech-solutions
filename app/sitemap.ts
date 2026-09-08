import type { MetadataRoute } from "next";
import { getSiteUrl, PUBLIC_PATHS } from "@/lib/agent/site";

const ranking: Record<string, { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> =
  {
    "/": { changeFrequency: "weekly", priority: 1 },
    "/services": { changeFrequency: "monthly", priority: 0.9 },
    "/tourism": { changeFrequency: "monthly", priority: 0.8 },
    "/book": { changeFrequency: "monthly", priority: 0.8 },
    "/contact": { changeFrequency: "monthly", priority: 0.8 },
    "/about": { changeFrequency: "yearly", priority: 0.6 },
    "/privacy": { changeFrequency: "yearly", priority: 0.3 },
    "/cookies": { changeFrequency: "yearly", priority: 0.3 },
    "/terms": { changeFrequency: "yearly", priority: 0.3 },
    "/docs/api": { changeFrequency: "yearly", priority: 0.2 }
  };

const INDEXABLE = PUBLIC_PATHS.filter((path) => path !== "/auth.md");

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();

  return INDEXABLE.map((path) => {
    const rank = ranking[path] ?? { changeFrequency: "monthly" as const, priority: 0.5 };
    return {
      url: `${site}${path === "/" ? "" : path}`,
      changeFrequency: rank.changeFrequency,
      priority: rank.priority
    };
  });
}
