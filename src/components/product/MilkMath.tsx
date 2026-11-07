"use client";

import { useEffect, useRef, useState } from "react";
import { countUp } from "@/lib/motion";

const LITRES_PER_CAN = 5;

/** Eases the shown number to a new value when the pack size changes. */
function useCountUp(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(
    () =>
      countUp(from.current, value, (v) => {
        from.current = v;
        setShown(v);
      }),
    [value],
  );
  return shown;
}

function MilkCan({ part = 1 }: { part?: number }) {
  return (
    <svg viewBox="0 0 16 20" className="h-5 w-4" aria-hidden focusable="false">
      <path d="M5 2h6v3l2 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8l2-3Z" fill={part >= 1 ? "#fffaf0" : "#e3cfa6"} />
      {part < 1 ? <rect x="3.5" y={18.5 - 10 * part} width="9" height={10 * part} fill="#fffaf0" /> : null}
      <path d="M5 2h6v3l2 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8l2-3Z" fill="none" stroke="var(--color-kattha-700)" strokeWidth="1" />
      <path d="M4 1.5h8" stroke="var(--color-kattha-700)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** "What goes into this pack": the milk behind the selected pack size, counted up in 5-litre cans. */
export function MilkMath({ volumeMl, label, litresPerLitre, source }: { volumeMl: number; label: string; litresPerLitre: number; source: string }) {
  const litres = (volumeMl / 1000) * litresPerLitre;
  const shown = useCountUp(litres);
  const full = Math.floor(litres / LITRES_PER_CAN);
  const rest = litres / LITRES_PER_CAN - full;
  return (
    <section className="frame-peetal rounded-2xl bg-chandan p-4 sm:p-5" aria-labelledby="milk-math">
      <p lang="hi" className="font-hand text-rani">
        इस डिब्बे में क्या है
      </p>
      <h2 id="milk-math" className="font-display text-xl leading-snug text-kattha-800">
        What goes into one {label} pack
      </h2>
      <dl className="mt-3 grid grid-cols-3 gap-3 border-y border-line py-3 text-center">
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-kattha-700">{source}</dt>
          <dd className="font-display text-2xl text-kattha-900 tabular-nums">{Math.round(shown)} L</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-kattha-700">set as dahi</dt>
          <dd className="font-display text-2xl text-kattha-900">1 night</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-kattha-700">churning and slow cooking</dt>
          <dd className="font-display text-2xl text-kattha-900">3 to 4 h</dd>
        </div>
      </dl>
      <div className="mt-3 flex flex-wrap gap-0.5" aria-hidden>
        {Array.from({ length: full }, (_, i) => (
          <MilkCan key={i} />
        ))}
        {rest > 0.05 ? <MilkCan part={rest} /> : null}
      </div>
      <p className="mt-1 text-xs text-kattha-700">Each can is {LITRES_PER_CAN} litres of milk.</p>
    </section>
  );
}
