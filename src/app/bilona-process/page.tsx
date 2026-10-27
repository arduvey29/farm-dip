import Link from "next/link";
import type { Metadata } from "next";
import { bilonaSteps } from "@/data/process";
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

const title = "What Is the Bilona Method? How Bilona Ghee Is Made";
const description =
  "The bilona method makes ghee from curd: milk is set overnight, churned with a wooden bilona into makkhan and slow-cooked. See all eight steps, timings and how it differs from cream ghee.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/bilona-process" });

const faqs = [
  { q: "What is the bilona method of making ghee?", a: "The bilona method makes ghee from curd. Whole milk is boiled, set into curd overnight, churned with a wooden bilona to separate makkhan, and the makkhan is slow-cooked until it becomes clear ghee." },
  { q: "How long does it take to make bilona ghee?", a: "About two days from milking to filtered ghee: 8 to 10 hours for curd to set, about an hour of churning, 2 to 3 hours of slow cooking and 12 hours of cooling. Lab testing adds two to three days before packing." },
  { q: "What is a bilona?", a: "A bilona is a traditional wooden churner. It is spun back and forth in a pot of curd, usually with a rope, until the butter separates from the buttermilk." },
  { q: "Why is bilona ghee grainy?", a: "Slow cooking and slow cooling let fat crystals grow larger, which gives bilona ghee its grainy, danedar texture." },
];

export default function BilonaProcessPage() {
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Bilona process", path: "/bilona-process" }]} />
      </div>

      <section className="wrap grid gap-10 pt-8 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl">How bilona ghee is made</h1>
          <div className="mt-6">
            <QuickAnswer label="What is the bilona method?">
              The bilona method makes ghee from curd rather than cream. Milk is set into curd overnight, churned with a wooden bilona into makkhan, and the makkhan is slow-cooked into ghee. It takes about {site.stats.milkPerLitre} of milk per litre of ghee.
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

      <div className="kairi-band" aria-hidden />
      <section className="bg-maroon-900 py-16 lg:py-20" aria-labelledby="steps">
        <div className="wrap">
          <h2 id="steps" className="font-display text-4xl text-chandan sm:text-5xl">
            The eight steps
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-maroon-100">From pasture to sealed jar in about four days, including lab testing.</p>
          <div className="mt-12">
            <ProcessTimeline tone="dark" detailed />
          </div>
        </div>
      </section>

      <section className="wrap grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20" aria-labelledby="vs">
        <div>
          <h2 id="vs" className="font-display text-4xl">
            Bilona vs cream method
          </h2>
          <p className="mt-4 text-lg text-maroon-800">The cream method skips the curd: cream is separated by machine and boiled directly. It is faster and uses about half the milk.</p>
          <Link href="/blog/bilona-vs-cream-ghee" className="mt-6 inline-block font-semibold underline decoration-peetal decoration-2 underline-offset-[6px]">
            Read the detailed comparison
          </Link>
        </div>
        <CompareTable />
      </section>

      <section className="border-t border-line bg-chandan py-16" aria-labelledby="process-faq">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="process-faq" className="font-display text-4xl">
            Questions about the bilona method
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <JsonLd
        data={graph(
          webPageLd({ path: "/bilona-process", name: title, description }),
          howToLd(bilonaSteps),
          faqLd(faqs),
        )}
      />
    </>
  );
}
