import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { posts } from "@/data/posts";
import { policies } from "@/data/policies";
import { absoluteUrl } from "@/lib/seo";

const latest = (dates: string[]) => dates.sort().at(-1) ?? "2026-10-01";

export default function sitemap(): MetadataRoute.Sitemap {
  const catalogueUpdated = latest(products.map((p) => p.updatedAt));
  const blogUpdated = latest(posts.map((p) => p.dateModified));

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: catalogueUpdated, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/shop"), lastModified: catalogueUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/how-its-made"), lastModified: "2026-11-07", changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified: "2026-11-07", changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: blogUpdated, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/faq"), lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: "2026-10-01", changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/track-order"), lastModified: "2026-10-01", changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...staticPages,
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: p.images.map((i) => absoluteUrl(i.src)),
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: [absoluteUrl(p.cover)],
    })),
    ...policies.map((p) => ({
      url: absoluteUrl(`/policies/${p.slug}`),
      lastModified: p.updated,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
