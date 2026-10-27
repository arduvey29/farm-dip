"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

const STAGES = ["Order confirmed", "Packed", "Shipped", "Out for delivery", "Delivered"];

/** PLACEHOLDER: replace with a call to your courier aggregator's tracking API. */
export function TrackOrderForm() {
  const [stage, setStage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const input = "min-h-12 w-full rounded-xl border border-maroon-200 bg-white px-4";

  return (
    <div className="rounded-3xl border border-line p-6 sm:p-8">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const order = String(data.get("order") ?? "").trim();
          const phone = String(data.get("phone") ?? "").trim();
          if (!/^GD[A-Z0-9]{4,}$/i.test(order)) {
            setError("Order numbers start with GD, for example GDLX3K9A.");
            setStage(null);
            return;
          }
          if (!/^[6-9]\d{9}$/.test(phone)) {
            setError("Enter the 10-digit mobile number used for the order.");
            setStage(null);
            return;
          }
          setError(null);
          setStage(2);
        }}
      >
        <div>
          <label htmlFor="order" className="mb-1.5 block text-sm font-semibold">
            Order number
          </label>
          <input id="order" name="order" className={`${input} uppercase`} placeholder="GDLX3K9A" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="t-phone" className="mb-1.5 block text-sm font-semibold">
            Mobile number
          </label>
          <input id="t-phone" name="phone" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" className={input} />
        </div>
        {error ? (
          <p role="alert" className="text-sm text-kumkum">
            {error}
          </p>
        ) : null}
        <button type="submit" className="min-h-12 rounded-full bg-maroon-900 px-7 font-semibold text-chandan hover:bg-maroon-800">
          Track order
        </button>
      </form>

      {stage !== null ? (
        <ol className="mt-8 space-y-4" aria-label="Order progress">
          {STAGES.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className={`grid size-8 place-items-center rounded-full ${i <= stage ? "bg-mehndi text-chandan" : "border-2 border-line text-maroon-500"}`}>
                {i <= stage ? <Icon name="check" className="size-4" /> : i + 1}
              </span>
              <span className={i <= stage ? "font-semibold" : "text-maroon-700"}>{s}</span>
              {i === stage ? <span className="text-sm text-maroon-700">(current)</span> : null}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
