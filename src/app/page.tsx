import Link from "next/link";
import type { Metadata } from "next";
import { mainProduct } from "@/data/products";
import { getRatingSummary, reviews } from "@/data/reviews";
import { site } from "@/lib/site";
import { graph, itemListLd, pageMetadata, webPageLd } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { SizeCard } from "@/components/product/SizeCard";
import { GheeJourney } from "@/components/story/GheeJourney";
import { GheeDrip } from "@/components/art/GheeDrip";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/Ornament";
import { HomeReviews } from "@/components/home/HomeReviews";

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

export default function HomePage() {
  const product = mainProduct;
  const overall = getRatingSummary();
  const quotes = reviews.filter((r) => r.rating === 5).slice(0, 3);

  return (
    <>
      <section
        className="wrap flex flex-col justify-center min-h-[calc(100svh-6.25rem)] lg:min-h-[calc(100vh-6.75rem)] py-2 sm:py-3 lg:py-5"
        aria-labelledby="sizes"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3 sm:gap-6">
          <SectionTitle
            id="sizes"
            font="deva"
            title={
              <>
                <span className="text-ghee-400">One ghee</span>, three sizes.
              </>
            }
            lead="The bigger the pack, the less you pay per litre."
            titleClassName="text-2xl sm:text-3xl lg:text-[2.65rem] xl:text-5xl"
            leadClassName="mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-base text-ink-700"
          />
          <Link href={`/products/${product.slug}`} className="link text-xs sm:text-sm font-semibold whitespace-nowrap">
            Everything about this ghee
          </Link>
        </div>
        <div className="mt-2.5 sm:mt-4 lg:mt-5 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3 lg:gap-6 items-stretch">
          {product.variants.map((v, i) => (
            <SizeCard
              key={v.id}
              product={product}
              variant={v}
              eager={i < 2}
              compact
              imageClassName="h-24 xs:h-28 sm:h-36 md:h-40 lg:h-44 xl:h-52 object-contain p-2"
            />
          ))}

          {/* 4th tile for phone to complete the 2x2 grid */}
          <div className="flex sm:hidden flex-col justify-between rounded-[1.25rem] border-2 border-dashed border-line bg-milk/80 p-2 shadow-xs text-center">
            <div className="my-auto py-1">
              <span className="mx-auto flex size-7 items-center justify-center rounded-lg bg-ghee-300/70 text-ink-950 mb-1 shadow-xs">
                <Icon name="whatsapp" className="size-4 text-pasture-900" />
              </span>
              <h3 className="font-display text-xs font-bold text-ink-950 leading-tight">
                Need help choosing?
              </h3>
              <p className="mt-0.5 text-[0.65rem] text-ink-600 leading-snug">
                Ask us for family recommendations.
              </p>
            </div>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink min-h-8 w-full py-1 text-xs font-bold mt-1.5"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

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

      <Hero showVideo />

      <GheeJourney />

      <HomeReviews quotes={quotes} overall={overall} />

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
            name: `${site.name} | Pure Desi Buffalo Ghee | 100% Natural, No Preservatives`,
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
