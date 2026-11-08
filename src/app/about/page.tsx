import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { mainProduct } from "@/data/products";
import { site } from "@/lib/site";
import { asset } from "@/lib/assets";
import { graph, ids, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { LogoMark } from "@/components/layout/Logo";

const title = `Our Story: ${site.name}, Ghee the Way We Ate It as Children`;
const description = `${site.name} makes pure desi ghee from buffalo milk, with no preservatives or additives. ${site.aim}`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" });

const facts = [
  { label: "Our ghee", value: "Pure desi ghee" },
  { label: "Made from", value: "Buffalo milk" },
  { label: "Preservatives", value: "None" },
  { label: "Additives", value: "None" },
  { label: "Packs", value: mainProduct.variants.map((v) => v.label).join(", ") },
  { label: "Based in", value: `${site.address.locality}, ${site.address.region}` },
];

export default function AboutPage() {
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Our story", path: "/about" }]} />
      </div>

      <section className="wrap grid gap-10 pt-8 pb-16 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Ghee the way we ate it as children</h1>
          <div className="mt-6 max-w-2xl">
            <QuickAnswer label={`Who is ${site.name}?`}>
              {site.name} makes pure desi ghee from buffalo milk, with no preservatives or additives. {site.aim}
            </QuickAnswer>
          </div>
        </div>
        <LogoMark className="mx-auto h-72 w-auto lg:h-80" />
      </section>

      <section className="border-y border-line bg-oat py-12" aria-label="Facts about us">
        <dl className="wrap grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-sm text-ink-700">{f.label}</dt>
              <dd className="mt-1 text-lg font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* PLACEHOLDER copy, written from the brand's own description. Replace with the founders' real story. */}
      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="prose-ghee">
          <h2 style={{ marginTop: 0 }}>Why we started</h2>
          <p>
            Many of us grew up with a matka of homemade ghee in the kitchen: white, thick buffalo ghee, made slowly at home from full-fat milk. It went on hot rotis, into dal, and into every halwa and ladoo.
          </p>
          <p>
            That ghee was pure, simple and rich, and it is getting harder to find. {site.name} exists to bring it back: ghee made the way we ate it in our childhood, from pure buffalo milk, with nothing added.
          </p>
          <h2>What goes into our ghee</h2>
          <p>Pure buffalo milk. That is the whole list. It is turned into ghee the bilona way, slowly: set into dahi, churned, washed and clarified, so it keeps its authentic taste and rich aroma.</p>
          <h2>What we will never add</h2>
          <ul>
            <li>Preservatives</li>
            <li>Additives or flavours</li>
            <li>Colour</li>
            <li>Vanaspati, vegetable oil or any other fat</li>
          </ul>
        </div>
        <div className="space-y-6">
          <Image src={asset("/images/farm/buffaloes-at-the-farm.svg")} alt="Buffaloes at the farm" width={1600} height={1000} preload className="w-full rounded-[2rem]" />
          <Image src={asset("/images/farm/makkhan-churning.svg")} alt="Dahi being churned with a wooden madhani" width={1600} height={1000} className="w-full rounded-[2rem]" />
        </div>
      </section>

      <section className="bg-pasture-950 py-16 text-cream">
        <div className="wrap flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-cream sm:text-4xl">See how a jar is made, step by step</h2>
            <p className="mt-2 text-pasture-100">Eight steps, from buffalo milk to a strained jar.</p>
          </div>
          <Link href="/how-its-made" className="btn btn-ink">
            See how it is made
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
