"use client";

import { useState } from "react";
import { sampleBatches } from "@/data/lab";
import { formatDate } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

/** PLACEHOLDER: look batches up from your report store and link the real PDF. */
export function BatchLookup() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<(typeof sampleBatches)[number] | null | "missing">(null);

  return (
    <div className="frame-peetal rounded-2xl bg-paper p-6 text-maroon-900 sm:p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const found = sampleBatches.find((b) => b.batch.toLowerCase() === code.trim().toLowerCase());
          setResult(found ?? "missing");
        }}
      >
        <label htmlFor="batch" className="font-semibold">
          Batch number
        </label>
        <p className="text-sm text-maroon-700">Printed on the jar lid or back label, for example {sampleBatches[0].batch}.</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            id="batch"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder={sampleBatches[0].batch}
            className="min-h-12 flex-1 rounded-full border border-maroon-200 px-5 uppercase"
            autoComplete="off"
          />
          <button type="submit" className="min-h-12 rounded-full bg-haldi-500 px-6 font-semibold text-maroon-950 hover:bg-haldi-400">
            Find report
          </button>
        </div>
      </form>

      <div aria-live="polite">
        {result === "missing" ? (
          <p className="mt-4 text-kumkum">No report found for {code}. Check the number on your jar, or WhatsApp us a photo of the label and we will send the report.</p>
        ) : result ? (
          <div className="mt-5 rounded-2xl bg-chandan p-5">
            <p className="flex items-center gap-2 font-semibold text-mehndi">
              <Icon name="check" /> {result.status}
            </p>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-maroon-700">Product</dt>
                <dd className="font-semibold">{result.product}</dd>
              </div>
              <div>
                <dt className="text-maroon-700">Packed on</dt>
                <dd className="font-semibold">{formatDate(result.packed)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-maroon-700">Tested by</dt>
                <dd className="font-semibold">{result.lab}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-maroon-700">Full PDF report coming soon. Results for this batch are in the table below.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
