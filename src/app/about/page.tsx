import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { graph, ids, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { asset } from "@/lib/assets";

const title = `About ${site.name}: Gir Cow Farms and Bilona Ghee Makers`;
const description = `${site.name} makes A2 bilona ghee with ${site.stats.partnerFarms} partner farming families around Talala in Gujarat's Gir region. Meet the cows, the farmers and the method.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" });

const facts = [
  { label: "Founded", value: String(site.foundingYear) },
  { label: "Based in", value: `${site.address.locality}, ${site.address.region}` },
  { label: "Partner farms", value: `${site.stats.partnerFarms} families` },
  { label: "Cow breeds", value: "Gir and Sahiwal" },
  { label: "Method", value: "Bilona, from curd" },
  { label: "Lab tests per batch", value: String(site.stats.labParameters) },
];

export default function AboutPage() {
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Our farms", path: "/about" }]} />
      </div>

      <section className="wrap grid gap-10 pt-8 pb-16 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl">Ghee the way Gir farmers have always made it</h1>
          <div className="mt-6">
            <QuickAnswer label={`Who is ${site.name}?`}>
              {site.name} is a ghee maker based in {site.address.locality}, Gujarat. We work with {site.stats.partnerFarms} farming families who raise Gir and Sahiwal cows, and make A2 ghee by the bilona method in small batches. Every batch is tested in an independent lab.
            </QuickAnswer>
          </div>
        </div>
        <Image src={asset("/images/farm/gir-cows-pasture.svg")} alt="Gir cows grazing on pasture near Talala at dawn" width={1600} height={1000} preload className="w-full rounded-[2.5rem]" />
      </section>

      <section className="border-y border-line bg-chandan py-12" aria-label="Facts about us">
        <dl className="wrap grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-sm text-maroon-700">{f.label}</dt>
              <dd className="mt-1 text-lg font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="prose-ghee">
          <h2 style={{ marginTop: 0 }}>Why we started</h2>
          <p>
            The Gir cow comes from the forests and hills of Saurashtra, around the town of Talala. Families here have kept Gir cows for generations and made ghee at home the slow way: curd set overnight, churned at sunrise, makkhan cooked on a chulha.
          </p>
          <p>
            Most of that ghee never left the village. Meanwhile, ghee sold in cities was increasingly made from separated cream, and too often cut with vanaspati. We started {site.name} in {site.foundingYear} to bring the village method to city kitchens, and to prove its purity with a lab report for every batch.
          </p>
          <h2>How we work with farmers</h2>
          <p>
            We buy milk from {site.stats.partnerFarms} partner families who keep purebred Gir and Sahiwal cows on open pasture. We pay above the local dairy rate, every week, and the buttermilk from churning goes back to the farms. Calves drink first; we only collect what is left.
          </p>
          <h2>What we will not do</h2>
          <ul>
            <li>Make ghee from separated cream and call it bilona.</li>
            <li>Blend in crossbred cow, buffalo or any other milk in our A2 ghee.</li>
            <li>Add colour, flavour or preservatives.</li>
            <li>Make health claims we cannot support with good evidence.</li>
          </ul>
        </div>
        <div className="space-y-6">
          <Image src={asset("/images/farm/bilona-churning.svg")} alt="Hands churning curd with a wooden bilona" width={1600} height={1000} className="w-full rounded-3xl" />
          <Image src={asset("/images/farm/wood-fire-kadhai.svg")} alt="Makkhan simmering in an iron kadhai over a wood fire" width={1600} height={1000} className="w-full rounded-3xl" />
        </div>
      </section>

      <section className="bg-maroon-900 py-16 text-chandan">
        <div className="wrap flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-chandan sm:text-4xl">See how a jar is made, step by step</h2>
            <p className="mt-2 text-maroon-100">Eight steps over two days, from pasture to the lab.</p>
          </div>
          <Link href="/bilona-process" className="inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-semibold text-maroon-950 hover:bg-haldi-400">
            Follow the bilona process
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
