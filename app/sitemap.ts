import type { MetadataRoute } from "next";
import { primaryNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { getProjectSlugs } from "@/data/projects";

/**
 * Generated from the same data the pages render from, so a new project
 * appears in the sitemap without a second edit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = primaryNav.map((item) => ({
    url: `${profile.siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const projectRoutes = getProjectSlugs().map((slug) => ({
    url: `${profile.siteUrl}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
