import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { graph, ids, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { Icon } from "@/components/ui/Icon";
import { Mandala } from "@/components/ui/Ornament";
import { asset } from "@/lib/assets";

const title = `About ${site.name}: Pure Desi Ghee`;
const description = `Bring home the goodness of tradition with Farm Dip Pure Desi Ghee. Made from pure buffalo milk with rich creamy texture and no preservatives. Learn about our aim and tradition.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" });

const facts = [
  { label: "Product", value: "Pure Desi Ghee" },
  { label: "Milk source", value: "Pure buffalo milk" },
  { label: "Purity", value: "100% natural" },
  { label: "Additives", value: "None (zero chemicals)" },
  { label: "Shelf life", value: "12 months" },
  { label: "Sizes", value: "500 ml, 1 L, 5 L" },
];

const highlights = [
  {
    title: "Pure and 100% natural",
    text: "Crafted with utmost care, bringing you the simple goodness of nature in every spoonful.",
    icon: "leaf" as const,
  },
  {
    title: "Rich in vitamins",
    text: "Naturally wholesome and packed with essential fat-soluble vitamins (A, D, E, K).",
    icon: "flask" as const,
  },
  {
    title: "No preservatives or additives",
    text: "Zero chemicals, artificial colours, or fillers. Just authentic, wholesome ghee.",
    icon: "shield" as const,
  },
  {
    title: "Perfect for everyday cooking & traditional recipes",
    text: "Rich creamy texture and heavenly aroma that elevate tadka, rotis, curries, and festive sweets.",
    icon: "check" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "About us", path: "/about" }]} />
      </div>

      <section className="wrap grid gap-10 pt-8 pb-16 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p lang="hi" className="font-hand text-2xl text-kumkum">
            परंपरा और शुद्धता
          </p>
          <h1 className="mt-2 font-display text-5xl leading-[1.05] sm:text-6xl">
            Farm Dip – Pure Desi Ghee
          </h1>
          <p className="mt-4 text-xl text-maroon-800">
            Bring home the goodness of tradition with Farm Dip Pure Desi Ghee, crafted with care to bring authentic taste and rich aroma to your everyday meals.
          </p>
          <div className="mt-6">
            <QuickAnswer label={`What makes ${site.name} special?`}>
              Made from pure buffalo milk, our ghee offers a rich, creamy texture and delicious flavour that makes every meal special. With no preservatives or additives, Farm Dip brings you the simple goodness of nature in every spoonful.
            </QuickAnswer>
          </div>
        </div>
        <Image
          src={asset("/images/farm/traditional-pasture.svg")}
          alt="Traditional rural landscape and pasture"
          width={1600}
          height={1000}
          preload
          className="w-full rounded-[2.5rem]"
        />
      </section>

      {/* OUR AIM SECTION */}
      <section className="wrap pb-16">
        <div className="frame-peetal relative overflow-hidden rounded-3xl bg-maroon-900 px-6 py-12 text-center text-chandan sm:px-12 sm:py-16">
          <Mandala className="pointer-events-none absolute -top-24 -left-24 size-80 opacity-20" />
          <Mandala className="pointer-events-none absolute -bottom-24 -right-24 size-80 opacity-20" />
          <p lang="hi" className="font-hand text-xl text-haldi-400 sm:text-2xl">
            हमारा लक्ष्य
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-haldi-300 sm:text-5xl">
            OUR AIM
          </h2>
          <blockquote className="mx-auto mt-5 max-w-3xl text-xl font-serif italic leading-relaxed text-maroon-100 sm:text-2xl">
            “We make ghee the way we ate it in our childhood: pure, simple, rich and full of goodness. Our aim is to bring that same purity and health to every family’s kitchen.”
          </blockquote>
          <p className="mt-6 text-sm font-semibold tracking-wider text-haldi-400 uppercase">
            — The Farm Dip Promise
          </p>
        </div>
      </section>

      {/* 4 HIGHLIGHTS GRID */}
      <section className="border-t border-line bg-chandan py-16" aria-label="Our core qualities">
        <div className="wrap">
          <h2 className="text-center font-display text-3xl sm:text-4xl">Why Choose Farm Dip</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-maroon-700">
            Crafted with traditional care to deliver wholesome purity in every jar.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.title} className="frame-peetal flex flex-col rounded-2xl bg-paper p-6 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full border-2 border-peetal bg-chandan text-kumkum">
                  <Icon name={h.icon} className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-maroon-900">{h.title}</h3>
                <p className="mt-2 text-sm text-maroon-700">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACTS STRIP */}
      <section className="border-y border-line bg-paper py-12" aria-label="Facts at a glance">
        <dl className="wrap grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-sm text-maroon-700">{f.label}</dt>
              <dd className="mt-1 text-lg font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* STORY & PROMISE */}
      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="prose-ghee">
          <h2 style={{ marginTop: 0 }}>The Goodness of Tradition</h2>
          <p>
            In our childhood, ghee wasn't just another cooking fat. It was an emotion—the unmistakable, mouth-watering aroma of tadka drifting from the kitchen, the golden dollop melting over hot rotis, and the pure warmth of sweets made during celebrations.
          </p>
          <p>
            Today, supermarket shelves are flooded with commercially processed, chemically refined fats stripped of their natural nutrients and aroma. We started <strong>Farm Dip</strong> with one clear mission: to bring that authentic, childhood purity back to your family's table.
          </p>
          <h2>Pure Buffalo Milk Ghee</h2>
          <p>
            Our ghee is made exclusively from pure, rich buffalo milk. Buffalo milk is naturally richer in milk solids, healthy fats, and fat-soluble vitamins, lending our ghee its signature grainy (danedar) texture, creamy mouthfeel, and rich, irresistible flavour.
          </p>
          <h2>Our Promise to Your Family</h2>
          <ul>
            <li>✨ <strong>Pure and 100% natural</strong>: zero adulteration or shortcuts.</li>
            <li>✨ <strong>Rich in vitamins</strong>: nourishing goodness in every spoonful.</li>
            <li>✨ <strong>No preservatives or additives</strong>: no artificial colours, flavours or stabilizers.</li>
            <li>✨ <strong>Perfect for everyday cooking</strong>: ideal for rotis, tadka, sweets, and traditional recipes.</li>
          </ul>
        </div>
        <div className="space-y-6">
          <Image src={asset("/images/farm/bilona-churning.svg")} alt="Traditional churning of ghee" width={1600} height={1000} className="w-full rounded-3xl" />
          <Image src={asset("/images/farm/wood-fire-kadhai.svg")} alt="Slow cooking ghee to golden perfection" width={1600} height={1000} className="w-full rounded-3xl" />
        </div>
      </section>

      <section className="bg-maroon-900 py-16 text-chandan">
        <div className="wrap flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-chandan sm:text-4xl">Taste the purity for yourself</h2>
            <p className="mt-2 text-maroon-100">Available in 500 ml, 1 L, and 5 L packs with free COD across India.</p>
          </div>
          <Link href="/shop" className="inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-semibold text-maroon-950 hover:bg-haldi-400">
            Shop Pure Desi Ghee
          </Link>
        </div>
      </section>

      <JsonLd
        data={graph({
          ...webPageLd({ path: "/about", name: title, description, type: "AboutPage" }),
          about: { "@id": ids.organization },
          mainEntity: { "@id": ids.organization },
        })}
      />
    </>
  );
}
