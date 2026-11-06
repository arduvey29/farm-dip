import Link from "next/link";
import { sampleBatches } from "@/data/lab";
import { formatDate, formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { GoshalaWindow } from "./GoshalaWindow";

export function Hero({ fromPrice }: { fromPrice: number }) {
  const batch = sampleBatches[0];
  return (
    <section className="relative overflow-hidden bg-maroon-900 text-chandan">
      {/* Toran across the doorway: the house welcomes you in. */}
      <div className="toran absolute inset-x-0 top-0 z-10" aria-hidden />

      <div className="wrap grid items-center gap-10 pt-20 pb-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-24 lg:pb-20">
        <div>
          <p lang="hi" className="font-display text-5xl leading-[1.15] font-bold text-haldi-400 sm:text-6xl lg:text-7xl">
            शुद्ध देसी घी
          </p>
          <h1 className="mt-4 font-display text-3xl leading-[1.12] text-balance text-chandan sm:text-4xl lg:text-[2.75rem]">
            Farm Dip – Pure Desi Ghee
          </h1>
          <p className="mt-5 max-w-xl text-lg text-maroon-100">
            Bring home the goodness of tradition with Farm Dip Pure Desi Ghee, crafted with care to bring authentic taste and rich aroma to your everyday meals. Made from pure buffalo milk, our ghee offers a rich, creamy texture and delicious flavour that makes every meal special.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="inline-flex min-h-13 items-center rounded-full bg-haldi-500 px-7 text-lg font-bold text-maroon-950 shadow-[0_6px_0_0_var(--color-haldi-800)] hover:bg-haldi-400">
              Shop Pure Desi Ghee
            </Link>
            <Link href="/about" className="inline-flex min-h-13 items-center rounded-full border-2 border-haldi-400 px-6 font-semibold text-haldi-300 hover:bg-haldi-400 hover:text-maroon-950">
              Our Aim & Story
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-maroon-100">
            <li className="flex items-center gap-2">
              <Icon name="leaf" className="size-5 text-haldi-400" /> Pure & 100% natural
            </li>
            <li className="flex items-center gap-2">
              <Icon name="shield" className="size-5 text-haldi-400" /> No preservatives or additives
            </li>
            <li className="flex items-center gap-2">
              <Icon name="cash" className="size-5 text-haldi-400" /> Free cash on delivery
            </li>
          </ul>
          <p className="mt-5 text-sm text-maroon-200">From {formatPrice(fromPrice)} for 500 ml.</p>
        </div>

        {/* Jharokha window onto the goshala at dawn. */}
        <div className="relative mx-auto w-full max-w-[27rem]">
          <GoshalaWindow />

          <Link
            href="/lab-reports"
            className="stamp absolute -top-3 -right-2 z-10 grid size-28 rotate-12 place-items-center rounded-full bg-paper p-3 text-center text-kumkum hover:rotate-0 sm:-right-8 sm:size-32"
          >
            <span className="leading-tight">
              <span className="block font-display text-sm font-bold tracking-wide">100% PURE</span>
              <span className="mt-1 block text-[0.7rem] font-semibold">Batch {batch.batch}</span>
              <span className="block text-[0.7rem]">{formatDate(batch.packed)}</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="kairi-band" aria-hidden />
    </section>
  );
}
