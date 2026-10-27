import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { collections, getCollection } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { faqLd, graph, itemListLd, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { ProductCard } from "@/components/product/ProductCard";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return pageMetadata({ title: collection.seo.title, description: collection.seo.description, path: `/collections/${slug}` });
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const items = getProductsByCollection(slug);
  const others = collections.filter((c) => c.slug !== slug);

  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs
          items={[
            { name: "Shop", path: "/shop" },
            { name: collection.name, path: `/collections/${slug}` },
          ]}
        />
      </div>

      <section className="wrap pt-8 pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl">{collection.h1}</h1>
          <QuickAnswer label={`What is ${collection.name.toLowerCase()}?`}>{collection.intro}</QuickAnswer>
        </div>

        <p className="mt-10 text-sm text-maroon-700">
          {items.length} {items.length === 1 ? "product" : "products"}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} headingLevel={2} eager={i < 4} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-chandan py-16">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div className="prose-ghee">
            {collection.body.map((b, i) => (
              <div key={b.heading}>
                <h2 style={i === 0 ? { marginTop: 0 } : undefined}>{b.heading}</h2>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="mb-4 font-display text-3xl">Questions</h2>
            <Faq items={collection.faqs} />
          </div>
        </div>
      </section>

      <nav aria-label="Other collections" className="wrap py-12">
        <h2 className="font-semibold">Explore more</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link href={`/collections/${c.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-maroon-200 px-4 font-medium hover:border-maroon-900 hover:bg-chandan">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <JsonLd
        data={graph(
          webPageLd({ path: `/collections/${slug}`, name: collection.h1, description: collection.seo.description, type: "CollectionPage" }),
          itemListLd(
            collection.name,
            `/collections/${slug}`,
            items.map((p) => ({ name: p.name, path: `/products/${p.slug}`, image: p.images[0].src })),
          ),
          faqLd(collection.faqs),
        )}
      />
    </>
  );
}
