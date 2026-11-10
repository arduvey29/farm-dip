import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { asset } from "@/lib/assets";
import { faqLd, graph, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { GheeDropMark } from "@/components/ui/Ornament";
import { GheeDrip } from "@/components/art/GheeDrip";
import { GheeJar } from "@/components/art/GheeJar";
import { LogoMark } from "@/components/layout/Logo";

const title = `Lab Reports & Certified Purity | ${site.name}`;
const description = `View and download the official independent laboratory test report for ${site.name} Pure Desi Buffalo Ghee. Tested for purity, moisture, and absence of vanaspati against FSSAI standards.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/lab-reports" });

const labParameters = [
  {
    parameter: "Milk Fat Purity",
    standard: "Min. 99.5%",
    observed: "99.8%",
    result: "Passed (100% Pure Buffalo Fat)",
  },
  {
    parameter: "Baudouin Test (Vanaspati / Dalda)",
    standard: "Must be Negative",
    observed: "Negative",
    result: "Passed (Zero Vegetable Oils)",
  },
  {
    parameter: "Reichert-Meissl (RM) Value",
    standard: "Min. 28.0",
    observed: "32.4",
    result: "Passed (Authentic Dairy Fat)",
  },
  {
    parameter: "Moisture Content",
    standard: "Max. 0.5%",
    observed: "0.18%",
    result: "Passed (Optimal Freshness)",
  },
  {
    parameter: "Free Fatty Acids (FFA as Oleic)",
    standard: "Max. 1.4%",
    observed: "0.28%",
    result: "Passed (Low Acidity & Sweet Aroma)",
  },
  {
    parameter: "Artificial Colours & Preservatives",
    standard: "Absent",
    observed: "Nil Detected",
    result: "Passed (100% Natural)",
  },
];

const faqs = [
  {
    q: "Why do we test our ghee in independent labs?",
    a: "We believe trust is earned through transparency. Every batch is tested at an accredited laboratory to verify milk fat purity, moisture control, and the complete absence of vanaspati or vegetable oils.",
  },
  {
    q: "How can I view or download the lab report?",
    a: "Click either 'View Lab Report' to read the full high-resolution PDF in your browser, or 'Download Report (PDF)' to save a copy. You can also scan the QR code printed on the back of any Farm Dip jar.",
  },
  {
    q: "What adulterants do lab tests check for?",
    a: "Tests screen for vegetable oils (vanaspati), plant sterols, mineral oils, synthetic colouring agents, animal tallow, and excess moisture.",
  },
  {
    q: "Is Farm Dip pure desi buffalo ghee certified by FSSAI?",
    a: `Yes, Farm Dip operates under FSSAI licence number ${site.legal.fssai}, strictly following national food safety standards.`,
  },
];

export default function LabReportsPage() {
  const pdfUrl = site.testReport.url;
  const qrImage = site.testReport.qr;

  return (
    <>
      {/* 100% VIEWPORT HEIGHT HERO SECTION */}
      <section className="relative flex min-h-[calc(100svh-4.25rem)] flex-col justify-between overflow-hidden bg-cream pt-4 pb-6 lg:min-h-[calc(100vh-4.5rem)] lg:pt-6 lg:pb-8">
        {/* Subtle atmospheric ambient glow */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 size-[32rem] rounded-full bg-ghee-300/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 size-[30rem] rounded-full bg-pasture-200/25 blur-3xl"
          aria-hidden="true"
        />

        <div className="wrap">
          <Breadcrumbs items={[{ name: "Lab reports", path: "/lab-reports" }]} />
        </div>

        {/* Central interactive grid */}
        <div className="wrap my-auto grid gap-8 py-6 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-14 lg:py-8">
          {/* Left Column: Story & Ultra-Prominent Action Buttons */}
          <div>
            {/* Live verification indicator (Clean text rule, no capsule pill) */}
            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-pasture-900 uppercase">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pasture-600 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-pasture-700" />
              </span>
              <span>Official NABL Accredited Testing</span>
              <span className="text-line">•</span>
              <span className="text-ink-600 font-medium">Batch FD-231026</span>
            </div>

            <h1 className="mt-3.5 font-display text-4xl leading-[1.03] text-ink-950 sm:text-5xl lg:text-[4.25rem]">
              Pure buffalo ghee, verified to the last drop.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-ink-800 sm:text-lg lg:text-xl">
              No doubts. No shortcuts. Every batch of Farm Dip is independently analyzed at an accredited laboratory to verify 100% natural milk fat purity, Reichert-Meissl value (32.4), and zero presence of vanaspati or vegetable oil.
            </p>

            {/* ULTRA PROMINENT ACTION BUTTONS */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-1 items-center justify-between gap-4 rounded-2xl bg-ghee-400 px-6 py-4 text-ink-950 shadow-[0_12px_28px_-8px_rgba(235,168,38,0.65)] transition-all duration-300 hover:scale-[1.02] hover:bg-ghee-300 hover:shadow-[0_16px_36px_-6px_rgba(235,168,38,0.85)] active:scale-[0.99] sm:min-h-[4.75rem]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink-950 text-ghee-300 shadow-md transition-transform duration-300 group-hover:scale-110">
                    <Icon name="eye" className="size-6 text-ghee-300" />
                  </div>
                  <div className="text-left">
                    <span className="block font-display text-xl font-bold leading-tight sm:text-2xl">
                      View Lab Report
                    </span>
                    <span className="block text-xs font-semibold text-ink-800">
                      Open certified PDF in new tab
                    </span>
                  </div>
                </div>
                <Icon
                  name="arrowRight"
                  className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href={pdfUrl}
                download={site.testReport.filename}
                className="group relative flex flex-1 items-center justify-between gap-4 rounded-2xl bg-pasture-900 px-6 py-4 text-cream shadow-[0_12px_28px_-8px_rgba(19,48,32,0.55)] transition-all duration-300 hover:scale-[1.02] hover:bg-pasture-800 hover:shadow-[0_16px_36px_-6px_rgba(19,48,32,0.75)] active:scale-[0.99] sm:min-h-[4.75rem]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-pasture-800 text-ghee-300 shadow-md transition-transform duration-300 group-hover:translate-y-0.5">
                    <Icon name="download" className="size-6 text-ghee-300" />
                  </div>
                  <div className="text-left">
                    <span className="block font-display text-xl font-bold leading-tight sm:text-2xl">
                      Download Report
                    </span>
                    <span className="block text-xs font-normal text-pasture-200">
                      Official PDF (~6.9 MB)
                    </span>
                  </div>
                </div>
                <Icon
                  name="arrowRight"
                  className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Quick metadata line */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Icon name="shield" className="size-4 text-pasture-700" />
                Tested against FSSAI National Standards
              </span>
              <span className="text-line">•</span>
              <a
                href={site.testReport.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-ink-800 underline underline-offset-4 hover:text-ink-950"
              >
                <span>Google Drive mirror</span>
                <Icon name="chevronRight" className="size-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Tactile Laboratory Dossier with Rotating Purity Seal */}
          <div className="relative">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl border-2 border-line bg-milk p-6 shadow-md transition-all duration-300 hover:border-ghee-400 hover:shadow-xl sm:p-7"
              title="Click to inspect full certified lab report PDF"
            >
              {/* Header with Rotating Seal */}
              <div className="flex items-start justify-between border-b border-line pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <LogoMark className="h-9 w-auto shrink-0" />
                    <div>
                      <span className="block font-deva text-xl font-bold leading-none text-ink-950">
                        {site.name}
                      </span>
                      <span className="text-[0.68rem] font-semibold tracking-wider text-pasture-800 uppercase">
                        Certificate of Analysis
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-ink-600">
                    Sample: <span className="font-semibold text-ink-900">{site.testReport.sampleName}</span>
                  </p>
                </div>

                {/* Animated Rotating Seal Badge */}
                <div className="relative size-20 shrink-0 sm:size-24">
                  <svg
                    viewBox="0 0 200 200"
                    className="size-full"
                    style={{ animation: "spin 22s linear infinite" }}
                    aria-hidden="true"
                  >
                    <defs>
                      <path
                        id="sealCircle"
                        d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                      />
                    </defs>
                    <text fontSize="13" fontWeight="bold" letterSpacing="3.5" fill="var(--color-pasture-800)">
                      <textPath href="#sealCircle" startOffset="0%">
                        • CERTIFIED ANALYSIS • NABL ACCREDITED • 100% PURE FAT
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid size-10 place-items-center rounded-full bg-ghee-400 text-ink-950 shadow-sm sm:size-12">
                      <Icon name="shield" className="size-5 text-pasture-900" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Ledger Data Rows (Typographic table, no nested card) */}
              <div className="mt-4 divide-y divide-line/70 text-xs">
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-ink-600">Milk Fat Purity:</span>
                  <span className="font-mono font-bold text-pasture-900">99.8% (Passed)</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-ink-600">Reichert-Meissl (RM):</span>
                  <span className="font-mono font-bold text-pasture-900">32.4 (Passed)</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-ink-600">Vanaspati (Baudouin):</span>
                  <span className="font-mono font-bold text-pasture-900">Negative (0.0%)</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-ink-600">Preservatives & Dyes:</span>
                  <span className="font-mono font-bold text-pasture-900">Nil Detected</span>
                </div>
              </div>

              {/* Bottom Document Prompt */}
              <div className="mt-4 flex items-center justify-between border-t border-line/80 pt-3.5 text-xs font-semibold text-ghee-800 transition-colors group-hover:text-ink-950">
                <span className="flex items-center gap-1.5">
                  <Icon name="eye" className="size-3.5" />
                  <span>Click to view official signed document</span>
                </span>
                <Icon
                  name="arrowRight"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Verification Strip */}
        <div className="wrap flex flex-col items-center justify-between gap-1 border-t border-line/70 pt-3 text-xs text-ink-500 sm:flex-row">
          <span>
            FSSAI Licence No. {site.legal.fssai} • Verified by Accredited Chemists
          </span>
          <span>Sample Date: {site.testReport.date}</span>
        </div>
      </section>

      {/* Signature Ghee Numbers Ribbon with Molten Ghee Drip */}
      <section aria-label="Key purity metrics" className="relative bg-ghee-400 text-ink-950">
        <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-7 pt-10 pb-14 sm:grid-cols-4 lg:pt-12 lg:pb-16">
          {[
            { value: "99.8%", label: "Milk fat purity" },
            { value: "0.0%", label: "Vanaspati or plant oil" },
            { value: "0", label: "Preservatives or colours" },
            { value: "32.4", label: "RM value for pure fat" },
          ].map((item) => (
            <div key={item.value} className="flex flex-col-reverse justify-end">
              <dd className="mt-1 text-xs font-semibold text-ink-800 sm:text-sm">{item.label}</dd>
              <dt className="font-display text-3xl leading-none tracking-tight sm:text-5xl">{item.value}</dt>
            </div>
          ))}
        </dl>
        <GheeDrip />
      </section>

      {/* PHYSICAL JAR + QR CODE VERIFICATION: Visual, Low-Text */}
      <section className="wrap pt-28 pb-16 lg:pt-36 lg:pb-24" aria-labelledby="qr-heading">
        <div className="rounded-3xl border-2 border-line bg-milk p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            {/* Visual Jar + Scannable QR */}
            <div className="flex items-center justify-center gap-4 sm:gap-8">
              <div className="shrink-0">
                <GheeJar id="jar-qr" className="h-56 w-auto sm:h-64 drop-shadow-md" />
              </div>

              <div className="flex flex-col items-center rounded-2xl border-2 border-line bg-oat/60 p-4 text-center shadow-sm">
                <span className="text-[0.65rem] font-bold tracking-wider text-ink-600 uppercase">
                  Scan With Phone
                </span>
                <div className="mt-2 rounded-xl bg-white p-2.5 shadow-md ring-2 ring-ghee-400/40">
                  <Image
                    src={asset(qrImage)}
                    alt="Scan this QR code to view the Farm Dip Lab Report"
                    width={200}
                    height={200}
                    className="size-32 rounded-lg object-contain sm:size-36"
                    priority
                  />
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-pasture-800">
                  <Icon name="check" className="size-3 text-pasture-700" />
                  Purity QR Code
                </span>
              </div>
            </div>

            {/* QR Actions */}
            <div>
              <span className="text-xs font-bold tracking-widest text-ghee-800 uppercase">
                Instant Kitchen Verification
              </span>
              <h2 id="qr-heading" className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-900 leading-[1.08]">
                Scan your jar anytime, right at home.
              </h2>
              <p className="mt-3 text-base sm:text-lg text-ink-700 leading-relaxed">
                Every jar of Farm Dip carries this QR code printed on the label. Simply point your smartphone camera at the jar or the screen above to open the official laboratory certificate.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghee min-h-12 px-6 font-bold"
                >
                  <Icon name="eye" className="size-4" />
                  <span>View Lab Report</span>
                </a>
                <Link href="/shop" className="btn btn-ink min-h-12 px-6 font-bold">
                  Shop pure ghee
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK PARAMETERS LEDGER: Clean table, no long essays */}
      <section className="border-t border-line bg-oat py-16 lg:py-20" aria-labelledby="ledger-heading">
        <div className="wrap max-w-4xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-widest text-ghee-800 uppercase">Tested Parameters</span>
              <h2 id="ledger-heading" className="mt-1 font-display text-3xl sm:text-4xl text-ink-900">
                Official test summary
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline min-h-10 px-4 text-xs font-bold"
              >
                <Icon name="eye" className="size-3.5" />
                <span>View Full PDF</span>
              </a>
              <a
                href={pdfUrl}
                download={site.testReport.filename}
                className="btn btn-ink min-h-10 px-4 text-xs font-bold"
              >
                <Icon name="download" className="size-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-milk shadow-sm">
            <div className="overflow-x-auto p-4 sm:p-6">
              <table className="w-full text-left text-sm text-ink-800">
                <thead>
                  <tr className="border-b border-line text-xs font-bold text-ink-500 uppercase tracking-wider">
                    <th scope="col" className="pb-3 pl-2 sm:pl-3">Test Parameter</th>
                    <th scope="col" className="pb-3">Standard Limit</th>
                    <th scope="col" className="pb-3">Observed Value</th>
                    <th scope="col" className="pb-3 pr-2 text-right sm:pr-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {labParameters.map((row) => (
                    <tr key={row.parameter} className="transition-colors hover:bg-cream/40">
                      <td className="py-3.5 pl-2 font-semibold text-ink-900 sm:pl-3">
                        <div className="flex items-center gap-2">
                          <GheeDropMark className="size-3 shrink-0 text-ghee-600" />
                          <span>{row.parameter}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-xs text-ink-600">{row.standard}</td>
                      <td className="py-3.5 font-mono font-bold text-ink-900">{row.observed}</td>
                      <td className="py-3.5 pr-2 text-right sm:pr-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-pasture-100 px-2.5 py-0.5 text-xs font-bold text-pasture-900">
                          <Icon name="check" className="size-3 text-pasture-800" />
                          {row.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="wrap py-16" aria-labelledby="lab-faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="lab-faq" className="font-display text-3xl sm:text-4xl text-ink-900">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-ink-700">
              Clear answers regarding our laboratory certifications and quality standards.
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <JsonLd data={graph(webPageLd({ path: "/lab-reports", name: title, description }), faqLd(faqs))} />
    </>
  );
}
