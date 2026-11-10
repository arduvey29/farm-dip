import Link from "next/link";
import type { Metadata } from "next";
import { mainProduct } from "@/data/products";
import { getRatingSummary, reviews } from "@/data/reviews";
import { site } from "@/lib/site";
import { graph, itemListLd, pageMetadata, webPageLd } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { PourSection } from "@/components/home/PourSection";
import { SizeCard } from "@/components/product/SizeCard";
import { GheeJourney } from "@/components/story/GheeJourney";
import { GheeDrip } from "@/components/art/GheeDrip";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { GheeDropMark, SectionTitle } from "@/components/ui/Ornament";
import { Stars } from "@/components/ui/Stars";

const description =
  "Farm Dip pure desi ghee made from buffalo milk | Rich, creamy, 100% natural, with no preservatives or additives. 500 ml ₹1,350, 1 L ₹2,210, 5 L ₹9,900. Free cash on delivery across India.";

export const metadata: Metadata = {
  ...pageMetadata({ title: `${site.name} | Pure Desi Buffalo Ghee | 100% Natural, No Preservatives`, description, path: "/" }),
  title: { absolute: `${site.name} | Pure Desi Buffalo Ghee | 100% Natural, No Preservatives` },
};

// The numbers behind a jar, from the brand's own process.
const numbers = [
  { value: "12–14 L", label: "of buffalo milk go into every litre of ghee" },
  { value: "8–12 hrs", label: "for the milk to set into dahi before churning" },
  { value: "0", label: "preservatives, additives or colours" },
  { value: "12 months", label: "shelf life from the day it is packed" },
];

// The brand's four promises, in its own words.
const promises = ["Pure and 100% natural", "Rich in vitamins", "No preservatives or additives", "For everyday cooking and traditional recipes"];

export default function HomePage() {
  const product = mainProduct;
  const overall = getRatingSummary();
  const quotes = reviews.filter((r) => r.rating === 5).slice(0, 3);

  return (
    <>
      <Hero />

      {/* Molten-gold band. Its bottom edge drips into the next section as you scroll. */}
      <section aria-label="Farm Dip in numbers" className="relative bg-ghee-400 text-ink-950">
        <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-7 pt-10 pb-12 lg:grid-cols-4 lg:pt-14 lg:pb-16">
          {numbers.map((n) => (
            <div key={n.value} className="flex flex-col-reverse justify-end">
              <dd className="mt-1.5 max-w-[15rem] text-sm leading-snug text-ink-800 sm:text-[0.95rem]">{n.label}</dd>
              <dt className="font-display text-[2.4rem] leading-none tracking-tight sm:text-6xl">{n.value}</dt>
            </div>
          ))}
        </dl>
        <GheeDrip />
      </section>

      <section className="wrap pt-28 pb-14 lg:pt-36 lg:pb-20" aria-labelledby="sizes">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="sizes" title="One ghee, three sizes." lead="The bigger the pack, the less you pay per litre." />
          <Link href={`/products/${product.slug}`} className="link">
            Everything about this ghee
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Our promises">
          {promises.map((p) => (
            <li key={p} className="inline-flex items-center gap-2 rounded-full border border-line bg-milk px-3 py-1.5 text-xs font-medium text-ink-800 sm:px-4 sm:py-2 sm:text-sm">
              <GheeDropMark className="h-3.5 w-3 text-ghee-500" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {product.variants.map((v, i) => (
            <SizeCard key={v.id} product={product} variant={v} eager={i < 2} />
          ))}

          {/* 4th tile for phone to complete the 2x2 grid */}
          <div className="flex sm:hidden flex-col justify-between rounded-[1.25rem] border-2 border-dashed border-line bg-milk/80 p-3 shadow-xs text-center">
            <div className="my-auto py-2">
              <span className="mx-auto flex size-9 items-center justify-center rounded-xl bg-ghee-300/70 text-ink-950 mb-2 shadow-xs">
                <Icon name="whatsapp" className="size-5 text-pasture-900" />
              </span>
              <h3 className="font-display text-base font-bold text-ink-950 leading-tight">
                Need help choosing?
              </h3>
              <p className="mt-1 text-[0.72rem] text-ink-600 leading-snug">
                Ask us for family or gifting size recommendations.
              </p>
            </div>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink min-h-10 w-full py-2 text-xs font-bold"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <GheeJourney />

      <PourSection />

      <section className="bg-oat" aria-labelledby="reviews">
        <div className="wrap py-14 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionTitle id="reviews" title="What families say" size="md" />
            {overall.count ? (
              <p className="flex items-center gap-2 text-sm">
                <Stars rating={overall.average} className="size-4" />
                <span className="font-semibold">{overall.average.toFixed(1)} out of 5</span>
                <span className="text-ink-700">from {overall.count} reviews</span>
              </p>
            ) : null}
          </div>
          {/* A swipeable row on phones, three columns on wider screens. */}
          <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-10 sm:overflow-visible sm:px-0 sm:pb-0">
            {quotes.map((r) => (
              <li key={r.id} className="w-[80%] shrink-0 snap-start sm:w-auto">
                <figure className="flex h-full flex-col border-l-2 border-ghee-400 pl-4">
                  <Stars rating={r.rating} className="size-4" />
                  <blockquote className="mt-3 text-sm leading-relaxed text-ink-800 sm:text-base">
                    &ldquo;{r.body}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto pt-4 text-xs font-semibold text-ink-700">
                    {r.author}, {r.city}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing call to action: compact banner matching screenshot. */}
      <section className="bg-ghee-400 text-ink-950" aria-labelledby="bring-home">
        <div className="wrap flex flex-col items-start justify-between gap-5 py-8 sm:flex-row sm:items-center sm:py-9 lg:py-10">
          <div>
            <h2 id="bring-home" className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.5rem]">
              Bring home a jar.
            </h2>
            <p className="mt-1.5 text-sm text-ink-800 sm:text-base">
              500 ml, 1 L or a 5 L jar. Free cash on delivery across India.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-ink-950 px-6 py-2.5 text-sm font-bold text-cream shadow-sm transition-all hover:bg-ink-900 active:scale-95 sm:text-base"
            >
              Shop ghee
            </Link>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              className="inline-flex items-center justify-center rounded-full border border-ink-950 bg-transparent px-6 py-2.5 text-sm font-bold text-ink-950 transition-all hover:bg-ink-950/10 active:scale-95 sm:text-base"
              rel="noopener noreferrer"
              target="_blank"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        data={graph(
          webPageLd({
            path: "/",
            name: `${site.name}: Pure Desi Buffalo Ghee, No Preservatives`,
            description,
          }),
          itemListLd(
            "Pack sizes",
            "/",
            product.variants.map((v) => ({ name: `${product.name}, ${v.label}`, path: `/products/${product.slug}?pack=${v.id}`, image: v.image })),
          ),
        )}
      />
    </>
  );
}
