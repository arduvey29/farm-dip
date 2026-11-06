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
  "Bring home the goodness of tradition with Farm Dip Pure Desi Ghee. Made from pure buffalo milk, 100% natural, rich in vitamins, no preservatives or additives. Free cash on delivery across India.";

export const metadata: Metadata = {
  ...pageMetadata({ title: `${site.name} – Pure Desi Ghee | 100% Natural Buffalo Milk Ghee`, description, path: "/" }),
  title: { absolute: `${site.name} – Pure Desi Ghee | 100% Natural Buffalo Milk Ghee` },
};

const promises: { icon: IconName; hindi: string; title: string; text: string }[] = [
  {
    icon: "leaf",
    hindi: "प्राकृतिक व शुद्ध",
    title: "Pure and 100% natural",
    text: "Simple goodness of nature in every spoonful",
  },
  {
    icon: "flask",
    hindi: "विटामिन से भरपूर",
    title: "Rich in vitamins",
    text: "Naturally wholesome and nourishing for your family",
  },
  {
    icon: "shield",
    hindi: "शून्य मिलावट",
    title: "No preservatives or additives",
    text: "Zero chemicals, artificial colours, or fillers",
  },
  {
    icon: "check",
    hindi: "रोज़ाना का स्वाद",
    title: "Everyday cooking & recipes",
    text: "Authentic taste and rich aroma for every meal",
  },
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

      {/* 4 Key Pillars provided by client */}
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

      {/* Featured Products */}
      <section className="wrap py-16 lg:py-24" aria-labelledby="bestsellers">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionTitle id="bestsellers" hindi="हमारा घी" title="Farm Dip Pure Desi Ghee" />
            <p className="mt-4 text-maroon-700">
              Made from pure buffalo milk, our ghee offers a rich, creamy texture and delicious flavour that makes every meal special.
            </p>
          </div>
          <Link href="/shop" className={link}>
            Shop all sizes
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} eager={i < 2} />
          ))}
        </div>
      </section>

      {/* OUR AIM SECTION */}
      <section className="wrap pb-16 lg:pb-24" aria-labelledby="our-aim">
        <div className="frame-peetal relative overflow-hidden rounded-3xl bg-maroon-900 px-6 py-12 text-center text-chandan sm:px-12 sm:py-16">
          <Mandala className="pointer-events-none absolute -top-24 -left-24 size-80 opacity-20" />
          <Mandala className="pointer-events-none absolute -bottom-24 -right-24 size-80 opacity-20" />
          <p lang="hi" className="font-hand text-xl text-haldi-400 sm:text-2xl">
            हमारा उद्देश्य
          </p>
          <h2 id="our-aim" className="mt-2 font-display text-3xl font-bold tracking-tight text-haldi-300 sm:text-4xl">
            Our Aim
          </h2>
          <blockquote className="mx-auto mt-4 max-w-2xl text-lg font-serif italic leading-relaxed text-maroon-100 sm:text-2xl">
            “We make ghee the way we ate it in our childhood: pure, simple, rich and full of goodness. Our aim is to bring that same purity and health to every family’s kitchen.”
          </blockquote>
          <p className="mt-5 text-xs font-semibold tracking-wider text-haldi-400 uppercase sm:text-sm">
            — Farm Dip Pure Desi Ghee
          </p>
        </div>
      </section>

      {/* Festive gifting / 500 ml jar */}
      <section className="wrap pb-16 lg:pb-24" aria-labelledby="gifting">
        <Link href="/products/pure-desi-buffalo-ghee-500ml" className="frame-peetal group relative flex flex-col overflow-hidden rounded-2xl bg-maroon-900 text-chandan md:flex-row md:items-center">
          <Mandala className="pointer-events-none absolute -top-24 -right-24 size-80 opacity-30" />
          <div className="relative px-6 pt-8 md:w-72 md:shrink-0 md:p-6">
            <Image src={asset("/images/products/desi-buffalo-bilona-ghee/jar.svg")} alt="500 ml Farm Dip Pure Desi Ghee" width={320} height={320} className="mx-auto w-56 rounded-xl md:w-full" />
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
              Bring home the goodness of tradition this festive season
            </h2>
            <p className="mt-2 max-w-xl text-maroon-100">
              Made from pure buffalo milk with no preservatives or additives. Farm Dip brings you the simple goodness of nature in every spoonful.
            </p>
            <span className="mt-5 inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-bold text-maroon-950 group-hover:bg-haldi-400">
              Shop 500 ml jar · ₹1,350
            </span>
          </div>
        </Link>
      </section>

      <section className="wrap pb-16 lg:pb-24" aria-labelledby="collections">
        <SectionTitle id="collections" hindi="किस्म चुनें" title="Shop by kind" size="md" />
        <ul className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {collections.map((c) => (
            <li key={c.slug}>
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
          <SectionTitle id="compare" hindi="फ़र्क़ समझिए" title="How traditional desi ghee differs from industrial ghee" />
          <p className="mt-5 text-lg text-maroon-800">
            Farm Dip is crafted with care from whole pure milk. Industrial ghee is boiled rapidly with artificial additives and preservatives. Our ghee retains all natural vitamins, creamy texture, and nostalgic childhood aroma.
          </p>
          <Link href="/about" className={`mt-6 inline-block ${link}`}>
            Learn more about our aim
          </Link>
        </div>
        <CompareTable />
      </section>

      <section className="bg-chandan py-16 lg:py-24" aria-labelledby="lab">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionTitle id="lab" hindi="शुद्धता की जाँच" title="100% pure and natural. Every batch tested." />
            <p className="mt-5 text-lg text-maroon-800">
              Before each batch is sealed, samples are tested at an independent NABL-accredited lab against FSSAI purity limits for moisture, zero adulteration, and freshness.
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
                <figcaption className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-maroon-700">
                  <span>
                    <strong>{r.author}</strong>, {r.city}
                  </span>
                  <span>{r.pack ?? "Verified"}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-chandan py-16 lg:py-24" aria-labelledby="faqs">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle id="faqs" hindi="अक्सर पूछे जाने वाले सवाल" title="Questions about Farm Dip Pure Desi Ghee" />
            <p className="mt-4 text-maroon-700">
              Have questions about our milk source, storage, or delivery? Everything you need to know about our purity and craft.
            </p>
            <Link href="/faq" className={`mt-6 inline-block ${link}`}>
              All questions and answers
            </Link>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      <section className="wrap py-16 lg:py-24" aria-labelledby="guides">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="guides" hindi="घी के बारे में सीखें" title="Guides from our kitchen" />
          <Link href="/blog" className={link}>
            Read all guides
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <li key={post.slug} className="group flex flex-col">
              <Link href={`/blog/${post.slug}`} className="frame-peetal overflow-hidden rounded-2xl bg-chandan">
                <Image
                  src={post.cover}
                  alt=""
                  width={640}
                  height={360}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-1 flex-col pt-4">
                <p className="text-xs font-semibold text-kumkum uppercase">{post.category}</p>
                <h3 className="mt-1 font-display text-xl leading-snug">
                  <Link href={`/blog/${post.slug}`} className="underline-offset-4 group-hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-maroon-700">{post.description}</p>
                <p className="mt-auto pt-3 text-xs text-maroon-700">{formatDate(post.datePublished)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={graph(
          webPageLd({ path: "/", name: `${site.name} – Pure Desi Ghee`, description }),
          itemListLd(
            "Farm Dip Pure Desi Ghee",
            "/",
            featured.map((p) => ({ name: p.name, path: `/products/${p.slug}`, image: p.images[0].src })),
          ),
          faqLd(homeFaqs),
        )}
      />
    </>
  );
}
