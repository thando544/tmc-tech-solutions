import type { MetadataRoute } from "next";
import { getSiteUrl, PUBLIC_PATHS } from "@/lib/agent/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const lastModified = new Date();

  return PUBLIC_PATHS.filter((path) => path !== "/auth.md").map((path) => ({
    url: `${site}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8
  }));
}
