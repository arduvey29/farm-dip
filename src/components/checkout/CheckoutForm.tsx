"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/lib/cart";
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
type PaymentId = (typeof PAYMENTS)[number]["id"];

/** The three steps, in the same order as Shopify's three-page checkout. */
const STEPS = [
  { title: "Phone", fields: ["phone", "email"] },
  { title: "Address", fields: ["name", "address1", "pincode", "city", "state"] },
  { title: "Review and pay", fields: [] },
] as const;

type Values = Record<string, string>;
type Errors = Partial<Record<string, string>>;

function validate(v: Values, fields: readonly string[]): Errors {
  const e: Errors = {};
  if (!/^[6-9]\d{9}$/.test((v.phone ?? "").replace(/\s/g, ""))) e.phone = "Enter a 10-digit Indian mobile number.";
  if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address, or leave it blank.";
  if ((v.name ?? "").trim().length < 2) e.name = "Enter the name for delivery.";
  if ((v.address1 ?? "").trim().length < 5) e.address1 = "Enter your house number and street.";
  if ((v.city ?? "").trim().length < 2) e.city = "Enter your city or town.";
  if (!v.state) e.state = "Choose your state.";
  if (!/^[1-9]\d{5}$/.test(v.pincode ?? "")) e.pincode = "Enter a valid 6-digit pincode.";
  return Object.fromEntries(Object.entries(e).filter(([k]) => fields.includes(k)));
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

/** A short order number for the receipt. PLACEHOLDER: the real one comes from the order system. */
const newOrderId = () => `FD${Date.now().toString(36).toUpperCase()}`;

const addressLines = (v: Values) => [v.name, [v.address1, v.address2].filter(Boolean).join(", "), `${v.city}, ${v.state} ${v.pincode}`];

type Placed = {
  id: string;
  values: Values;
  payment: PaymentId;
  lines: CartLine[];
  totals: ReturnType<typeof useCart>["totals"];
};

/**
 * PLACEHOLDER checkout in three steps: phone, address, then review and pay, followed by a receipt.
 * On Shopify this whole page is replaced by Shopify's own checkout (set to the three-page layout),
 * so nothing here needs porting. In this Next.js build, production would post to a server action that
 * re-prices the cart from the catalogue, creates the order, and opens Razorpay or Cashfree.
 */
export function CheckoutForm() {
  const { lines, totals, clear } = useCart();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [payment, setPayment] = useState<PaymentId>("upi");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [placed, setPlaced] = useState<Placed | null>(null);

  const top = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const set = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValues((v) => ({ ...v, [name]: e.target.value }));
  const goTo = (i: number) => {
    setErrors({});
    setStep(i);
    top();
  };

  if (placed) return <Receipt placed={placed} />;

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fields = step < 2 ? STEPS[step].fields : [...STEPS[0].fields, ...STEPS[1].fields];
    const found = validate(values, fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      // A problem in an earlier step (only possible if values changed) sends the shopper back to it.
      const owner = STEPS.findIndex((s) => (s.fields as readonly string[]).includes(first));
      if (owner !== step) setStep(owner);
      requestAnimationFrame(() => document.getElementById(first)?.focus());
      return;
    }
    if (step < 2) return goTo(step + 1);
    setPlaced({ id: newOrderId(), values, payment, lines, totals });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const field = (name: string) => ({
    id: name,
    name,
    value: values[name] ?? "",
    onChange: set(name),
    className: input,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
      <div>
        {/* Where you are: the three steps. Finished steps can be revisited. */}
        <ol className="grid grid-cols-3 gap-2" aria-label="Checkout steps">
          {STEPS.map((s, i) => {
            const done = i < step;
            const label = (
              <>
                <span className={`block h-1 rounded-full ${i <= step ? "bg-ghee-500" : "bg-line"}`} aria-hidden />
                <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold sm:text-sm">
                  <span className={`grid size-5 shrink-0 place-items-center rounded-full text-[0.7rem] ${i <= step ? "bg-ink-900 text-cream" : "bg-ink-100 text-ink-700"}`}>
                    {done ? <Icon name="check" className="size-3" /> : i + 1}
                  </span>
                  <span className={i <= step ? "text-ink-900" : "text-ink-500"}>{s.title}</span>
                </span>
              </>
            );
            return (
              <li key={s.title} aria-current={i === step ? "step" : undefined}>
                {done ? (
                  <button type="button" onClick={() => goTo(i)} className="block w-full text-left hover:opacity-80">
                    {label}
                    <span className="sr-only"> (done, go back to edit)</span>
                  </button>
                ) : (
                  label
                )}
              </li>
            );
          })}
        </ol>

        <form ref={formRef} noValidate onSubmit={submit} className="mt-8 scroll-mt-28">
          {step === 0 ? (
            <fieldset className="space-y-4">
              <legend className="mb-1 font-display text-3xl">Your mobile number</legend>
              <p className="text-ink-700">We send order and delivery updates here, on SMS and WhatsApp.</p>
              <Field id="phone" label="Mobile number" error={errors.phone}>
                <input type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} {...field("phone")} />
              </Field>
              <Field id="email" label="Email (optional)" error={errors.email} hint="For a copy of your receipt">
                <input type="email" autoComplete="email" {...field("email")} />
              </Field>
            </fieldset>
          ) : null}

          {step === 1 ? (
            <fieldset className="space-y-4">
              <legend className="mb-1 font-display text-3xl">Delivery address</legend>
              <Field id="name" label="Full name" error={errors.name}>
                <input autoComplete="name" {...field("name")} />
              </Field>
              <Field id="address1" label="House number, building and street" error={errors.address1}>
                <input autoComplete="address-line1" {...field("address1")} />
              </Field>
              <Field id="address2" label="Area, landmark (optional)">
                <input autoComplete="address-line2" {...field("address2")} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field id="pincode" label="Pincode" error={errors.pincode}>
                  <input inputMode="numeric" maxLength={6} autoComplete="postal-code" {...field("pincode")} />
                </Field>
                <Field id="city" label="City or town" error={errors.city}>
                  <input autoComplete="address-level2" {...field("city")} />
                </Field>
                <Field id="state" label="State" error={errors.state}>
                  <select autoComplete="address-level1" {...field("state")}>
                    <option value="" disabled>
                      Choose
                    </option>
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <div className="space-y-8">
              <h2 className="font-display text-3xl">Review and pay</h2>
              <dl className="divide-y divide-line rounded-2xl border border-line bg-milk text-sm">
                <div className="flex gap-4 p-4">
                  <dt className="w-20 shrink-0 text-ink-500">Phone</dt>
                  <dd className="flex-1">
                    {values.phone}
                    {values.email ? <span className="block text-ink-700">{values.email}</span> : null}
                  </dd>
                  <button type="button" onClick={() => goTo(0)} className="link text-sm">
                    Change
                  </button>
                </div>
                <div className="flex gap-4 p-4">
                  <dt className="w-20 shrink-0 text-ink-500">Deliver to</dt>
                  <dd className="flex-1">
                    {addressLines(values).map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </dd>
                  <button type="button" onClick={() => goTo(1)} className="link text-sm">
                    Change
                  </button>
                </div>
              </dl>

              <fieldset>
                <legend className="mb-3 text-lg font-semibold">Payment</legend>
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
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn btn-gold w-full text-lg sm:w-auto">
              {step === 0 ? "Continue to address" : step === 1 ? "Continue to review" : payment === "cod" ? `Place order, pay ${formatPrice(totals.total)} on delivery` : `Pay ${formatPrice(totals.total)}`}
            </button>
            {step > 0 ? (
              <button type="button" onClick={() => goTo(step - 1)} className="link">
                Back to {STEPS[step - 1].title.toLowerCase()}
              </button>
            ) : null}
          </div>
          {step === 2 ? (
            <p className="mt-4 flex items-center gap-2 text-xs text-ink-700">
              <Icon name="shield" className="size-4" /> Payments are encrypted and processed by our payment partner.
            </p>
          ) : null}
        </form>
      </div>

      {/* Order summary: always open beside the steps on wide screens, folded at the top on phones. */}
      <aside className="order-first h-fit rounded-3xl border border-line bg-milk p-5 lg:sticky lg:top-24 lg:order-none lg:p-6">
        <button type="button" onClick={() => setSummaryOpen((o) => !o)} aria-expanded={summaryOpen} className="flex w-full items-center justify-between gap-3 text-left lg:pointer-events-none">
          <span className="font-semibold">
            Your order <span className="font-normal text-ink-700">({totals.count} {totals.count === 1 ? "item" : "items"})</span>
          </span>
          <span className="flex items-center gap-2 font-bold tabular-nums">
            {formatPrice(totals.total)}
            <Icon name="chevronDown" className={`size-4 transition-transform lg:hidden ${summaryOpen ? "rotate-180" : ""}`} />
          </span>
        </button>
        <div className={`mt-5 space-y-6 ${summaryOpen ? "" : "hidden lg:block"}`}>
          <LineList lines={lines} />
          <CouponForm />
          <OrderSummary />
        </div>
      </aside>
    </div>
  );
}

function LineList({ lines }: { lines: CartLine[] }) {
  return (
    <ul className="space-y-3">
      {lines.map((l) => (
        <li key={l.key} className="flex items-center gap-3">
          <span className="relative shrink-0">
            <Image src={l.image} alt="" width={56} height={56} className="rounded-lg bg-oat" />
            <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-ink-900 text-xs text-cream">{l.qty}</span>
          </span>
          <span className="min-w-0 flex-1 text-sm">
            <span className="block truncate font-semibold">{l.name}</span>
            <span className="text-ink-700">{l.variantLabel}</span>
          </span>
          <span className="text-sm font-semibold tabular-nums">{formatPrice(l.price * l.qty)}</span>
        </li>
      ))}
    </ul>
  );
}

/** The thank-you page: a receipt of what was ordered, where it goes and how it is paid. */
function Receipt({ placed }: { placed: Placed }) {
  const { id, values, payment, lines, totals } = placed;
  const cod = payment === "cod";
  const method = PAYMENTS.find((p) => p.id === payment)?.label;
  return (
    <div className="mx-auto max-w-2xl" role="status">
      <Icon name="check" className="size-12 rounded-full bg-pasture-600 p-2 text-cream" />
      <h2 className="mt-5 font-display text-4xl sm:text-5xl">Thank you, {values.name?.split(" ")[0]}.</h2>
      <p className="mt-3 text-lg text-ink-800">
        Your order is confirmed. {cod ? `Keep ${formatPrice(totals.total)} in cash or UPI ready when it arrives.` : "Your payment is received."} We will send tracking details by SMS and WhatsApp when it ships, usually within 24 hours.
      </p>

      <section className="mt-8 rounded-3xl border border-line bg-milk p-5 sm:p-7" aria-label="Receipt">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
          <p className="font-display text-2xl">Receipt</p>
          <p className="text-sm text-ink-700">
            Order <strong className="text-ink-900">{id}</strong>
          </p>
        </div>
        <div className="py-5">
          <LineList lines={lines} />
        </div>
        <dl className="space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-700">Items</dt>
            <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
          </div>
          {totals.discount > 0 ? (
            <div className="flex justify-between">
              <dt className="text-ink-700">Coupon {totals.coupon?.code}</dt>
              <dd className="text-pasture-600 tabular-nums">−{formatPrice(totals.discount)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt className="text-ink-700">Shipping</dt>
            <dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base font-bold">
            <dt>{cod ? "To pay on delivery" : "Paid"}</dt>
            <dd className="tabular-nums">{formatPrice(totals.total)}</dd>
          </div>
        </dl>
        <dl className="mt-6 grid gap-5 border-t border-line pt-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-500">Delivering to</dt>
            <dd className="mt-1">
              {addressLines(values).map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <span className="block">{values.phone}</span>
            </dd>
          </div>
          <div>
            <dt className="text-ink-500">Payment</dt>
            <dd className="mt-1">{method}</dd>
          </div>
        </dl>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/track-order" className="btn btn-ink">
          Track your order
        </Link>
        <Link href="/blog/how-to-store-ghee" className="btn btn-line">
          How to store your ghee
        </Link>
      </div>
    </div>
  );
}
