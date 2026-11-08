import Link from "next/link";
import { processSteps } from "@/data/process";
import { mainProduct } from "@/data/products";
import { GheeDropMark, SectionTitle } from "@/components/ui/Ornament";
import { JourneyDriver } from "./JourneyDriver";
import { journeyScenes } from "./JourneyScenes";

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Scroll-driven story of one batch, in the brand's eight steps: from Rani's milk to a strained jar.
 * The stage stays in place (beside the steps on wide screens, above them on phones) while the scenes
 * change; a line of ghee runs down the steps as you go. The steps are plain HTML, so the content
 * reads fully without JavaScript or motion. Driven by driveJourney() in lib/motion, which a Shopify
 * section can reuse as is.
 */
export function GheeJourney() {
  return (
    <section className="journey relative bg-pasture-950 text-cream" data-step="0" aria-labelledby="journey-title">
      <JourneyDriver />
      <div className="wrap pt-20 lg:pt-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionTitle id="journey-title" title="From Rani to your kitchen, in eight steps." tone="dark" />
          <p className="max-w-xl text-lg text-pasture-100">
            Full-fat buffalo milk, a slow flame, a night to set, a wooden madhani and a muslin cloth. No shortcuts. Scroll to follow one batch.
          </p>
        </div>
      </div>

      <div className="wrap grid pb-20 lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-x-16 lg:pb-28">
        <div
          data-stage
          className="sticky top-16 z-10 -mx-4 bg-pasture-950 px-4 pt-6 pb-4 sm:-mx-6 sm:px-6 lg:top-[calc(50vh-min(18rem,36vh))] lg:order-2 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0"
        >
          <div className="relative mx-auto h-[42svh] max-w-xl lg:aspect-[4/5] lg:h-auto lg:max-h-[72vh] lg:max-w-[min(27rem,57.6vh)]">
            <div className="journey-sky relative size-full overflow-hidden rounded-[2rem]">
              {journeyScenes.map((Scene, i) => (
                <div key={i} className="scene" data-scene data-i={i} data-active={i === 0 ? "" : undefined}>
                  <Scene />
                </div>
              ))}
            </div>
            {/* The one fact that matters at each step. */}
            {processSteps.map((step, i) => (
              <p
                key={step.id}
                data-i={i}
                data-active={i === 0 ? "" : undefined}
                aria-hidden
                className="fact pointer-events-none absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-cream py-2 pr-4 pl-2.5 text-sm font-semibold text-ink-900 shadow-[0_10px_24px_-12px_rgb(0_0_0/0.5)]"
              >
                <span className="grid size-7 place-items-center rounded-full bg-ghee-400 font-display text-xs">{num(i)}</span>
                {step.fact}
              </p>
            ))}
          </div>
        </div>

        <ol className="relative mt-4 lg:order-1 lg:mt-0">
          <span className="absolute top-0 bottom-0 left-[1.4rem] w-[3px] rounded-full bg-pasture-800" aria-hidden />
          <span className="journey-fill absolute top-0 bottom-0 left-[1.4rem] w-[3px] rounded-full bg-ghee-400" aria-hidden />
          {processSteps.map((step, i) => (
            <li key={step.id} data-beat className="relative min-h-[58svh] pt-6 pl-16 lg:min-h-[66vh] lg:pt-0">
              {/* Each step's text stays pinned below (phones) or beside (wide screens) the stage until the next one pushes it on. */}
              <div className="sticky top-[calc(4rem+3.25rem+42svh)] lg:top-[calc(50vh-6rem)]">
                <span
                  data-i={i}
                  data-active={i === 0 ? "" : undefined}
                  aria-hidden
                  className="bead absolute top-0 -left-16 grid size-12 place-items-center rounded-full bg-pasture-800 font-display text-base text-pasture-100"
                >
                  {num(i)}
                </span>
                <h3 className="font-display text-2xl leading-tight text-cream sm:text-[2rem]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.name}
                </h3>
                <p className="mt-3 max-w-md text-lg text-pasture-100">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap flex flex-wrap items-center gap-3 pb-20 lg:pb-28">
        <Link href={`/products/${mainProduct.slug}`} className="btn btn-gold text-lg">
          Shop ghee
        </Link>
        <Link href="/how-its-made" className="btn btn-line text-cream">
          The process in detail
        </Link>
        <span className="ml-2 inline-flex items-center gap-2 text-sm text-pasture-200">
          <GheeDropMark className="h-4 w-3.5 text-ghee-400" />
          No preservatives, no additives, ever
        </span>
      </div>
    </section>
  );
}
