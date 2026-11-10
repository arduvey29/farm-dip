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
import { SectionTitle } from "@/components/ui/Ornament";
import { GheeJourney } from "@/components/story/GheeJourney";
import { CompareTable } from "@/components/story/CompareTable";
import { ChurnScene } from "@/components/story/JourneyScenes";
import { Pausable } from "@/components/art/Pausable";
import { GheeDrip } from "@/components/art/GheeDrip";

const title = "How Desi Buffalo Ghee Is Made | Traditional Bilona Method in 8 Steps";
const description =
  "How Farm Dip ghee is made from full-fat buffalo milk | Heated slowly, set into dahi for 8 to 12 hours, churned the traditional bilona way, washed, clarified and strained through muslin. 100% natural with nothing added.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/how-its-made" });

const faqs = [
  {
    q: "What is the bilona method?",
    a: "Milk is heated, set into dahi, and the dahi is churned with a wooden madhani until butter separates. The butter is then clarified into ghee. Farm Dip follows this method with full-fat buffalo milk.",
  },
  {
    q: "How long does the milk take to set?",
    a: "After a slow boil, the milk is covered and left in a warm, cosy spot for 8 to 12 hours until it sets into dahi.",
  },
  {
    q: "Why is the butter washed in cold water?",
    a: "Washing the fresh butter in cold water rinses away the buttermilk (chhaach) that clings to it before it is clarified into ghee.",
  },
  {
    q: "Is anything added to Farm Dip ghee?",
    a: "No. There are no preservatives, no additives and no colour. It is ghee made from pure buffalo milk.",
  },
];

export default function HowItsMadePage() {
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "How it's made", path: "/how-its-made" }]} />
      </div>

      <section className="wrap grid gap-10 pt-8 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">How our ghee is made</h1>
          <div className="mt-6">
            <QuickAnswer label="How is Farm Dip ghee made?">
              {site.name} ghee is made the bilona way from full-fat buffalo milk. The milk is heated slowly to a gentle boil, covered and set into dahi for 8 to 12 hours, then churned until the butter separates. The butter is collected, washed in cold water, clarified into ghee, cooled for 10 to 15 minutes and strained through muslin. Nothing is added.
            </QuickAnswer>
          </div>
        </div>
        {/* Animated: dahi churned back and forth with a wooden madhani until the butter floats up. */}
        <Pausable className="mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem]">
          <div className="journey-sky relative size-full" style={{ "--sky-a": "#f08c4a", "--sky-b": "#fcd69a" } as React.CSSProperties}>
            <ChurnScene />
          </div>
        </Pausable>
      </section>

      <section className="relative bg-ghee-400 text-ink-950" aria-label="The process in numbers">
        <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-8 py-12 lg:grid-cols-4">
          {[
            ["12–14 L", "of buffalo milk per litre of ghee"],
            ["8–12 hrs", "for the milk to set"],
            ["10–15 min", "to cool before straining"],
            ["0", "preservatives or additives"],
          ].map(([value, label]) => (
            <div key={value} className="flex flex-col-reverse justify-end">
              <dd className="mt-1 text-[0.95rem] text-ink-800">{label}</dd>
              <dt className="font-display text-4xl leading-none sm:text-5xl">{value}</dt>
            </div>
          ))}
        </dl>
        <GheeDrip />
      </section>

      {/* The same scroll-driven journey as the home page: one scene per step. */}
      <GheeJourney id="steps" title="The eight steps, one batch at a time." onProcessPage topSpace="pt-32 lg:pt-36" />

      <section className="bg-oat" aria-labelledby="vs">
        <div className="wrap grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:py-20">
          <div>
            <SectionTitle id="vs" title="Buffalo ghee or cow ghee?" size="md" />
            <p className="mt-4 text-lg text-ink-800">Both are good ghee. Buffalo ghee is whiter, thicker and richer, and is the choice for many traditional sweets and fried food.</p>
            <Link href="/blog/buffalo-ghee-vs-cow-ghee" className="link mt-6 inline-block">
              Read the full comparison
            </Link>
          </div>
          <CompareTable />
        </div>
      </section>

      <section className="py-14 lg:py-20" aria-labelledby="process-faq">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle id="process-faq" title="Questions about how it is made" size="md" />
            <Link href={`/products/${mainProduct.slug}`} className="btn btn-ink mt-8">
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
