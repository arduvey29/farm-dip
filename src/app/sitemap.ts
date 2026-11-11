import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { posts } from "@/data/posts";
import { policies } from "@/data/policies";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = "2026-11-11";

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: absoluteUrl("/shop"), lastModified: currentDate, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/lab-reports"), lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/how-its-made"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: currentDate, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/faq"), lastModified: currentDate, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/track-order"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.4 },
  ];

  return [
    ...staticPages,
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
      images: p.images.map((i) => absoluteUrl(i.src)),
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.dateModified || currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [absoluteUrl(p.cover)],
    })),
    ...policies.map((p) => ({
      url: absoluteUrl(`/policies/${p.slug}`),
      lastModified: p.updated || currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
