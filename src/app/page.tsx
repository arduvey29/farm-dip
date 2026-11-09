import Link from "next/link";
import type { Metadata } from "next";
import { mainProduct } from "@/data/products";
import { homeFaqs } from "@/data/faqs";
import { getRatingSummary, reviews } from "@/data/reviews";
import { site } from "@/lib/site";
import { faqLd, graph, itemListLd, pageMetadata, webPageLd } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { PourSection } from "@/components/home/PourSection";
import { SizeCard } from "@/components/product/SizeCard";
import { GheeJourney } from "@/components/story/GheeJourney";
import { CompareTable } from "@/components/story/CompareTable";
import { GheeDrip } from "@/components/art/GheeDrip";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { GheeDropMark, SectionTitle } from "@/components/ui/Ornament";
import { Stars } from "@/components/ui/Stars";
import { TestReport } from "@/components/ui/TestReport";

const description =
  "Farm Dip pure desi ghee, made from buffalo milk. Rich, creamy, 100% natural, with no preservatives or additives. 500 ml, 1 L and 5 L. Free cash on delivery across India.";

export const metadata: Metadata = {
  ...pageMetadata({ title: `${site.name}: Pure Desi Buffalo Ghee, No Preservatives`, description, path: "/" }),
  title: { absolute: `${site.name}: Pure Desi Buffalo Ghee, No Preservatives` },
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
  // Four questions on the home page; the rest live on /faq.
  const faqs = homeFaqs.slice(0, 4);

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
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {product.variants.map((v, i) => (
            <SizeCard key={v.id} product={product} variant={v} eager={i < 2} />
          ))}
          <TestReport layout="tile" />
        </div>
      </section>

      <GheeJourney />

      <PourSection />

      <section className="bg-oat" aria-labelledby="compare">
        <div className="wrap grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:py-20">
          <div>
            <SectionTitle id="compare" title="Why buffalo ghee?" size="md" />
            <p className="mt-4 text-ink-800 sm:text-lg">
              Buffalo milk has roughly twice the fat of cow milk and almost no beta-carotene. That is why buffalo ghee is creamy white, thick and rich, and why so many family recipes for halwa and mithai call for it.
            </p>
            <Link href="/blog/buffalo-ghee-vs-cow-ghee" className="link mt-6 inline-block">
              Buffalo ghee vs cow ghee, in full
            </Link>
          </div>
          <CompareTable />
        </div>
      </section>

      <section className="wrap py-14 lg:py-20" aria-labelledby="reviews">
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
                <Stars rating={r.rating} className="size-3.5" />
                <blockquote className="mt-2">
                  <p className="font-display text-lg leading-snug text-ink-900">{r.title}</p>
                  <p className="mt-1.5 line-clamp-4 text-sm text-ink-700">{r.body}</p>
                </blockquote>
                <figcaption className="mt-auto pt-3 text-xs text-ink-500">
                  <span className="font-semibold text-ink-800">{r.author}</span>, {r.city}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-oat" aria-labelledby="faq">
        <div className="wrap grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:py-20">
          <div>
            <SectionTitle id="faq" title="Questions, answered" size="md" />
            <p className="mt-4 text-ink-800">
              Something else on your mind? Read{" "}
              <Link href="/faq" className="link">
                all questions
              </Link>{" "}
              or{" "}
              <a href={`https://wa.me/${site.contact.whatsapp}`} className="link" rel="noopener">
                message us on WhatsApp
              </a>
              .
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      {/* Closing call to action on a band of ghee. */}
      <section className="bg-ghee-400 text-ink-950" aria-labelledby="bring-home">
        <div className="wrap flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between lg:py-16">
          <div>
            <h2 id="bring-home" className="font-display text-4xl leading-[1.04] sm:text-5xl">
              Bring home a jar.
            </h2>
            <p className="mt-3 max-w-lg text-lg text-ink-800">500 ml, 1 L or a 5 L steel dolchi. Free cash on delivery across India.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/products/${product.slug}`} className="btn btn-ink text-lg">
              Shop ghee
            </Link>
            <a href={`https://wa.me/${site.contact.whatsapp}`} className="btn btn-line text-ink-950" rel="noopener">
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        data={graph(
          webPageLd({ path: "/", name: `${site.name}: Pure Desi Buffalo Ghee`, description }),
          itemListLd(
            "Farm Dip ghee pack sizes",
            "/",
            product.variants.map((v) => ({ name: `${product.name}, ${v.label}`, path: `/products/${product.slug}?pack=${v.id}`, image: v.image })),
          ),
          faqLd(faqs),
        )}
      />
    </>
  );
}
