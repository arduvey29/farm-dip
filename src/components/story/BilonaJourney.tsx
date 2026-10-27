import Link from "next/link";
import { journeyBeats } from "@/data/process";
import { SectionTitle } from "@/components/ui/Ornament";
import { JourneyDriver } from "./JourneyDriver";
import { journeyScenes } from "./JourneyScenes";

const devanagariDigits = ["१", "२", "३", "४", "५", "६"];

/**
 * Scroll-driven story of one batch, from Gauri at pasture to a sealed jar.
 * The stage stays in place (beside the steps on wide screens, above them on phones) while the
 * day turns to night and back, the curd is churned, the makkhan melts and the jar fills.
 * The steps are plain HTML, so the content reads fully without JavaScript or motion.
 */
export function BilonaJourney() {
  return (
    <section className="journey relative bg-maroon-900 text-chandan" data-step="0" aria-labelledby="journey-title">
      <JourneyDriver />
      <div className="wrap pt-16 lg:pt-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionTitle id="journey-title" hindi="बिलोना विधि" title="From Gauri to your kitchen, in six steps" tone="dark" />
          <p className="text-lg text-maroon-100">
            Most ghee is boiled straight from separated cream. Ours starts as whole milk and takes two days, a clay pot and a wooden churn. Scroll to follow one batch.
          </p>
        </div>
      </div>

      <div className="wrap grid pb-16 lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-x-16 lg:pb-24">
        <div
          data-stage
          className="sticky top-[68px] z-10 -mx-4 bg-maroon-900 px-4 pt-6 pb-4 sm:-mx-6 sm:px-6 lg:top-[calc(50vh-min(18rem,36vh))] lg:order-2 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0"
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
            {journeyBeats.map((beat, i) => (
              <p
                key={beat.id}
                data-i={i}
                data-active={i === 0 ? "" : undefined}
                aria-hidden
                className="parchi pointer-events-none absolute top-1 left-0 max-w-[12rem] rounded-lg border border-peetal bg-paper py-2 pr-4 pl-7 text-maroon-900 shadow-[0_8px_18px_-8px_rgb(0_0_0/0.5)] lg:top-[14%] lg:-left-14"
              >
                <span className="absolute top-1/2 left-2.5 size-2 -translate-y-1/2 rounded-full border border-maroon-500 bg-maroon-100" />
                <span lang="hi" className="block font-hand text-lg leading-tight text-kumkum">
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
          {journeyBeats.map((beat, i) => (
            <li key={beat.id} data-beat className="relative min-h-[58svh] pt-6 pl-16 lg:min-h-[72vh] lg:pt-0">
              {/* Each step's text stays pinned below (phones) or beside (wide screens) the stage until the next one pushes it on. */}
              <div className="sticky top-[calc(68px+3.25rem+42svh)] lg:top-[calc(50vh-6rem)]">
                <span
                  data-i={i}
                  data-active={i === 0 ? "" : undefined}
                  aria-hidden
                  className="bead absolute top-0 -left-16 grid size-12 place-items-center rounded-full border-2 border-peetal bg-maroon-800 font-display text-2xl leading-none text-haldi-300"
                >
                  {devanagariDigits[i]}
                </span>
                <p lang="hi" className="font-hand text-xl text-haldi-300">
                  {beat.hindi}
                </p>
                <h3 className="mt-1 font-display text-2xl leading-snug text-chandan sm:text-3xl">
                  <span className="sr-only">Step {i + 1}: </span>
                  {beat.title}
                </h3>
                <p className="mt-3 max-w-md text-lg text-maroon-100">{beat.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap flex flex-wrap gap-3 pb-16 lg:pb-24">
        <Link href="/products/a2-gir-cow-bilona-ghee" className="inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-bold text-maroon-950 hover:bg-haldi-400">
          Shop Gir cow ghee
        </Link>
        <Link href="/bilona-process" className="inline-flex min-h-12 items-center rounded-full border-2 border-haldi-400 px-6 font-semibold text-haldi-300 hover:bg-haldi-400 hover:text-maroon-950">
          See every step in detail
        </Link>
      </div>
    </section>
  );
}
