import Link from "next/link";
import { mainProduct } from "@/data/products";
import { SizeCard } from "@/components/product/SizeCard";
import { Buffalo } from "@/components/art/Buffalo";

export default function NotFound() {
  return (
    <section className="wrap py-16 lg:py-24">
      <div className="relative h-44 w-80 max-w-full border-b-4 border-double border-peetal" aria-hidden>
        <Buffalo pose="graze" className="absolute -bottom-1 left-0 w-full" />
      </div>
      <p lang="hi" className="mt-6 font-hand text-2xl text-rani" aria-hidden>
        रानी चरने चली गई
      </p>
      <h1 className="mt-1 font-display text-5xl">This page is not here</h1>
      <p className="mt-3 max-w-xl text-lg text-kattha-800">The link may be old or mistyped. Try the shop, search, or pick a pack of our ghee below.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/shop" className="inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-semibold text-kattha-950 hover:bg-haldi-400">
          Shop ghee
        </Link>
        <Link href="/search" className="inline-flex min-h-12 items-center rounded-full border-2 border-kattha-900 px-6 font-semibold">
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
