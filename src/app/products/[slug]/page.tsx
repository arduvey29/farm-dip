import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getProducts, gheeNutrition, products } from "@/data/products";
import { getRatingSummary, getReviews } from "@/data/reviews";
import { faqLd, graph, pageMetadata, productLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { RatingInline } from "@/components/ui/Stars";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ReviewSection } from "@/components/product/ReviewSection";
import { ProductCard } from "@/components/product/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({ title: product.seo.title, description: product.seo.description, path: `/products/${product.slug}`, keywords: product.seo.keywords, ownOgImage: true });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const reviews = getReviews(product.slug);
  const rating = getRatingSummary(product.slug);
  const related = getProducts(product.related);

  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs
          items={[
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/products/${product.slug}` },
          ]}
        />
      </div>

      <section className="wrap grid gap-8 pt-6 pb-14 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div>
          {product.badge ? <p className="mb-3 inline-block bg-spice py-1 pr-5 pl-3 text-xs font-bold text-oat [clip-path:polygon(0_0,100%_0,calc(100%-8px)_50%,100%_100%,0_100%)]">{product.badge}</p> : null}
          <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-lg text-ink-800">{product.tagline}</p>
          <div className="mt-3">
            <RatingInline average={rating.average} count={rating.count} href="#reviews" />
          </div>
          <p className="mt-5 max-w-prose text-ink-800">{product.summary}</p>
          <div className="mt-7">
            <PurchasePanel slug={product.slug} name={product.name} variants={product.variants} defaultVariant={product.defaultVariant} milk={product.milk} />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-oat py-14" aria-labelledby="glance">
        <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 id="glance" className="font-display text-3xl sm:text-4xl">
              At a glance
            </h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {product.facts.map((f) => (
                <div key={f.label} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-semibold">{f.label}</dt>
                  <dd className="text-ink-800">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Why families choose it</h2>
            <ul className="mt-6 space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <Icon name="check" className="mt-1 size-5 shrink-0 text-pasture-600" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="prose-ghee">
          <h2 style={{ marginTop: 0 }}>About this ghee</h2>
          {product.description.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <h3>How to use it</h3>
          <ul>
            {product.uses.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <h3>Ingredients</h3>
          <p>{product.ingredients}</p>
          <h3>Storage and shelf life</h3>
          <p>
            {product.storage} Shelf life: {product.shelfLife}.
          </p>
        </div>

        <aside className="space-y-8">
          <div className="rounded-3xl border border-line p-6">
            <h2 className="text-xl font-semibold">Nutrition per 100 g</h2>
            <p className="text-sm text-ink-700">Typical values for pure ghee</p>
            <table className="table-ghee mt-4">
              <caption className="sr-only">Nutrition information per 100 grams</caption>
              <tbody>
                {gheeNutrition.map((n) => (
                  <tr key={n.label}>
                    <th scope="row" className="!font-normal">
                      {n.label}
                    </th>
                    <td className="text-right font-semibold">{n.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figure className="rounded-[1.75rem] bg-pasture-950 p-7 text-cream">
            <p className="font-display text-2xl leading-snug">Pure, simple, rich and full of goodness.</p>
            <blockquote className="mt-3 text-pasture-100">
              <p>{site.aim}</p>
            </blockquote>
            <figcaption className="mt-3 text-sm text-pasture-200">The {site.name} family</figcaption>
          </figure>
          <Link href="/how-its-made" className="flex gap-4 rounded-[1.75rem] border border-line p-6 hover:bg-oat">
            <Icon name="leaf" className="size-8 shrink-0 text-pasture-600" />
            <span>
              <span className="block text-lg font-semibold">See how it is made</span>
              <span className="text-ink-700">Eight steps, from full-fat buffalo milk to a strained jar, with nothing added.</span>
            </span>
          </Link>
        </aside>
      </section>

      <section className="wrap grid gap-10 pb-16 lg:grid-cols-[0.8fr_1.2fr]" aria-labelledby="pdp-faq">
        <h2 id="pdp-faq" className="font-display text-3xl sm:text-4xl">
          Questions about {product.shortName}
        </h2>
        <Faq items={product.faqs} />
      </section>

      <section id="reviews" className="scroll-mt-24 border-t border-line py-16" aria-labelledby="reviews-title">
        <div className="wrap">
          <h2 id="reviews-title" className="mb-10 font-display text-3xl sm:text-4xl">
            Customer reviews
          </h2>
          <ReviewSection reviews={reviews} summary={rating} />
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-line bg-ink-50 py-16" aria-labelledby="related">
          <div className="wrap">
            <h2 id="related" className="font-display text-3xl sm:text-4xl">
              You may also like
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <JsonLd data={graph(productLd(product, reviews, rating), faqLd(product.faqs))} />
    </>
  );
}
