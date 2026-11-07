"use client";

import { formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";

export function OrderSummary() {
  const { totals } = useCart();
  return (
    <dl className="space-y-2.5">
      <div className="flex justify-between">
        <dt className="text-kattha-700">MRP total</dt>
        <dd className="tabular-nums">{formatPrice(totals.mrpTotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-kattha-700">Discount on MRP</dt>
        <dd className="text-hara tabular-nums">−{formatPrice(totals.mrpTotal - totals.subtotal)}</dd>
      </div>
      {totals.discount > 0 ? (
        <div className="flex justify-between">
          <dt className="text-kattha-700">Coupon {totals.coupon?.code}</dt>
          <dd className="text-hara tabular-nums">−{formatPrice(totals.discount)}</dd>
        </div>
      ) : null}
      <div className="flex justify-between">
        <dt className="text-kattha-700">Shipping</dt>
        <dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
      </div>
      <div className="flex justify-between border-t border-line pt-3 text-lg font-bold">
        <dt>Total</dt>
        <dd className="tabular-nums">{formatPrice(totals.total)}</dd>
      </div>
      {totals.savings > 0 ? <p className="text-sm font-semibold text-hara">You save {formatPrice(totals.savings)} on this order.</p> : null}
    </dl>
  );
}
