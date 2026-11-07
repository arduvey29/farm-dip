import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { posts } from "@/data/posts";
import { faqGroups } from "@/data/faqs";
import { pageMetadata } from "@/lib/seo";
import { SearchClient, type SearchDoc } from "@/components/search/SearchClient";

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description: "Search our ghee, guides and answers.",
  path: "/search",
  noindex: true,
});

const docs: SearchDoc[] = [
  ...products.map((p) => ({
    type: "Product" as const,
    title: p.name,
    text: p.summary,
    href: `/products/${p.slug}`,
    terms: [p.name, p.tagline, p.summary, ...p.seo.keywords, ...p.variants.map((v) => v.label)].join(" ").toLowerCase(),
  })),
  ...posts.map((p) => ({
    type: "Guide" as const,
    title: p.title,
    text: p.description,
    href: `/blog/${p.slug}`,
    terms: [p.title, p.description, ...p.keywords].join(" ").toLowerCase(),
  })),
  ...faqGroups.flatMap((g) =>
    g.items.map((f) => ({
      type: "Question" as const,
      title: f.q,
      text: f.a,
      href: `/faq#${g.id}`,
      terms: `${f.q} ${f.a}`.toLowerCase(),
    })),
  ),
];

export default function SearchPage() {
  return (
    <section className="wrap py-10 lg:py-14">
      <h1 className="mb-8 font-display text-5xl">Search</h1>
      <Suspense fallback={<div className="min-h-14 max-w-2xl rounded-full border-2 border-kattha-200" />}>
        <SearchClient docs={docs} />
      </Suspense>
    </section>
  );
}
