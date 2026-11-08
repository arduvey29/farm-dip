import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { mainProduct } from "@/data/products";
import { homeFaqs } from "@/data/faqs";
import { sortedPosts } from "@/data/posts";
import { getRatingSummary, reviews } from "@/data/reviews";
import { site } from "@/lib/site";
import { faqLd, graph, itemListLd, pageMetadata, webPageLd } from "@/lib/seo";
import { formatDate } from "@/lib/format";
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
  const latest = sortedPosts.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Molten-gold band. Its bottom edge drips into the next section as you scroll. */}
      <section aria-label="Farm Dip in numbers" className="relative bg-ghee-400 text-ink-950">
        <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-10 pt-14 pb-16 lg:grid-cols-4 lg:pt-16 lg:pb-20">
          {numbers.map((n) => (
            <div key={n.value} className="flex flex-col-reverse justify-end">
              <dd className="mt-2 max-w-[15rem] text-[0.95rem] leading-snug text-ink-800">{n.label}</dd>
              <dt className="font-display text-5xl leading-none tracking-tight sm:text-6xl">{n.value}</dt>
            </div>
          ))}
        </dl>
        <GheeDrip />
      </section>

      <section className="wrap pt-36 pb-20 lg:pt-44 lg:pb-28" aria-labelledby="sizes">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="sizes" title="One ghee, three sizes." lead="The bigger the pack, the less you pay per litre." />
          <Link href={`/products/${product.slug}`} className="link">
            Everything about this ghee
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Our promises">
          {promises.map((p) => (
            <li key={p} className="inline-flex items-center gap-2 rounded-full border border-line bg-milk px-4 py-2 text-sm font-medium text-ink-800">
              <GheeDropMark className="h-3.5 w-3 text-ghee-500" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {product.variants.map((v, i) => (
            <SizeCard key={v.id} product={product} variant={v} eager={i < 2} />
          ))}
        </div>
      </section>

      <GheeJourney />

      <PourSection />

      <section className="bg-oat" aria-labelledby="compare">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div>
            <SectionTitle id="compare" title="Why buffalo ghee?" size="md" />
            <p className="mt-5 text-lg text-ink-800">
              Buffalo milk has roughly twice the fat of cow milk and almost no beta-carotene. That is why buffalo ghee is creamy white, thick and rich, and why so many family recipes for halwa and mithai call for it.
            </p>
            <Link href="/blog/buffalo-ghee-vs-cow-ghee" className="link mt-6 inline-block">
              Buffalo ghee vs cow ghee, in full
            </Link>
          </div>
          <CompareTable />
        </div>
      </section>

      <section className="wrap py-20 lg:py-28" aria-labelledby="reviews">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="reviews" title="What families say" size="md" />
          {overall.count ? (
            <p className="flex items-center gap-2">
              <Stars rating={overall.average} className="size-5" />
              <span className="font-semibold">{overall.average.toFixed(1)} out of 5</span>
              <span className="text-ink-700">from {overall.count} reviews</span>
            </p>
          ) : null}
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((r) => (
            <li key={r.id} className="flex rounded-[1.75rem] bg-milk p-7 shadow-[0_1px_0_var(--color-line),0_18px_40px_-28px_rgb(35_27_30/0.35)]">
              <figure className="flex flex-col">
                <Stars rating={r.rating} className="size-4" />
                <blockquote className="mt-4">
                  <p className="font-display text-2xl leading-snug text-ink-900">{r.title}</p>
                  <p className="mt-3 text-ink-700">{r.body}</p>
                </blockquote>
                <figcaption className="mt-auto pt-6 text-sm text-ink-700">
                  <span className="font-semibold text-ink-900">{r.author}</span>, {r.city}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line" aria-labelledby="learn">
        <div className="wrap py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle id="learn" title="Know your ghee" size="md" />
            <Link href="/blog" className="link">
              All guides
            </Link>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {latest.map((post) => (
              <li key={post.slug}>
                <article className="group">
                  <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden className="block overflow-hidden rounded-[1.5rem]">
                    <Image src={post.cover} alt="" width={1200} height={630} className="aspect-[1200/630] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </Link>
                  <p className="mt-4 text-sm font-medium text-ghee-700">{post.category}</p>
                  <h3 className="mt-1 font-display text-2xl leading-snug text-ink-900">
                    <Link href={`/blog/${post.slug}`} className="underline-offset-4 group-hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-ink-700">{post.description}</p>
                  <p className="mt-2 text-sm text-ink-500">
                    Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-oat" aria-labelledby="faq">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div>
            <SectionTitle id="faq" title="Questions, answered" size="md" />
            <p className="mt-5 text-ink-800">
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
          <Faq items={homeFaqs} />
        </div>
      </section>

      {/* Closing call to action on a band of ghee. */}
      <section className="bg-ghee-400 text-ink-950" aria-labelledby="bring-home">
        <div className="wrap flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between lg:py-20">
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
          faqLd(homeFaqs),
        )}
      />
    </>
  );
}
