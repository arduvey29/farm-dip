"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore, computeTotals, type CartLine } from "@/lib/cart";
import { flyToCart } from "@/lib/motion";

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
