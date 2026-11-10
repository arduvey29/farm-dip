"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const VARIANT_EVENT = "pdp:variant-image";

export function ProductGallery({ images, name }: { images: { src: string; alt: string }[]; name: string }) {
  const [active, setActive] = useState(0);

  // The purchase panel announces the selected pack's image (e.g. 500 ml jar vs 5 L jar).
  useEffect(() => {
    const onVariant = (e: Event) => {
      const src = (e as CustomEvent<string>).detail;
      const i = images.findIndex((img) => img.src === src);
      if (i >= 0) setActive(i);
    };
    window.addEventListener(VARIANT_EVENT, onVariant);
    return () => window.removeEventListener(VARIANT_EVENT, onVariant);
  }, [images]);

  const current = images[active];

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      {images.length > 1 ? (
        <ul className="scrollbar-none flex gap-3 overflow-x-auto md:w-20 md:flex-col md:overflow-visible" aria-label={`${name} images`}>
          {images.map((img, i) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}: ${img.alt}`}
                aria-current={i === active}
                className={`block overflow-hidden rounded-xl border-2 bg-oat ${i === active ? "border-ink-900" : "border-transparent hover:border-ink-200"}`}
              >
                <Image src={img.src} alt="" width={80} height={80} className="size-16 object-cover md:size-[4.5rem]" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex-1">
        <div className="overflow-hidden rounded-[2rem] bg-oat">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={1200}
            height={1200}
            preload={active === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[5/6] w-full animate-fade-in object-cover"
          />
        </div>
      </div>
    </div>
  );
}
