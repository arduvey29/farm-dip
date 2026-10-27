"use client";

import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";

const DIYAS = 5;

function Diya({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={`size-9 transition-transform duration-300 ${lit ? "scale-100" : "scale-90"}`} aria-hidden focusable="false">
      {lit ? (
        <>
          <circle cx="24" cy="18" r="14" fill="#f8d47a" opacity="0.35" />
          <g className="flicker">
            <path d="M24 6c4 6 5 10 2.5 14-1.3 2-3.7 2-5 0C19 16 20 12 24 6Z" fill="var(--color-genda)" />
            <path d="M24 11c2 3.5 2.4 6 1 8-.6.9-1.4.9-2 0-1.4-2-1-4.5 1-8Z" fill="var(--color-haldi-300)" />
          </g>
        </>
      ) : (
        <path d="M24 22v-4" stroke="var(--color-maroon-500)" strokeWidth="2" strokeLinecap="round" />
      )}
      <path d="M6 26c4 9 11 13 18 13s14-4 18-13c-6 2.5-12 3.5-18 3.5S12 28.5 6 26Z" fill={lit ? "var(--color-haldi-500)" : "#c7a27c"} />
      <path d="M6 26c6 2.5 12 3.5 18 3.5s12-1 18-3.5" fill="none" stroke={lit ? "var(--color-haldi-800)" : "#8f6a48"} strokeWidth="1.5" />
    </svg>
  );
}

/** Free-shipping progress as a row of diyas that light up as the cart grows. */
export function FreeShippingMeter() {
  const { totals } = useCart();
  const threshold = site.commerce.freeShippingThreshold;
  const reached = totals.toFreeShipping === 0;
  const pct = Math.min(100, Math.round(((threshold - totals.toFreeShipping) / threshold) * 100));
  const lit = reached ? DIYAS : Math.floor((pct / 100) * DIYAS);
  return (
    <div>
      <p className="text-sm" aria-live="polite">
        {reached ? (
          <span className="font-semibold text-mehndi">Every diya is lit. Your order ships free.</span>
        ) : (
          <>
            Add <strong>{formatPrice(totals.toFreeShipping)}</strong> more for free shipping.
          </>
        )}
      </p>
      <div className="mt-1 flex items-end gap-1" role="progressbar" aria-label="Progress to free shipping" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        {Array.from({ length: DIYAS }, (_, i) => (
          <Diya key={i} lit={i < lit} />
        ))}
      </div>
    </div>
  );
}
