import Link from "next/link";
import type { Metadata } from "next";
import { processSteps } from "@/data/process";
import { mainProduct } from "@/data/products";
import { site } from "@/lib/site";
import { faqLd, graph, howToLd, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { ProcessTimeline } from "@/components/story/ProcessTimeline";
import { CompareTable } from "@/components/story/CompareTable";
import { ChurnScene } from "@/components/story/JourneyScenes";
import { Pausable } from "@/components/art/Pausable";

const title = "How Desi Buffalo Ghee Is Made: From Malai to Makkhan to Ghee";
const description =
  "How Farm Dip ghee is made from buffalo milk the traditional way: the malai is set into dahi, churned into makkhan and slow-cooked into ghee. No preservatives, no additives.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/how-its-made" });

const faqs = [
  {
    q: "How is desi ghee made at home?",
    a: "Milk is boiled and cooled so malai forms on top. The malai is collected, set into dahi, churned into makkhan, and the makkhan is cooked slowly until the water evaporates and clear ghee is left.",
  },
  {
    q: "Why is buffalo milk good for making ghee?",
    a: "Buffalo milk has more fat than cow milk, so it gives thick malai and more makkhan from the same amount of milk. The ghee is rich and creamy, and naturally white.",
  },
  {
    q: "Is anything added to Farm Dip ghee?",
    a: "No. There are no preservatives, no additives and no colour. It is ghee made from pure buffalo milk.",
  },
  {
    q: "Why does ghee have such a strong aroma?",
    a: "Slow cooking lightly browns the milk solids before the ghee is strained. That is where the rich, sweet aroma comes from.",
  },
];

export default function HowItsMadePage() {
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "How it's made", path: "/how-its-made" }]} />
      </div>

      <section className="wrap grid gap-10 pt-8 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p lang="hi" className="font-hand text-2xl text-rani">
            घी कैसे बनता है
          </p>
          <h1 className="mt-1 font-display text-5xl leading-[1.08] sm:text-6xl">How our ghee is made</h1>
          <div className="mt-6">
            <QuickAnswer label="How is Farm Dip ghee made?">
              {site.name} ghee is made from pure buffalo milk the traditional way. The milk is boiled and its thick malai collected, set into dahi, churned into makkhan and cooked slowly into ghee. Nothing is added: no preservatives, no additives, no colour.
            </QuickAnswer>
          </div>
        </div>
        {/* Animated: curd churned back and forth with a wooden madhani until makkhan floats up. */}
        <Pausable className="arch mx-auto aspect-[4/5] w-full max-w-sm bg-peetal p-[5px]">
          <div className="arch journey-sky relative size-full overflow-hidden" style={{ "--sky-a": "#f6a65a", "--sky-b": "#fde4bb" } as React.CSSProperties}>
            <ChurnScene />
          </div>
        </Pausable>
      </section>

      <div className="phulkari-band" aria-hidden />
      <section className="bg-lal-900 py-16 lg:py-20" aria-labelledby="steps">
        <div className="wrap">
          <h2 id="steps" className="font-display text-4xl text-chandan sm:text-5xl">
            The six steps
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-lal-100">From buffalo milk to a sealed jar, slowly, the way ghee is made at home.</p>
          <div className="mt-12">
            <ProcessTimeline tone="dark" detailed />
          </div>
        </div>
      </section>

      <section className="wrap grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20" aria-labelledby="vs">
        <div>
          <h2 id="vs" className="font-display text-4xl">
            Buffalo ghee or cow ghee?
          </h2>
          <p className="mt-4 text-lg text-kattha-800">Both are good ghee. Buffalo ghee is whiter, thicker and richer, and is the choice for many traditional sweets and fried food.</p>
          <Link href="/blog/buffalo-ghee-vs-cow-ghee" className="mt-6 inline-block font-semibold underline decoration-peetal decoration-2 underline-offset-[6px]">
            Read the full comparison
          </Link>
        </div>
        <CompareTable />
      </section>

      <section className="border-t border-line bg-chandan py-16" aria-labelledby="process-faq">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="process-faq" className="font-display text-4xl">
              Questions about how it is made
            </h2>
            <Link href={`/products/${mainProduct.slug}`} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-bold text-kattha-950 hover:bg-haldi-400">
              Shop buffalo ghee
            </Link>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <JsonLd
        data={graph(
          webPageLd({ path: "/how-its-made", name: title, description }),
          howToLd(processSteps),
          faqLd(faqs),
        )}
      />
    </>
  );
}
