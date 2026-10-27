import type { Metadata } from "next";
import { sampleBatches } from "@/data/lab";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";
import { faqLd, graph, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { BatchLookup } from "@/components/story/BatchLookup";
import { LabTable } from "@/components/story/LabTable";

const title = "Ghee Lab Reports: Batch-Wise Purity Test Results";
const description = `Look up the lab report for your jar of ${site.name} ghee by batch number. Every batch is tested for ${site.stats.labParameters} parameters, including vanaspati and vegetable fat, against FSSAI limits.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/lab-reports" });

const faqs = [
  { q: "Which lab tests your ghee?", a: "An independent NABL-accredited food testing lab. We do not test our own ghee for the reports we publish." },
  { q: "How do I know the report matches my jar?", a: "Every jar carries a batch number. Enter it on this page to see the report for that exact batch." },
  { q: "What does the phytosterol test show?", a: "Plant sterols are found only in vegetable fats. A negative phytosterol acetate test shows no vegetable oil or vanaspati was mixed into the ghee." },
];

export default function LabReportsPage() {
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Lab reports", path: "/lab-reports" }]} />
      </div>

      <section className="wrap pt-8 pb-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl">A lab report for every batch</h1>
          <QuickAnswer label="How is our ghee tested?">
            A sample of every batch is sent to an independent NABL-accredited lab and tested against FSSAI standards for moisture, freshness and adulteration, including vanaspati and vegetable fat. Only batches that pass are packed.
          </QuickAnswer>
        </div>
      </section>

      <section className="bg-maroon-900 py-14 text-chandan" aria-labelledby="lookup">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 id="lookup" className="font-display text-4xl text-chandan">
              Look up your jar
            </h2>
            <p className="mt-3 text-lg text-maroon-100">Enter the batch number from your jar to see when it was packed and how it tested.</p>
          </div>
          <BatchLookup />
        </div>
      </section>

      <section className="wrap py-16" aria-labelledby="results">
        <h2 id="results" className="font-display text-4xl">
          What we test, and our latest results
        </h2>
        <p className="mt-3 max-w-2xl text-maroon-800">
          Results from batch {sampleBatches[0].batch}, packed {formatDate(sampleBatches[0].packed)}. Each test explained in plain words.
        </p>
        <div className="mt-8">
          <LabTable />
        </div>
        <p className="mt-4 text-sm text-maroon-700">Sample report format. Replace with your lab&apos;s values before launch.</p>
      </section>

      <section className="wrap pb-16" aria-labelledby="recent">
        <h2 id="recent" className="font-display text-3xl">
          Recent batches
        </h2>
        <div className="mt-6 overflow-x-auto rounded-3xl border border-line">
          <table className="table-ghee min-w-[36rem]">
            <caption className="sr-only">Recently tested batches</caption>
            <thead>
              <tr>
                <th scope="col">Batch</th>
                <th scope="col">Product</th>
                <th scope="col">Packed</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {sampleBatches.map((b) => (
                <tr key={b.batch}>
                  <th scope="row" className="font-mono">
                    {b.batch}
                  </th>
                  <td>{b.product}</td>
                  <td>{formatDate(b.packed)}</td>
                  <td className="font-semibold text-mehndi">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-line bg-chandan py-16" aria-labelledby="lab-faq">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="lab-faq" className="font-display text-4xl">
            Questions about testing
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <JsonLd data={graph(webPageLd({ path: "/lab-reports", name: title, description }), faqLd(faqs))} />
    </>
  );
}
