"use client";

import { useCart } from "@/components/cart/CartProvider";
import type { CartLine } from "@/lib/cart";

export function QuickAddButton({ line, label, productName }: { line: Omit<CartLine, "key" | "qty">; label: string; productName: string }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={(e) => add(line, 1, { from: e.currentTarget })}
      className="mt-3 min-h-11 w-full rounded-full bg-kumkum px-4 font-semibold text-chandan hover:bg-kumkum-700"
      aria-label={`${label}: ${productName}`}
    >
      {label}
    </button>
  );
}
