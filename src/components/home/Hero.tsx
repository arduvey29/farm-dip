import Link from "next/link";
import { mainProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { HeroScene } from "./HeroScene";

export function Hero({ className = "" }: { className?: string } = {}) {
  const smallest = mainProduct.variants[0];
  return (
    <section className={`relative overflow-hidden ${className}`} aria-labelledby="hero-title">
      <div className="wrap grid items-center gap-8 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:pt-24 lg:pb-20">
        {/* Left Side: Clean, Left-Aligned with Heritage Eczar Serif Typography & Impactful Spacing */}
        <div className="relative">
          {/* Subtle Geometric Lattice Pattern floating softly behind text without box borders */}
          <div
            className="pointer-events-none absolute -inset-8 -z-10 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-ink-950) 1.2px, transparent 0), radial-gradient(circle at 14px 14px, var(--color-ghee-600) 1.5px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
            aria-hidden="true"
          />

          {/* Ambient Warm Radial Glow */}
          <div
            className="pointer-events-none absolute -top-16 -left-16 size-80 rounded-full bg-ghee-300/30 blur-3xl"
            aria-hidden="true"
          />

          {/* Headline in Heritage Eczar Serif with Artistic Wavy Ribbon Accent */}
          <h1
            id="hero-title"
            className="font-deva text-4xl font-bold leading-[1.04] text-ink-950 tracking-tight sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]"
          >
            Ghee the way we ate it{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 font-bold text-ghee-800">
                as children.
              </span>
              <svg
                className="absolute -bottom-1.5 left-0 -z-0 h-3 w-full text-ghee-400"
                viewBox="0 0 140 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8.5C35 2 85 11 138 4"
                  stroke="currentColor"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Action Buttons with larger size & spacing */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`/products/${mainProduct.slug}`}
              className="btn btn-ink min-h-[3.25rem] sm:min-h-14 px-8 text-base sm:text-lg font-bold shadow-md transition-transform duration-200 hover:scale-[1.02]"
            >
              Shop ghee
            </Link>
            <Link
              href="/how-its-made"
              className="btn btn-line min-h-[3.25rem] sm:min-h-14 border-ink-300 px-7 text-base sm:text-lg font-semibold text-ink-950 transition-colors hover:border-ink-900"
            >
              See how it&apos;s made
            </Link>
          </div>

          {/* Trust Highlights without capsules */}
          <ul className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-ink-800 sm:text-sm">
            <li className="inline-flex items-center gap-2">
              <Icon name="leaf" className="size-4 text-pasture-700" />
              <span>No preservatives or additives</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <Icon name="cash" className="size-4 text-ghee-800" />
              <span>Free cash on delivery</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <Icon name="truck" className="size-4 text-pasture-700" />
              <span>Ships in {site.commerce.dispatchHours} hours</span>
            </li>
          </ul>
        </div>

        {/* Right Side: Animated Hero Scene with Price Tag */}
        <div className="relative mx-auto w-full max-w-[28rem] lg:max-w-[31rem]">
          <HeroScene />
          <p className="absolute top-[8%] right-0 grid size-20 place-items-center rounded-full bg-ink-900 text-center text-cream shadow-[0_14px_30px_-14px_rgb(22_17_19/0.7)] sm:size-24">
            <span className="leading-tight">
              <span className="block text-[0.65rem] text-ghee-300 sm:text-xs">from</span>
              <span className="block font-display text-xl sm:text-2xl">{formatPrice(smallest.price)}</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
