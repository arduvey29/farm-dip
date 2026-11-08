"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import { CouponForm } from "@/components/cart/CouponForm";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Icon } from "@/components/ui/Icon";

const STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const PAYMENTS = [
  { id: "upi", label: "UPI", note: "Google Pay, PhonePe, Paytm or any UPI app" },
  { id: "card", label: "Debit or credit card", note: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net banking", note: "All major Indian banks" },
  { id: "cod", label: "Cash on delivery", note: "Free. Pay in cash or UPI when your order arrives" },
] as const;

type Errors = Partial<Record<string, string>>;

function validate(data: FormData): Errors {
  const e: Errors = {};
  const phone = String(data.get("phone") ?? "").replace(/\s/g, "");
  if (!/^[6-9]\d{9}$/.test(phone)) e.phone = "Enter a 10-digit Indian mobile number.";
  const email = String(data.get("email") ?? "");
  if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email address, or leave it blank.";
  if (String(data.get("name") ?? "").trim().length < 2) e.name = "Enter the name for delivery.";
  if (String(data.get("address1") ?? "").trim().length < 5) e.address1 = "Enter your house number and street.";
  if (String(data.get("city") ?? "").trim().length < 2) e.city = "Enter your city or town.";
  if (!data.get("state")) e.state = "Choose your state.";
  if (!/^[1-9]\d{5}$/.test(String(data.get("pincode") ?? ""))) e.pincode = "Enter a valid 6-digit pincode.";
  return e;
}

function Field({ id, label, error, children, hint }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="mt-1 text-xs text-ink-700">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-spice">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const input = "min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4 aria-[invalid=true]:border-spice";

/**
 * PLACEHOLDER checkout. In production: post to a server action that re-prices the cart
 * from the catalogue, creates the order, and opens Razorpay/Cashfree for online payments.
 */
export function CheckoutForm() {
  const { lines, totals, clear } = useCart();
  const [errors, setErrors] = useState<Errors>({});
  const [payment, setPayment] = useState<(typeof PAYMENTS)[number]["id"]>("upi");
  const [placed, setPlaced] = useState<{ id: string; total: number; cod: boolean } | null>(null);
  const hasGift = lines.some((l) => l.slug === "festive-gift-box");

  if (placed) {
    return (
      <div className="max-w-xl py-6" role="status">
        <Icon name="check" className="size-12 rounded-full bg-pasture-600 p-2 text-oat" />
        <h2 className="mt-5 font-display text-4xl">Order placed</h2>
        <p className="mt-3 text-lg">
          Order <strong>{placed.id}</strong> for <strong>{formatPrice(placed.total)}</strong> is confirmed.{" "}
          {placed.cod ? "Keep cash or UPI ready when it arrives." : "Payment received."}
        </p>
        <p className="mt-2 text-ink-700">We will send tracking details by SMS and WhatsApp when your ghee ships, usually within 24 hours.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/track-order" className="inline-flex min-h-12 items-center rounded-full bg-pasture-900 px-6 font-semibold text-oat">
            Track your order
          </Link>
          <Link href="/blog/how-to-store-ghee" className="btn btn-line">
            How to store your ghee
          </Link>
        </div>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="max-w-lg py-6">
        <p className="font-display text-3xl">Your cart is empty</p>
        <p className="mt-3 text-ink-700">Add some ghee to your cart before checking out.</p>
        <Link href="/shop" className="btn btn-gold mt-6">
          Shop ghee
        </Link>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="grid gap-10 lg:grid-cols-[1.3fr_1fr]"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const found = validate(data);
        setErrors(found);
        const first = Object.keys(found)[0];
        if (first) {
          document.getElementById(first)?.focus();
          return;
        }
        const id = `GD${Date.now().toString(36).toUpperCase()}`;
        setPlaced({ id, total: totals.total, cod: payment === "cod" });
        clear();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div className="space-y-10">
        <fieldset className="space-y-4">
          <legend className="mb-2 text-xl font-semibold">Contact</legend>
          <Field id="phone" label="Mobile number" error={errors.phone} hint="For delivery updates on SMS and WhatsApp">
            <input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} className={input} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          </Field>
          <Field id="email" label="Email (optional)" error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" className={input} aria-invalid={Boolean(errors.email)} />
          </Field>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-2 text-xl font-semibold">Delivery address</legend>
          <Field id="name" label="Full name" error={errors.name}>
            <input id="name" name="name" autoComplete="name" className={input} aria-invalid={Boolean(errors.name)} />
          </Field>
          <Field id="address1" label="House number, building and street" error={errors.address1}>
            <input id="address1" name="address1" autoComplete="address-line1" className={input} aria-invalid={Boolean(errors.address1)} />
          </Field>
          <Field id="address2" label="Area, landmark (optional)">
            <input id="address2" name="address2" autoComplete="address-line2" className={input} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field id="pincode" label="Pincode" error={errors.pincode}>
              <input id="pincode" name="pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" className={input} aria-invalid={Boolean(errors.pincode)} />
            </Field>
            <Field id="city" label="City or town" error={errors.city}>
              <input id="city" name="city" autoComplete="address-level2" className={input} aria-invalid={Boolean(errors.city)} />
            </Field>
            <Field id="state" label="State" error={errors.state}>
              <select id="state" name="state" autoComplete="address-level1" defaultValue="" className={input} aria-invalid={Boolean(errors.state)}>
                <option value="" disabled>
                  Choose
                </option>
                {STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
          {hasGift ? (
            <Field id="giftNote" label="Gift message for the card (optional)" hint="We handwrite it. Up to 200 characters.">
              <textarea id="giftNote" name="giftNote" maxLength={200} rows={3} className={`${input} py-3`} />
            </Field>
          ) : null}
        </fieldset>

        <fieldset>
          <legend className="mb-4 text-xl font-semibold">Payment</legend>
          <div className="space-y-2.5">
            {PAYMENTS.map((p) => (
              <label
                key={p.id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-ghee-500 ${payment === p.id ? "border-ink-900 bg-ink-50" : "border-line"}`}
              >
                <input type="radio" name="payment" value={p.id} checked={payment === p.id} onChange={() => setPayment(p.id)} className="mt-1 size-4 accent-ink-900" />
                <span>
                  <span className="block font-semibold">{p.label}</span>
                  <span className="text-sm text-ink-700">{p.note}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="h-fit space-y-6 rounded-3xl border border-line p-6 lg:sticky lg:top-24">
        <h2 className="text-xl font-semibold">
          Your order <span className="text-base font-normal text-ink-700">({totals.count} items)</span>
        </h2>
        <ul className="space-y-3">
          {lines.map((l) => (
            <li key={l.key} className="flex items-center gap-3">
              <span className="relative shrink-0">
                <Image src={l.image} alt="" width={56} height={56} className="rounded-lg bg-oat" />
                <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-pasture-900 text-xs text-oat">{l.qty}</span>
              </span>
              <span className="min-w-0 flex-1 text-sm">
                <span className="block truncate font-semibold">{l.name}</span>
                <span className="text-ink-700">{l.variantLabel}</span>
              </span>
              <span className="text-sm font-semibold tabular-nums">{formatPrice(l.price * l.qty)}</span>
            </li>
          ))}
        </ul>
        <CouponForm />
        <OrderSummary />
        <button type="submit" className="btn btn-gold w-full text-lg">
          {payment === "cod" ? `Place order, pay ${formatPrice(totals.total)} on delivery` : `Pay ${formatPrice(totals.total)}`}
        </button>
        <p className="flex items-center justify-center gap-2 text-xs text-ink-700">
          <Icon name="shield" className="size-4" /> Payments are encrypted and processed by our payment partner.
        </p>
      </aside>
    </form>
  );
}
