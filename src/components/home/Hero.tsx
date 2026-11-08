import Link from "next/link";
import { mainProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { MotionToggle } from "@/components/layout/MotionToggle";
import { HeroScene } from "./HeroScene";

export function Hero() {
  const smallest = mainProduct.variants[0];
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="wrap grid items-center gap-8 pt-10 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-14 lg:pb-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-oat px-3.5 py-1.5 text-sm font-medium text-ink-800">
            <span className="size-2 rounded-full bg-pasture-600" aria-hidden />
            Pure desi ghee from buffalo milk
          </p>
          <h1 id="hero-title" className="mt-6 font-display text-[2.9rem] leading-[0.98] text-ink-900 sm:text-6xl lg:text-[5.4rem]">
            Ghee the way we ate it as children.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-700 sm:text-xl">
            Full-fat buffalo milk, set into dahi, churned the bilona way and clarified slowly. Rich, creamy and nothing added: no preservatives, no additives.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/products/${mainProduct.slug}`} className="btn btn-ink text-lg">
              Shop ghee
            </Link>
            <Link href="/how-its-made" className="btn btn-line text-ink-900">
              See how it&apos;s made
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-700">
            <li className="flex items-center gap-2">
              <Icon name="leaf" className="size-5 text-pasture-600" /> No preservatives or additives
            </li>
            <li className="flex items-center gap-2">
              <Icon name="cash" className="size-5 text-pasture-600" /> Free cash on delivery
            </li>
            <li className="flex items-center gap-2">
              <Icon name="truck" className="size-5 text-pasture-600" /> Ships in {site.commerce.dispatchHours} hours
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem]">
          <HeroScene />
          <p className="absolute top-[8%] right-0 grid size-24 place-items-center rounded-full bg-ink-900 text-center text-cream shadow-[0_14px_30px_-14px_rgb(22_17_19/0.7)] sm:size-28">
            <span className="leading-tight">
              <span className="block text-xs text-ghee-300">from</span>
              <span className="block font-display text-2xl">{formatPrice(smallest.price)}</span>
              <span className="block text-xs text-ghee-300">{smallest.label}</span>
            </span>
          </p>
          <MotionToggle className="absolute right-1 bottom-1 bg-cream/85 px-3 py-1.5 text-ink-700 backdrop-blur" />
        </div>
      </div>
    </section>
  );
}
