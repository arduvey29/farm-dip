"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Variant } from "@/data/types";
import { formatPrice, percentOff, pricePerLitre } from "@/lib/format";
import { site } from "@/lib/site";
import { useCart } from "@/components/cart/CartProvider";
import { QtyStepper } from "@/components/cart/CartLines";
import { Icon } from "@/components/ui/Icon";
import { MilkMath } from "./MilkMath";
import { VARIANT_EVENT } from "./ProductGallery";

type Props = {
  slug: string;
  name: string;
  variants: Variant[];
  defaultVariant: string;
  milk?: { litresPerLitre: number; source: string };
};

const noopSubscribe = () => () => {};
const readPackParam = () => new URLSearchParams(window.location.search).get("pack");

export function PurchasePanel({ slug, name, variants, defaultVariant, milk }: Props) {
  const router = useRouter();
  const { add } = useCart();
  // Static HTML renders the default pack; a shared ?pack= link takes over after hydration.
  const urlPack = useSyncExternalStore(noopSubscribe, readPackParam, () => null);
  const [chosen, setChosen] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const validUrlPack = urlPack && variants.some((v) => v.id === urlPack) ? urlPack : null;
  const variantId = chosen ?? validUrlPack ?? defaultVariant;
  const variant = variants.find((v) => v.id === variantId) ?? variants[0];
  const off = percentOff(variant.price, variant.mrp);
  const multi = variants.length > 1;
  const basePerLitre = Math.max(...variants.map((v) => pricePerLitre(v.price, v.volumeMl)));

  // Show the matching image (e.g. jar) when arriving on a ?pack= link.
  useEffect(() => {
    const v = variants.find((x) => x.id === validUrlPack);
    if (v) window.dispatchEvent(new CustomEvent(VARIANT_EVENT, { detail: v.image }));
  }, [validUrlPack, variants]);

  // Mobile sticky bar appears once the main buttons scroll out of view.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function choose(v: Variant) {
    setChosen(v.id);
    const url = new URL(window.location.href);
    url.searchParams.set("pack", v.id);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new CustomEvent(VARIANT_EVENT, { detail: v.image }));
  }

  function line() {
    return { slug, variantId: variant.id, name, variantLabel: variant.label, price: variant.price, mrp: variant.mrp, image: variant.image, volumeMl: variant.volumeMl };
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-4xl font-bold tabular-nums">{formatPrice(variant.price)}</span>
          {off > 0 ? (
            <>
              <span className="text-ink-700">
                MRP <s>{formatPrice(variant.mrp)}</s>
              </span>
              <span className="rounded-full bg-spice-50 px-2.5 py-0.5 text-sm font-bold text-spice">{off}% off</span>
            </>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-ink-700">
          Inclusive of all taxes. {formatPrice(pricePerLitre(variant.price, variant.volumeMl))} per litre.
        </p>
      </div>

      {multi ? (
        <fieldset>
          <legend className="mb-3 font-semibold">Choose pack size</legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {variants.map((v) => {
              const perL = pricePerLitre(v.price, v.volumeMl);
              const saving = Math.round(((basePerLitre - perL) / basePerLitre) * 100);
              const selected = v.id === variant.id;
              return (
                <label
                  key={v.id}
                  className={`relative flex cursor-pointer flex-col rounded-2xl border-2 px-3.5 py-3 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-ghee-500 ${
                    selected ? "border-ink-900 bg-ink-50" : "border-line hover:border-ink-200"
                  } ${v.inStock ? "" : "opacity-50"}`}
                >
                  <input type="radio" name="pack" value={v.id} checked={selected} onChange={() => choose(v)} disabled={!v.inStock} className="sr-only" />
                  {v.bestValue ? <span className="absolute -top-2.5 right-3 rounded-full bg-ghee-500 px-2 text-xs font-bold text-ink-950">Best value</span> : null}
                  <span className="text-lg font-bold">{v.label}</span>
                  <span className="text-xs text-ink-700">{v.packaging}</span>
                  <span className="mt-1.5 font-semibold">{formatPrice(v.price)}</span>
                  <span className="text-xs text-ink-700">
                    {formatPrice(perL)}/L{saving > 0 ? <span className="font-semibold text-pasture-600"> save {saving}%</span> : null}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div ref={ctaRef} className="flex flex-wrap items-center gap-3">
        <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, Math.min(20, n)))} label={name} />
        <button
          type="button"
          onClick={(e) => add(line(), qty, { from: e.currentTarget })}
          disabled={!variant.inStock}
          className="btn btn-gold flex-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {variant.inStock ? "Add to cart" : "Out of stock"}
        </button>
        <button
          type="button"
          onClick={() => {
            add(line(), qty, { openDrawer: false });
            router.push("/checkout");
          }}
          disabled={!variant.inStock}
          className="min-h-12 w-full rounded-full bg-pasture-900 px-6 font-semibold text-oat hover:bg-pasture-800 disabled:opacity-50 sm:w-auto sm:flex-1"
        >
          Buy now
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <li className="flex items-center gap-2">
          <Icon name="cash" className="size-5 text-ghee-700" /> Free cash on delivery
        </li>
        <li className="flex items-center gap-2">
          <Icon name="truck" className="size-5 text-ghee-700" /> Ships within {site.commerce.dispatchHours} hours
        </li>
        <li className="flex items-center gap-2">
          <Icon name="leaf" className="size-5 text-ghee-700" /> No preservatives or additives
        </li>
        <li className="flex items-center gap-2">
          <Icon name="refresh" className="size-5 text-ghee-700" /> {site.commerce.returnWindowDays}-day quality promise
        </li>
      </ul>

      {milk ? <MilkMath volumeMl={variant.volumeMl} label={variant.label} {...milk} /> : null}

      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur transition-[transform,visibility] duration-300 lg:hidden ${
          showSticky ? "visible translate-y-0" : "invisible translate-y-full"
        }`}
        aria-hidden={!showSticky}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="text-sm">
              <span className="font-bold">{formatPrice(variant.price)}</span> <span className="text-ink-700">{variant.label}</span>
            </p>
          </div>
          <button
            type="button"
            tabIndex={showSticky ? 0 : -1}
            onClick={(e) => add(line(), qty, { from: e.currentTarget })}
            disabled={!variant.inStock}
            className="btn btn-gold"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
