"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { CartLines } from "./CartLines";
import { CouponForm } from "./CouponForm";
import { FreeShippingMeter } from "./FreeShippingMeter";
import { OrderSummary } from "./OrderSummary";

export function CartView() {
  const { lines } = useCart();

  if (!lines.length) {
    return (
      <div className="max-w-lg py-10">
        <p className="font-display text-3xl">Your cart is empty</p>
        <p className="mt-3 text-kattha-700">Add a jar of pure buffalo ghee to get started. Orders above ₹999 ship free, and cash on delivery is always free.</p>
        <Link href="/shop" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-haldi-500 px-6 font-semibold text-kattha-950 hover:bg-haldi-400">
          Shop ghee
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <div className="rounded-2xl bg-chandan p-4">
          <FreeShippingMeter />
        </div>
        <CartLines />
      </div>
      <aside className="h-fit space-y-6 rounded-3xl border border-line p-6 lg:sticky lg:top-24">
        <h2 className="text-xl font-semibold">Order summary</h2>
        <CouponForm />
        <OrderSummary />
        <Link href="/checkout" className="block rounded-full bg-lal-900 px-6 py-3.5 text-center font-semibold text-chandan hover:bg-lal-800">
          Checkout
        </Link>
        <p className="text-center text-sm text-kattha-700">Free cash on delivery. UPI, cards and net banking accepted.</p>
      </aside>
    </div>
  );
}
