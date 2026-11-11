"use client";

import { useCart } from "@/components/cart/CartProvider";
import type { CartLine } from "@/lib/cart";

export function QuickAddButton({
  line,
  label,
  productName,
  compact = false,
  className = "",
}: {
  line: Omit<CartLine, "key" | "qty">;
  label: string;
  productName: string;
  compact?: boolean;
  className?: string;
}) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={(e) => add(line, 1, { from: e.currentTarget })}
      className={`btn btn-gold w-full px-2 font-bold ${
        compact
          ? "mt-2 min-h-8 py-1.5 text-xs sm:mt-2.5 sm:min-h-9 sm:text-sm"
          : "mt-2.5 min-h-10 text-xs sm:mt-4 sm:min-h-12 sm:px-3 sm:text-base"
      } ${className}`}
      aria-label={`${label}: ${productName}`}
    >
      {label}
    </button>
  );
}
