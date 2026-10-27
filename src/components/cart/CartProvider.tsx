"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore, computeTotals, type CartLine } from "@/lib/cart";

type CartContextValue = {
  lines: CartLine[];
  coupon: string | null;
  totals: ReturnType<typeof computeTotals>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (line: Omit<CartLine, "key" | "qty">, qty?: number, opts?: { openDrawer?: boolean; from?: Element | null }) => void;
  setQty: typeof cartStore.setQty;
  remove: typeof cartStore.remove;
  clear: typeof cartStore.clear;
  applyCoupon: typeof cartStore.applyCoupon;
  removeCoupon: typeof cartStore.removeCoupon;
};

const CartContext = createContext<CartContextValue | null>(null);

/** A drop of ghee arcs from the button to the cart icon, the icon bobs, then the drawer opens. */
function flyToCart(from: Element, onLanded: () => void) {
  const target = document.querySelector("[data-cart-target]");
  if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return onLanded();
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const x0 = a.left + a.width / 2;
  const y0 = a.top + a.height / 2;
  const dx = b.left + b.width / 2 - x0;
  const dy = b.top + b.height / 2 - y0;
  const drop = document.createElement("div");
  drop.className = "ghee-drop";
  drop.style.left = `${x0}px`;
  drop.style.top = `${y0}px`;
  const arc = document.createElement("span");
  arc.style.cssText = "display:block;width:100%;height:100%";
  arc.append(document.createElement("i"));
  drop.append(arc);
  document.body.append(drop);
  const duration = 620;
  // Arc above both ends, but never off the top of the screen.
  const peak = Math.max(Math.min(dy, 0) - 70, 14 - y0);
  drop.animate([{ transform: "translateX(0)" }, { transform: `translateX(${dx}px)` }], { duration, fill: "forwards" });
  const flight = arc.animate(
    [
      { transform: "translateY(0) scale(1)", easing: "cubic-bezier(0.2, 0.6, 0.4, 1)" },
      { transform: `translateY(${peak}px) scale(1.15)`, offset: 0.45, easing: "cubic-bezier(0.6, 0, 0.8, 0.4)" },
      { transform: `translateY(${dy}px) scale(0.5)` },
    ],
    { duration, fill: "forwards" },
  );
  flight.onfinish = () => {
    drop.remove();
    target.animate([{ transform: "none" }, { transform: "scale(1.25) rotate(-10deg)" }, { transform: "scale(0.95) rotate(6deg)" }, { transform: "none" }], { duration: 420, easing: "ease-out" });
    onLanded();
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const add = useCallback<CartContextValue["add"]>((line, qty = 1, opts) => {
    cartStore.add(line, qty);
    if (!(opts?.openDrawer ?? true)) return;
    if (opts?.from) flyToCart(opts.from, () => setOpen(true));
    else setOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines: cart.lines,
      coupon: cart.coupon,
      totals: computeTotals(cart),
      isOpen,
      open,
      close,
      add,
      setQty: cartStore.setQty,
      remove: cartStore.remove,
      clear: cartStore.clear,
      applyCoupon: cartStore.applyCoupon,
      removeCoupon: cartStore.removeCoupon,
    }),
    [cart, isOpen, open, close, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
