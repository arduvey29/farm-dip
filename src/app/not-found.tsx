import Link from "next/link";
import { bestSellers, getProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { GirCow } from "@/components/art/GirCow";

export default function NotFound() {
  const picks = getProducts(bestSellers).slice(0, 4);
  return (
    <section className="wrap py-16 lg:py-24">
      <div className="relative h-44 w-80 max-w-full border-b-4 border-double border-peetal" aria-hidden>
        <GirCow pose="graze" className="absolute -bottom-1 left-0 w-full" />
      </div>
      <p lang="hi" className="mt-6 font-hand text-2xl text-kumkum" aria-hidden>
        गौरी चरने चली गई
      </p>
      <h1 className="mt-1 font-display text-5xl">This page is not here</h1>
      <p className="mt-3 max-w-xl text-lg text-maroon-800">The link may be old or mistyped. Try the shop, search, or one of our best sellers below.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/shop" className="inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-semibold text-maroon-950 hover:bg-haldi-400">
          Shop ghee
        </Link>
        <Link href="/search" className="inline-flex min-h-12 items-center rounded-full border-2 border-maroon-900 px-6 font-semibold">
          Search
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {picks.map((p) => (
          <ProductCard key={p.slug} product={p} headingLevel={2} />
        ))}
      </div>
    </section>
  );
}
