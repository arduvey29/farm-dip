"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { asset } from "@/lib/assets";
import { Icon } from "@/components/ui/Icon";

export interface FarmImage {
  src: string;
  alt: string;
}

interface FarmSlideshowProps {
  images: FarmImage[];
  interval?: number; // ms between slides, e.g. 4000
  delayOffset?: number; // initial delay offset before first advance
  aspectRatio?: string; // e.g. "aspect-[3/4]" or "aspect-[2/3]"
  className?: string;
  priorityFirst?: boolean;
  label?: string;
}

export function FarmSlideshow({
  images,
  interval = 4000,
  delayOffset = 0,
  aspectRatio = "aspect-[3/4] sm:aspect-[2/3]",
  className = "",
  priorityFirst = false,
  label,
}: FarmSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const total = images.length;

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;

    // Optional delay offset for staggered animations between multiple slideshows
    if (delayOffset > 0 && index === 0) {
      const initialTimeout = setTimeout(() => {
        nextSlide();
      }, delayOffset);
      return () => clearTimeout(initialTimeout);
    }

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, total, nextSlide, interval, delayOffset, index]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 40) {
      if (touchDeltaX.current < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setIsPaused(false);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border border-line/70 bg-oat shadow-md transition-all duration-300 hover:shadow-lg ${aspectRatio} ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label={label || "Farm photography slideshow"}
    >
      {/* Sliding Track */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={img.src} className="relative size-full min-w-full shrink-0">
            <Image
              src={asset(img.src)}
              alt={img.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
              priority={priorityFirst && i === 0}
            />
          </div>
        ))}
      </div>

      {/* Subtle top badge label if provided */}
      {label && (
        <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-ink-950/60 px-3 py-1 text-[0.7rem] font-medium text-cream backdrop-blur-xs">
          {label}
        </div>
      )}

      {/* Navigation arrows (desktop hover) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 grid size-8 place-items-center rounded-full bg-cream/80 text-ink-900 opacity-0 shadow-md backdrop-blur-xs transition-opacity duration-200 hover:bg-cream group-hover:opacity-100"
            aria-label="Previous photo"
          >
            <Icon name="chevronDown" className="size-4 rotate-90" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 grid size-8 place-items-center rounded-full bg-cream/80 text-ink-900 opacity-0 shadow-md backdrop-blur-xs transition-opacity duration-200 hover:bg-cream group-hover:opacity-100"
            aria-label="Next photo"
          >
            <Icon name="chevronDown" className="size-4 -rotate-90" />
          </button>
        </>
      )}

      {/* Slide indicators (dots / pills) */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-full bg-ink-950/50 px-2.5 py-1 backdrop-blur-xs">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`block rounded-full transition-all duration-300 ${
                i === index ? "h-1.5 w-4 bg-ghee-300" : "h-1.5 w-1.5 bg-cream/60 hover:bg-cream"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
