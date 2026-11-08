"use client";

import { useCart } from "@/components/cart/CartProvider";
import type { CartLine } from "@/lib/cart";

export function QuickAddButton({ line, label, productName }: { line: Omit<CartLine, "key" | "qty">; label: string; productName: string }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={(e) => add(line, 1, { from: e.currentTarget })}
      className="btn btn-gold mt-4 min-h-12 w-full"
      aria-label={`${label}: ${productName}`}
    >
      {label}
    </button>
  );
}
