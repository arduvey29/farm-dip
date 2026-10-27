"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";
import { CartLines } from "./CartLines";
import { FreeShippingMeter } from "./FreeShippingMeter";

export function CartDrawer() {
  const ref = useRef<HTMLDialogElement>(null);
  const { isOpen, close, lines, totals } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <dialog
      ref={ref}
      className="drawer drawer-right"
      aria-labelledby="cart-title"
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-title" className="font-display text-2xl">
            Your cart {totals.count ? <span className="font-sans text-base text-maroon-700">({totals.count})</span> : null}
          </h2>
          <button type="button" onClick={close} className="rounded-full p-2 hover:bg-chandan" aria-label="Close cart">
            <Icon name="close" className="size-6" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
            <p className="font-display text-2xl">Your cart is empty</p>
            <p className="text-maroon-700">Start with our best seller, A2 Gir cow bilona ghee, or pick a pack size from the shop.</p>
            <Link href="/shop" className="rounded-full bg-haldi-500 px-6 py-3 font-semibold text-maroon-950 hover:bg-haldi-400">
              Shop ghee
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-line bg-chandan px-5 py-3">
              <FreeShippingMeter />
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              <CartLines compact />
            </div>
            <div className="space-y-3 border-t border-line px-5 py-4">
              {totals.savings > 0 ? <p className="text-sm font-semibold text-mehndi">You save {formatPrice(totals.savings)} on MRP</p> : null}
              <div className="flex items-baseline justify-between">
                <span className="text-maroon-700">Subtotal</span>
                <span className="text-xl font-bold">{formatPrice(totals.subtotal - totals.discount)}</span>
              </div>
              <p className="text-xs text-maroon-700">Shipping and coupons are calculated at checkout. Free cash on delivery.</p>
              <Link href="/checkout" className="block rounded-full bg-maroon-900 px-6 py-3.5 text-center font-semibold text-chandan hover:bg-maroon-800">
                Checkout
              </Link>
              <Link href="/cart" className="block text-center text-sm font-medium underline underline-offset-4">
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
