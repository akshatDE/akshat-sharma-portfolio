import type { Metadata } from "next";
import { profile } from "@/data/profile";

/**
 * Per-page metadata built from one place, so titles, canonical URLs and social
 * cards cannot drift apart across routes.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  tags,
}: {
  title: string;
  description: string;
  /** Route path beginning with "/". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: readonly string[];
}): Metadata {
  const url = `${profile.siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${profile.name}`,
      description,
      url,
      siteName: `${profile.name} — ${profile.role}`,
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags ? { tags: [...tags] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.name}`,
      description,
    },
  };
}
