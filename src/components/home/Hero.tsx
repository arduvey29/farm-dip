import Link from "next/link";
import { mainProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { VillageWindow } from "./VillageWindow";

export function Hero() {
  const smallest = mainProduct.variants[0];
  return (
    <section className="relative overflow-hidden bg-lal-900 text-chandan">
      {/* Toran across the doorway: the house welcomes you in. */}
      <div className="toran absolute inset-x-0 top-0 z-10" aria-hidden />

      <div className="wrap grid items-center gap-10 pt-20 pb-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-24 lg:pb-20">
        <div>
          <p lang="hi" className="font-display text-5xl leading-[1.2] text-haldi-400 sm:text-6xl lg:text-7xl">
            शुद्ध देसी घी
          </p>
          <h1 className="mt-3 font-display text-3xl leading-[1.18] text-balance text-chandan sm:text-4xl lg:text-[2.6rem]">
            Pure buffalo ghee, made the way we ate it as children
          </h1>
          <p className="mt-5 max-w-xl text-lg text-lal-100">
            Rich, creamy and full of aroma. Made from pure buffalo milk with no preservatives or additives, for everyday cooking and your family&apos;s favourite recipes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/products/${mainProduct.slug}`}
              className="inline-flex min-h-13 items-center rounded-full bg-haldi-500 px-7 text-lg font-bold text-kattha-950 shadow-[0_6px_0_0_var(--color-haldi-800)] hover:bg-haldi-400"
            >
              Shop buffalo ghee
            </Link>
            <Link href="/how-its-made" className="inline-flex min-h-13 items-center rounded-full border-2 border-haldi-400 px-6 font-semibold text-haldi-300 hover:bg-haldi-400 hover:text-kattha-950">
              See how it is made
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-lal-100">
            <li className="flex items-center gap-2">
              <Icon name="leaf" className="size-5 text-haldi-400" /> No preservatives or additives
            </li>
            <li className="flex items-center gap-2">
              <Icon name="cash" className="size-5 text-haldi-400" /> Free cash on delivery
            </li>
            <li className="flex items-center gap-2">
              <Icon name="truck" className="size-5 text-haldi-400" /> Ships in {site.commerce.dispatchHours} hours
            </li>
          </ul>
          <p className="mt-5 text-sm text-lal-200">
            From {formatPrice(smallest.price)} for {smallest.label}.
          </p>
        </div>

        {/* Jharokha window onto the village at dawn. */}
        <div className="relative mx-auto w-full max-w-[27rem]">
          <VillageWindow />

          {/* A rubber-stamp seal, the way Indian shops mark the real thing. */}
          <p className="stamp absolute -top-3 -right-2 z-10 grid size-28 rotate-12 place-items-center rounded-full bg-malai p-3 text-center text-rani sm:-right-8 sm:size-32">
            <span className="leading-tight">
              <span className="block font-display text-2xl">100%</span>
              <span lang="hi" className="block font-display text-xl">
                शुद्ध
              </span>
              <span className="mt-0.5 block text-[0.65rem] font-semibold">No preservatives</span>
            </span>
          </p>
        </div>
      </div>

      <div className="phulkari-band" aria-hidden />
    </section>
  );
}
