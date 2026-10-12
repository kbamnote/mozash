import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { sports } from "@/data/sports";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-12");

  const staticRoutes = [
    "",
    "/shop",
    "/racquet-finder",
    "/stringing",
    "/deals",
    "/guides",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const sportRoutes = sports.flatMap((s) =>
    ["", "/racquets", "/shoes", "/bags", "/strings"].map((sub) => ({
      url: `${site.url}/${s.id}${sub}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const productRoutes = products.map((p) => ({
    url: `${site.url}/${p.sport}/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...sportRoutes, ...productRoutes];
}
