"use client";

import { useCart } from "@/components/cart/CartProvider";
import type { CartLine } from "@/lib/cart";

export function QuickAddButton({ line, label, productName }: { line: Omit<CartLine, "key" | "qty">; label: string; productName: string }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={(e) => add(line, 1, { from: e.currentTarget })}
      className="btn btn-gold mt-3 min-h-11 w-full px-3 text-sm sm:mt-4 sm:min-h-12 sm:text-base"
      aria-label={`${label}: ${productName}`}
    >
      {label}
    </button>
  );
}
