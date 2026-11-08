"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const STORAGE_KEY = "farmdip-pincode";

/**
 * PLACEHOLDER estimate by pincode prefix. Replace with your courier's serviceability API
 * (Shiprocket, Delhivery, etc.) before launch.
 */
function estimateDays(pin: string): [number, number] {
  const p2 = Number(pin.slice(0, 2));
  const p3 = Number(pin.slice(0, 3));
  if ((p2 >= 11 && p2 <= 16) || p3 === 201) return [1, 3]; // Delhi, Haryana, Punjab, NCR: close to the farm (PLACEHOLDER: match your real dispatch point)
  if ([110, 400, 411, 560, 600, 700, 500, 380].includes(p3)) return [2, 4]; // metros
  if (p2 >= 78 && p2 <= 79) return [6, 9]; // North East
  if (p2 >= 18 && p2 <= 19) return [5, 8]; // Jammu and Kashmir, Ladakh
  return [4, 7];
}

function addWorkingDays(from: Date, days: number) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) added++;
  }
  return d;
}

const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

export function PincodeCheck() {
  const [pin, setPin] = useState("");
  const [result, setResult] = useState<{ ok: true; text: string } | { ok: false; text: string } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) check(saved, false);
    } catch {}
  }, []);

  function check(value: string, save = true) {
    setPin(value);
    if (!/^[1-9][0-9]{5}$/.test(value)) {
      setResult({ ok: false, text: "Enter a valid 6-digit pincode." });
      return;
    }
    const [min, max] = estimateDays(value);
    const now = new Date();
    setResult({ ok: true, text: `Delivery to ${value} between ${fmt(addWorkingDays(now, min))} and ${fmt(addWorkingDays(now, max))}. Cash on delivery available.` });
    if (save) {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {}
    }
  }

  return (
    <div className="rounded-2xl border border-line p-4">
      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          check(pin);
        }}
      >
        <div className="relative flex-1">
          <label htmlFor="pincode" className="mb-1.5 block text-sm font-semibold">
            Check delivery date
          </label>
          <Icon name="pin" className="pointer-events-none absolute bottom-3 left-3.5 size-5 text-ink-500" />
          <input
            id="pincode"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            placeholder="6-digit pincode"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="min-h-11 w-full rounded-full border border-ink-200 pr-3 pl-10"
          />
        </div>
        <button type="submit" className="min-h-11 rounded-full bg-ink-100 px-5 font-semibold hover:bg-ink-200">
          Check
        </button>
      </form>
      {result ? (
        <p role="status" className={`mt-3 flex gap-2 text-sm ${result.ok ? "text-pasture-600" : "text-spice"}`}>
          <Icon name={result.ok ? "truck" : "close"} className="mt-0.5 size-4 shrink-0" />
          {result.text}
        </p>
      ) : null}
    </div>
  );
}
