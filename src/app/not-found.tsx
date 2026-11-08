import Link from "next/link";
import { mainProduct } from "@/data/products";
import { SizeCard } from "@/components/product/SizeCard";
import { Buffalo } from "@/components/art/Buffalo";

export default function NotFound() {
  return (
    <section className="wrap py-16 lg:py-24">
      <div className="relative h-44 w-80 max-w-full border-b-2 border-pasture-600" aria-hidden>
        <Buffalo pose="graze" className="absolute -bottom-1 left-0 w-full" />
      </div>
      <h1 className="mt-6 font-display text-5xl sm:text-6xl">Rani has wandered off to graze.</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-800">This page is not here. The link may be old or mistyped. Try the shop, search, or pick a pack of our ghee below.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/shop" className="btn btn-ink">
          Shop ghee
        </Link>
        <Link href="/search" className="btn btn-line">
          Search
        </Link>
      </div>
      <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-3">
        {mainProduct.variants.map((v) => (
          <SizeCard key={v.id} product={mainProduct} variant={v} headingLevel={2} />
        ))}
      </div>
    </section>
  );
}
