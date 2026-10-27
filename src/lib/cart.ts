import { site } from "./site";

export type CartLine = {
  key: string;
  slug: string;
  variantId: string;
  name: string;
  variantLabel: string;
  price: number;
  mrp: number;
  image: string;
  volumeMl: number;
  qty: number;
};

export type CartState = { lines: CartLine[]; coupon: string | null };

const STORAGE_KEY = "farmdip-cart-v1";
const MAX_QTY = 20;
const EMPTY: CartState = { lines: [], coupon: null };

let state: CartState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): CartState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as CartState;
    return Array.isArray(parsed.lines) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function commit(next: CartState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage full: cart still works for this tab.
  }
  listeners.forEach((l) => l());
}

/**
 * Cart lives in the browser only. In production, prices must be re-validated
 * on the server at checkout; never trust prices sent from the client.
 */
export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      state = readStorage();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): CartState {
    if (!hydrated && typeof window !== "undefined") {
      hydrated = true;
      state = readStorage();
    }
    return state;
  },
  getServerSnapshot(): CartState {
    return EMPTY;
  },
  add(line: Omit<CartLine, "key" | "qty">, qty = 1) {
    const key = `${line.slug}:${line.variantId}`;
    const existing = state.lines.find((l) => l.key === key);
    const lines = existing
      ? state.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
      : [...state.lines, { ...line, key, qty: Math.min(MAX_QTY, qty) }];
    commit({ ...state, lines });
  },
  setQty(key: string, qty: number) {
    if (qty <= 0) return cartStore.remove(key);
    commit({ ...state, lines: state.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)) });
  },
  remove(key: string) {
    commit({ ...state, lines: state.lines.filter((l) => l.key !== key) });
  },
  clear() {
    commit(EMPTY);
  },
  applyCoupon(code: string): { ok: true } | { ok: false; message: string } {
    const coupon = findCoupon(code);
    if (!coupon) return { ok: false, message: `${code.toUpperCase()} is not a valid code. Check the spelling and try again.` };
    const { subtotal } = computeTotals(state);
    if (subtotal < coupon.minSubtotal) {
      return { ok: false, message: `${coupon.code} needs a cart of ₹${coupon.minSubtotal} or more.` };
    }
    commit({ ...state, coupon: coupon.code });
    return { ok: true };
  },
  removeCoupon() {
    commit({ ...state, coupon: null });
  },
};

function findCoupon(code: string | null) {
  if (!code) return undefined;
  return site.commerce.coupons.find((c) => c.code === code.trim().toUpperCase());
}

export function computeTotals(cart: CartState) {
  const { freeShippingThreshold, shippingFee } = site.commerce;
  const count = cart.lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.lines.reduce((n, l) => n + l.price * l.qty, 0);
  const mrpTotal = cart.lines.reduce((n, l) => n + l.mrp * l.qty, 0);
  const coupon = findCoupon(cart.coupon);
  const couponValid = coupon && subtotal >= coupon.minSubtotal;
  const discount = couponValid ? Math.round((subtotal * coupon.percentOff) / 100) : 0;
  const afterDiscount = subtotal - discount;
  const shipping = count === 0 || afterDiscount >= freeShippingThreshold ? 0 : shippingFee;
  return {
    count,
    subtotal,
    mrpTotal,
    savings: mrpTotal - subtotal + discount,
    discount,
    coupon: couponValid ? coupon : undefined,
    shipping,
    total: afterDiscount + shipping,
    toFreeShipping: Math.max(0, freeShippingThreshold - afterDiscount),
  };
}
