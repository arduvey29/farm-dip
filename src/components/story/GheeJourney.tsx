import Link from "next/link";
import { processSteps } from "@/data/process";
import { mainProduct } from "@/data/products";
import { SectionTitle } from "@/components/ui/Ornament";
import { JourneyDriver } from "./JourneyDriver";
import { journeyScenes } from "./JourneyScenes";

const devanagariDigits = ["१", "२", "३", "४", "५", "६"];

/**
 * Scroll-driven story of one batch, from Rani at the village pond to a sealed jar.
 * The stage stays in place (beside the steps on wide screens, above them on phones) while the
 * day turns to night and back, the malai sets, the makkhan is churned and melts and the jar fills.
 * The steps are plain HTML, so the content reads fully without JavaScript or motion.
 * Motion is driven by driveJourney() in lib/motion, which a Shopify section can reuse as is.
 */
export function GheeJourney() {
  return (
    <section className="journey relative bg-lal-900 text-chandan" data-step="0" aria-labelledby="journey-title">
      <JourneyDriver />
      <div className="wrap pt-16 lg:pt-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionTitle id="journey-title" hindi="घी कैसे बनता है" title="From Rani to your kitchen, in six steps" tone="dark" />
          <p className="text-lg text-lal-100">
            No factory shortcuts. Buffalo milk, its thick malai, a clay matka, a wooden madhani and a slow fire, the way ghee was made in our grandmothers&apos; homes. Scroll to follow one batch.
          </p>
        </div>
      </div>

      <div className="wrap grid pb-16 lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-x-16 lg:pb-24">
        <div
          data-stage
          className="sticky top-[68px] z-10 -mx-4 bg-lal-900 px-4 pt-6 pb-4 sm:-mx-6 sm:px-6 lg:top-[calc(50vh-min(18rem,36vh))] lg:order-2 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0"
        >
          <div className="relative mx-auto h-[42svh] max-w-xl lg:aspect-[4/5] lg:h-auto lg:max-h-[72vh] lg:max-w-[min(27rem,57.6vh)]">
            <div className="arch size-full bg-peetal p-[5px]">
              <div className="arch journey-sky relative size-full overflow-hidden">
                {journeyScenes.map((Scene, i) => (
                  <div key={i} className="scene" data-scene data-i={i} data-active={i === 0 ? "" : undefined}>
                    <Scene />
                  </div>
                ))}
              </div>
            </div>
            {/* A paper parchi tied to the frame carries the number that matters at each step. */}
            {processSteps.map((beat, i) => (
              <p
                key={beat.id}
                data-i={i}
                data-active={i === 0 ? "" : undefined}
                aria-hidden
                className="parchi pointer-events-none absolute top-1 left-0 max-w-[12rem] rounded-lg border border-peetal bg-malai py-2 pr-4 pl-7 text-kattha-900 shadow-[0_8px_18px_-8px_rgb(0_0_0/0.5)] lg:top-[14%] lg:-left-14"
              >
                <span className="absolute top-1/2 left-2.5 size-2 -translate-y-1/2 rounded-full border border-kattha-500 bg-kattha-100" />
                <span lang="hi" className="block font-hand text-lg leading-tight text-rani">
                  {beat.factHindi}
                </span>
                <span className="block text-sm leading-snug font-semibold">{beat.fact}</span>
              </p>
            ))}
          </div>
        </div>

        <ol className="relative mt-4 lg:order-1 lg:mt-0">
          <span className="rope absolute top-0 bottom-0 left-[1.3rem] w-1.5 rounded-full opacity-25" aria-hidden />
          <span className="rope rope-fill absolute top-0 bottom-0 left-[1.3rem] w-1.5 rounded-full" aria-hidden />
          {processSteps.map((beat, i) => (
            <li key={beat.id} data-beat className="relative min-h-[58svh] pt-6 pl-16 lg:min-h-[72vh] lg:pt-0">
              {/* Each step's text stays pinned below (phones) or beside (wide screens) the stage until the next one pushes it on. */}
              <div className="sticky top-[calc(68px+3.25rem+42svh)] lg:top-[calc(50vh-6rem)]">
                <span
                  data-i={i}
                  data-active={i === 0 ? "" : undefined}
                  aria-hidden
                  className="bead absolute top-0 -left-16 grid size-12 place-items-center rounded-full border-2 border-peetal bg-lal-800 font-display text-2xl leading-none text-haldi-300"
                >
                  {devanagariDigits[i]}
                </span>
                <p lang="hi" className="font-hand text-xl text-haldi-300">
                  {beat.hindi}
                </p>
                <h3 className="mt-1 font-display text-2xl leading-snug text-chandan sm:text-3xl">
                  <span className="sr-only">Step {i + 1}: </span>
                  {beat.name}
                </h3>
                <p className="mt-3 max-w-md text-lg text-lal-100">{beat.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap flex flex-wrap gap-3 pb-16 lg:pb-24">
        <Link href={`/products/${mainProduct.slug}`} className="inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-bold text-kattha-950 hover:bg-haldi-400">
          Shop buffalo ghee
        </Link>
        <Link href="/how-its-made" className="inline-flex min-h-12 items-center rounded-full border-2 border-haldi-400 px-6 font-semibold text-haldi-300 hover:bg-haldi-400 hover:text-kattha-950">
          See how it is made
        </Link>
      </div>
    </section>
  );
}
