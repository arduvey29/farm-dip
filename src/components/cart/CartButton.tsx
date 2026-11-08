"use client";

import { useCart } from "./CartProvider";
import { Icon } from "@/components/ui/Icon";

export function CartButton() {
  const { totals, open } = useCart();
  const count = totals.count;
  return (
    <button
      type="button"
      onClick={open}
      data-cart-target=""
      className="relative -mr-2 rounded-full p-2.5 hover:bg-oat"
      aria-label={count ? `Open cart, ${count} ${count === 1 ? "item" : "items"}` : "Open cart"}
      aria-haspopup="dialog"
    >
      <Icon name="cart" className="size-6" />
      {count > 0 ? (
        <span className="absolute top-1 right-0.5 grid min-w-5 place-items-center rounded-full bg-ghee-500 px-1 text-xs leading-5 font-bold text-ink-950">
          {count}
        </span>
      ) : null}
    </button>
  );
}
