"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-ink-200" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" onClick={() => onChange(value - 1)} className="rounded-full p-2 hover:bg-oat" aria-label="Decrease quantity">
        <Icon name="minus" className="size-4" />
      </button>
      <span className="min-w-8 text-center font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" onClick={() => onChange(value + 1)} className="rounded-full p-2 hover:bg-oat" aria-label="Increase quantity">
        <Icon name="plus" className="size-4" />
      </button>
    </div>
  );
}

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { lines, setQty, remove } = useCart();
  return (
    <ul className="divide-y divide-line">
      {lines.map((line) => (
        <li key={line.key} className="flex gap-4 py-4">
          <Link href={`/products/${line.slug}?pack=${line.variantId}`} className="shrink-0">
            <Image src={line.image} alt="" width={compact ? 72 : 96} height={compact ? 72 : 96} className="rounded-xl bg-oat" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex justify-between gap-3">
              <div className="min-w-0">
                <Link href={`/products/${line.slug}?pack=${line.variantId}`} className="font-semibold leading-snug hover:underline">
                  {line.name}
                </Link>
                <p className="text-sm text-ink-700">{line.variantLabel}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatPrice(line.price * line.qty)}</p>
                {line.mrp > line.price ? <s className="text-xs text-ink-500">{formatPrice(line.mrp * line.qty)}</s> : null}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <QtyStepper value={line.qty} onChange={(n) => setQty(line.key, n)} label={`${line.name} ${line.variantLabel}`} />
              <button type="button" onClick={() => remove(line.key)} className="inline-flex items-center gap-1 text-sm text-ink-700 underline-offset-4 hover:underline">
                <Icon name="trash" className="size-4" /> Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
