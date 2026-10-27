import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { bestSellers, getProducts, lowestPrice, products } from "@/data/products";
import { collections } from "@/data/collections";
import { homeFaqs } from "@/data/faqs";
import { sortedPosts } from "@/data/posts";
import { getRatingSummary, reviews } from "@/data/reviews";
import { site } from "@/lib/site";
import { faqLd, graph, itemListLd, pageMetadata, webPageLd } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { Hero } from "@/components/home/Hero";
import { ProductCard } from "@/components/product/ProductCard";
import { BilonaJourney } from "@/components/story/BilonaJourney";
import { CompareTable } from "@/components/story/CompareTable";
import { LabTable } from "@/components/story/LabTable";
import { Faq } from "@/components/ui/Faq";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { DiyaIcon, Mandala, SectionTitle } from "@/components/ui/Ornament";
import { Stars } from "@/components/ui/Stars";
import { asset } from "@/lib/assets";

const description =
  "A2 bilona ghee from Gir and Sahiwal cows, churned from curd and slow-cooked on a wood fire. Lab report for every batch. 250 ml to 5 L. Free cash on delivery across India.";

export const metadata: Metadata = {
  ...pageMetadata({ title: `${site.name}: A2 Bilona Ghee from Gir Cows, Lab Tested`, description, path: "/" }),
  title: { absolute: `${site.name}: A2 Bilona Ghee from Gir Cows, Lab Tested` },
};

const promises: { icon: IconName; hindi: string; title: string; text: string }[] = [
  { icon: "leaf", hindi: "गिर गाय", title: "A2 milk from purebred Gir cows", text: "Grass-fed herds on partner farms in Gir, Gujarat" },
  { icon: "refresh", hindi: "दही से बिलोना", title: "Churned from curd, not cream", text: "About 28 to 30 litres of milk in every litre" },
  { icon: "flask", hindi: "लैब जाँच", title: "Lab report for every batch", text: `${site.stats.labParameters} tests at an independent lab` },
  { icon: "cash", hindi: "कैश ऑन डिलीवरी", title: "Free cash on delivery", text: `Free shipping above ₹${site.commerce.freeShippingThreshold}` },
];

const link = "font-semibold text-kumkum underline decoration-peetal decoration-2 underline-offset-[6px] hover:decoration-kumkum";

export default function HomePage() {
  const featured = getProducts(bestSellers);
  const overall = getRatingSummary();
  const quotes = reviews.filter((r) => r.rating === 5).slice(0, 3);
  const latest = sortedPosts.slice(0, 3);

  return (
    <>
      <Hero fromPrice={lowestPrice(products[0])} />

      <section aria-label="Our promises" className="bg-chandan">
        <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-8 py-10 lg:grid-cols-4">
          {promises.map((p) => (
            <li key={p.title} className="flex flex-col items-center text-center">
              <span className="grid size-16 place-items-center rounded-full border-2 border-peetal bg-paper text-kumkum outline-1 outline-offset-4 outline-peetal">
                <Icon name={p.icon} className="size-7" />
              </span>
              <p lang="hi" className="mt-4 font-hand text-lg text-kumkum">
                {p.hindi}
              </p>
              <p className="font-display text-lg leading-snug text-maroon-800">{p.title}</p>
              <p className="mt-0.5 max-w-[16rem] text-sm text-maroon-700">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap py-16 lg:py-24" aria-labelledby="bestsellers">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionTitle id="bestsellers" hindi="हमारा घी" title="Our ghee, in every size a family needs" />
            <p className="mt-4 text-maroon-700">Every pack shows its price per litre, so you can compare honestly.</p>
          </div>
          <Link href="/shop" className={link}>
            Shop all ghee
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} eager={i < 2} />
          ))}
        </div>
      </section>

      {/* Festive gifting, set like a Diwali card. */}
      <section className="wrap pb-16 lg:pb-24" aria-labelledby="gifting">
        <Link href="/products/festive-gift-box" className="frame-peetal group relative flex flex-col overflow-hidden rounded-2xl bg-maroon-900 text-chandan md:flex-row md:items-center">
          <Mandala className="pointer-events-none absolute -top-24 -right-24 size-80 opacity-30" />
          <div className="relative px-6 pt-8 md:w-72 md:shrink-0 md:p-6">
            <Image src={asset("/images/products/festive-gift-box/bundle.svg")} alt="" width={320} height={320} className="mx-auto w-56 rounded-xl md:w-full" />
          </div>
          <div className="relative flex-1 px-6 py-8 md:py-10 md:pr-10 md:pl-2">
            <p className="flex items-center gap-1" aria-hidden>
              <DiyaIcon className="size-8" />
              <DiyaIcon className="size-8" />
              <DiyaIcon className="size-8" />
            </p>
            <p lang="hi" className="mt-2 font-display text-3xl font-bold text-haldi-400 sm:text-4xl">
              शुभ दीपावली
            </p>
            <h2 id="gifting" className="mt-1 font-display text-2xl sm:text-3xl">
              Gift a jar of pure ghee this Diwali
            </h2>
            <p className="mt-2 max-w-xl text-maroon-100">500 ml Gir cow ghee, a sheesham spoon and your message handwritten on the card, in a block-print box. Bulk and corporate orders welcome.</p>
            <span className="mt-5 inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-bold text-maroon-950 group-hover:bg-haldi-400">See the gift box</span>
          </div>
        </Link>
      </section>

      <section className="wrap pb-16 lg:pb-24" aria-labelledby="collections">
        <SectionTitle id="collections" hindi="किस्म चुनें" title="Shop by kind" size="md" />
        <ul className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {collections.map((c) => (
            <li key={c.slug}>
              {/* A katori seen from above: round, brass-rimmed. */}
              <Link href={`/collections/${c.slug}`} className="group flex flex-col items-center text-center">
                <span className="rounded-full border-4 border-double border-peetal p-1.5">
                  <Image src={c.image} alt="" width={200} height={200} className="size-32 rounded-full bg-chandan object-cover sm:size-40" />
                </span>
                <span className="mt-3 font-display text-lg text-maroon-800 group-hover:text-kumkum">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="kairi-band" aria-hidden />
      <BilonaJourney />
      <div className="kairi-band" aria-hidden />

      <section className="wrap grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24" aria-labelledby="compare">
        <div>
          <SectionTitle id="compare" hindi="फ़र्क़ समझिए" title="How bilona ghee differs from cream ghee" />
          <p className="mt-5 text-lg text-maroon-800">
            Bilona ghee is made from curd churned out of whole milk. Cream ghee is boiled directly from cream separated by machine. The method changes how much milk goes in, how it tastes and what it costs.
          </p>
          <Link href="/blog/bilona-vs-cream-ghee" className={`mt-6 inline-block ${link}`}>
            Read the full comparison
          </Link>
        </div>
        <CompareTable />
      </section>

      <section className="bg-chandan py-16 lg:py-24" aria-labelledby="lab">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionTitle id="lab" hindi="शुद्धता की जाँच" title="Every jar has a batch number. Every batch has a lab report." />
            <p className="mt-5 text-lg text-maroon-800">
              Before a batch is packed, a sample goes to an independent NABL-accredited lab. It is tested against FSSAI limits for moisture, freshness and adulteration with vanaspati or vegetable fat. Only batches that pass are jarred.
            </p>
            <Link href="/lab-reports" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-maroon-900 px-6 font-semibold text-chandan hover:bg-maroon-800">
              Look up your batch
            </Link>
          </div>
          <LabTable limit={5} />
        </div>
      </section>

      <section className="wrap py-16 lg:py-24" aria-labelledby="reviews">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="reviews" hindi="परिवारों की राय" title="What families say" />
          {overall.count ? (
            <p className="flex items-center gap-2">
              <Stars rating={overall.average} className="size-5" />
              <span className="font-semibold">{overall.average.toFixed(1)} out of 5</span>
              <span className="text-maroon-700">from {overall.count} verified reviews</span>
            </p>
          ) : null}
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((r) => (
            <li key={r.id} className="frame-peetal relative rounded-2xl bg-paper p-7 pt-10">
              <span className="absolute -top-6 left-6 font-display text-7xl leading-none text-haldi-500" aria-hidden>
                “
              </span>
              <figure>
                <blockquote>
                  <p className="font-display text-2xl leading-snug text-maroon-800">{r.title}</p>
                  <p className="mt-3 text-maroon-800">{r.body}</p>
                </blockquote>
                <figcaption className="mt-5 text-sm text-maroon-700">
                  <span className="font-semibold text-maroon-900">{r.author}</span>, {r.city}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y-4 border-double border-peetal bg-maroon-50 py-16 lg:py-24" aria-labelledby="learn">
        <div className="wrap">
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
                  <p className="mt-4 font-hand text-kumkum">{post.category}</p>
                  <h3 className="mt-1 font-display text-xl leading-snug text-maroon-800">
                    <Link href={`/blog/${post.slug}`} className="underline-offset-4 group-hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-maroon-700">{post.description}</p>
                  <p className="mt-2 text-sm text-maroon-700">
                    Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24" aria-labelledby="faq">
        <div>
          <SectionTitle id="faq" hindi="सवाल-जवाब" title="Questions, answered" />
          <p className="mt-5 text-maroon-800">
            Something else on your mind? Read{" "}
            <Link href="/faq" className="font-semibold text-kumkum underline underline-offset-4">
              all questions
            </Link>{" "}
            or{" "}
            <a href={`https://wa.me/${site.contact.whatsapp}`} className="font-semibold text-kumkum underline underline-offset-4" rel="noopener">
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
        <Faq items={homeFaqs} />
      </section>

      <JsonLd
        data={graph(
          webPageLd({ path: "/", name: `${site.name}: A2 Bilona Ghee from Gir Cows`, description }),
          itemListLd(
            "Best-selling ghee",
            "/",
            featured.map((p) => ({ name: p.name, path: `/products/${p.slug}`, image: p.images[0].src })),
          ),
          faqLd(homeFaqs),
        )}
      />
    </>
  );
}
