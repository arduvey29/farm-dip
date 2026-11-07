import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { mainProduct } from "@/data/products";
import { homeFaqs } from "@/data/faqs";
import { sortedPosts } from "@/data/posts";
import { getRatingSummary, reviews } from "@/data/reviews";
import { site } from "@/lib/site";
import { faqLd, graph, itemListLd, pageMetadata, webPageLd } from "@/lib/seo";
import { formatDate, formatPrice, pricePerLitre } from "@/lib/format";
import { Hero } from "@/components/home/Hero";
import { SizeCard } from "@/components/product/SizeCard";
import { GheeJourney } from "@/components/story/GheeJourney";
import { CompareTable } from "@/components/story/CompareTable";
import { LogoMark } from "@/components/layout/Logo";
import { Faq } from "@/components/ui/Faq";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { DiyaIcon, Mandala, SectionTitle } from "@/components/ui/Ornament";
import { Stars } from "@/components/ui/Stars";

const description =
  "Farm Dip pure desi ghee, made from buffalo milk. Rich, creamy, 100% natural, with no preservatives or additives. 500 ml, 1 L and 5 L. Free cash on delivery across India.";

export const metadata: Metadata = {
  ...pageMetadata({ title: `${site.name}: Pure Desi Buffalo Ghee, No Preservatives`, description, path: "/" }),
  title: { absolute: `${site.name}: Pure Desi Buffalo Ghee, No Preservatives` },
};

// The brand's four promises, in its own words.
const promises: { icon: IconName; hindi: string; title: string; text: string }[] = [
  { icon: "leaf", hindi: "शुद्ध", title: "Pure and 100% natural", text: "Made from pure buffalo milk" },
  { icon: "shield", hindi: "बिना मिलावट", title: "No preservatives or additives", text: "Just ghee, nothing else" },
  { icon: "check", hindi: "पोषण", title: "Rich in vitamins", text: "Ghee naturally carries vitamins A, D, E and K" },
  { icon: "refresh", hindi: "रोज़ की रसोई", title: "For everyday cooking", text: "And all your traditional recipes" },
];

const link = "font-semibold text-rani underline decoration-peetal decoration-2 underline-offset-[6px] hover:decoration-rani";

export default function HomePage() {
  const product = mainProduct;
  const overall = getRatingSummary();
  const quotes = reviews.filter((r) => r.rating === 5).slice(0, 3);
  const latest = sortedPosts.slice(0, 3);
  const big = product.variants.find((v) => v.id === "5-l") ?? product.variants[product.variants.length - 1];

  return (
    <>
      <Hero />

      <section aria-label="Our promises" className="bg-chandan">
        <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-8 py-10 lg:grid-cols-4">
          {promises.map((p) => (
            <li key={p.title} className="flex flex-col items-center text-center">
              <span className="grid size-16 place-items-center rounded-full border-2 border-peetal bg-malai text-rani outline-1 outline-offset-4 outline-peetal">
                <Icon name={p.icon} className="size-7" />
              </span>
              <p lang="hi" className="mt-4 font-hand text-lg text-rani">
                {p.hindi}
              </p>
              <p className="font-display text-lg leading-snug text-kattha-800">{p.title}</p>
              <p className="mt-0.5 max-w-[16rem] text-sm text-kattha-700">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap py-16 lg:py-24" aria-labelledby="sizes">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionTitle id="sizes" hindi="अपना डिब्बा चुनें" title="One pure ghee, in three sizes" />
            <p className="mt-4 text-kattha-700">The bigger the pack, the less you pay per litre.</p>
          </div>
          <Link href={`/products/${product.slug}`} className={link}>
            See everything about this ghee
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-3">
          {product.variants.map((v, i) => (
            <SizeCard key={v.id} product={product} variant={v} eager={i < 2} />
          ))}
        </div>
      </section>

      {/* The brand's aim, in its own words, beside the badge. */}
      <section className="border-y-4 border-double border-peetal bg-kattha-50" aria-labelledby="aim">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[auto_1fr] lg:py-20">
          <LogoMark className="mx-auto h-56 w-auto md:h-64" />
          <figure>
            <p lang="hi" className="font-hand text-2xl text-rani">
              हमारा उद्देश्य
            </p>
            <h2 id="aim" className="mt-1 font-display text-3xl leading-snug text-kattha-800 sm:text-4xl">
              <span lang="hi">जैसा बचपन में खाया, वैसा ही घी</span>
            </h2>
            <blockquote className="mt-4 max-w-2xl text-xl leading-relaxed text-kattha-800">
              <p>{site.aim}</p>
            </blockquote>
            <figcaption className="mt-3 text-sm text-kattha-700">The {site.name} family</figcaption>
          </figure>
        </div>
      </section>

      {/* Festive stock-up, set like a Diwali card. Shown while site.festive is set. */}
      {site.festive ? (
      <section className="wrap py-16 lg:py-24" aria-labelledby="festive">
        <Link
          href={`/products/${product.slug}?pack=${big.id}`}
          className="frame-peetal group relative flex flex-col overflow-hidden rounded-2xl bg-lal-900 text-chandan md:flex-row md:items-center"
        >
          <Mandala className="pointer-events-none absolute -top-24 -right-24 size-80 opacity-30" />
          <div className="relative px-6 pt-8 md:w-72 md:shrink-0 md:p-6">
            <Image src={big.image} alt="" width={320} height={320} className="mx-auto w-56 rounded-xl md:w-full" />
          </div>
          <div className="relative flex-1 px-6 py-8 md:py-10 md:pr-10 md:pl-2">
            <p className="flex items-center gap-1" aria-hidden>
              <DiyaIcon className="size-8" />
              <DiyaIcon className="size-8" />
              <DiyaIcon className="size-8" />
            </p>
            <p lang="hi" className="mt-2 font-display text-3xl text-haldi-400 sm:text-4xl">
              शुभ दीपावली
            </p>
            <h2 id="festive" className="mt-1 font-display text-2xl sm:text-3xl">
              Ladoo, halwa and diyas: stock up for the festive kitchen
            </h2>
            <p className="mt-2 max-w-xl text-lal-100">
              The {big.label} pack works out to {formatPrice(pricePerLitre(big.price, big.volumeMl))} per litre, the best price we offer.
            </p>
            <span className="mt-5 inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-bold text-kattha-950 group-hover:bg-haldi-400">
              Shop the {big.label} pack
            </span>
          </div>
        </Link>
      </section>
      ) : (
        <div className="pb-16 lg:pb-24" />
      )}

      <div className="phulkari-band" aria-hidden />
      <GheeJourney />
      <div className="phulkari-band" aria-hidden />

      <section className="wrap grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24" aria-labelledby="compare">
        <div>
          <SectionTitle id="compare" hindi="भैंस का घी क्यों" title="Why buffalo ghee?" />
          <p className="mt-5 text-lg text-kattha-800">
            Buffalo milk has roughly twice the fat of cow milk and almost no beta-carotene. That is why buffalo ghee is creamy white, thick and rich, and why so many family recipes for halwa and mithai call for it.
          </p>
          <Link href="/blog/buffalo-ghee-vs-cow-ghee" className={`mt-6 inline-block ${link}`}>
            Read: buffalo ghee vs cow ghee
          </Link>
        </div>
        <CompareTable />
      </section>

      <section className="bg-chandan py-16 lg:py-24" aria-labelledby="reviews">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle id="reviews" hindi="परिवारों की राय" title="What families say" />
            {overall.count ? (
              <p className="flex items-center gap-2">
                <Stars rating={overall.average} className="size-5" />
                <span className="font-semibold">{overall.average.toFixed(1)} out of 5</span>
                <span className="text-kattha-700">from {overall.count} reviews</span>
              </p>
            ) : null}
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {quotes.map((r) => (
              <li key={r.id} className="frame-peetal relative rounded-2xl bg-malai p-7 pt-10">
                <span className="absolute -top-6 left-6 font-display text-7xl leading-none text-haldi-500" aria-hidden>
                  “
                </span>
                <figure>
                  <blockquote>
                    <p className="font-display text-2xl leading-snug text-kattha-800">{r.title}</p>
                    <p className="mt-3 text-kattha-800">{r.body}</p>
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-kattha-700">
                    <span className="font-semibold text-kattha-900">{r.author}</span>, {r.city}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-16 lg:py-24" aria-labelledby="learn">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="learn" hindi="घी का ज्ञान" title="Know your ghee" />
          <Link href="/blog" className={link}>
            All guides
          </Link>
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {latest.map((post) => (
            <li key={post.slug}>
              <article className="group">
                <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden className="frame-peetal block overflow-hidden rounded-xl">
                  <Image src={post.cover} alt="" width={1200} height={630} className="aspect-[1200/630] w-full object-cover" />
                </Link>
                <p className="mt-4 font-hand text-rani">{post.category}</p>
                <h3 className="mt-1 font-display text-xl leading-snug text-kattha-800">
                  <Link href={`/blog/${post.slug}`} className="underline-offset-4 group-hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-kattha-700">{post.description}</p>
                <p className="mt-2 text-sm text-kattha-700">
                  Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t-4 border-double border-peetal bg-kattha-50 py-16 lg:py-24" aria-labelledby="faq">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle id="faq" hindi="सवाल-जवाब" title="Questions, answered" />
            <p className="mt-5 text-kattha-800">
              Something else on your mind? Read{" "}
              <Link href="/faq" className="font-semibold text-rani underline underline-offset-4">
                all questions
              </Link>{" "}
              or{" "}
              <a href={`https://wa.me/${site.contact.whatsapp}`} className="font-semibold text-rani underline underline-offset-4" rel="noopener">
                message us on WhatsApp
              </a>
              .
            </p>
          </div>
          <Faq items={homeFaqs} />
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
