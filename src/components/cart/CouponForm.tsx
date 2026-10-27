"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";

export function CouponForm() {
  const { coupon, totals, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (coupon && totals.coupon) {
    return (
      <p className="flex items-center justify-between gap-3 rounded-xl bg-haldi-100 px-4 py-3 text-sm">
        <span className="flex items-center gap-2">
          <Icon name="tag" className="size-4" />
          <strong>{totals.coupon.code}</strong> applied: {totals.coupon.label}
        </span>
        <button type="button" onClick={removeCoupon} className="font-semibold underline underline-offset-4">
          Remove
        </button>
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!code.trim()) return;
        const result = applyCoupon(code);
        setError(result.ok ? null : result.message);
        if (result.ok) setCode("");
      }}
    >
      <label htmlFor="coupon" className="text-sm font-semibold">
        Coupon code
      </label>
      <div className="mt-1.5 flex gap-2">
        <input
          id="coupon"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="FIRSTJAR"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "coupon-error" : undefined}
          className="min-h-11 flex-1 rounded-full border border-maroon-200 px-4 uppercase"
        />
        <button type="submit" className="min-h-11 rounded-full bg-maroon-100 px-5 font-semibold hover:bg-maroon-200">
          Apply
        </button>
      </div>
      {error ? (
        <p id="coupon-error" role="alert" className="mt-2 text-sm text-kumkum">
          {error}
        </p>
      ) : null}
    </form>
  );
}
