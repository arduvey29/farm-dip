"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="wrap py-20">
      <h1 className="font-display text-5xl">This page did not load</h1>
      <p className="mt-3 max-w-xl text-lg text-kattha-800">Something went wrong on our side. Your cart is saved. Try again, or go back to the shop.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-semibold text-kattha-950 hover:bg-haldi-400">
          Try again
        </button>
        <Link href="/shop" className="inline-flex min-h-12 items-center rounded-full border-2 border-kattha-900 px-6 font-semibold">
          Go to the shop
        </Link>
      </div>
    </section>
  );
}
