"use client";

import { useState } from "react";
import type { Review } from "@/data/types";
import { SectionTitle } from "@/components/ui/Ornament";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";

interface HomeReviewsProps {
  quotes: Review[];
  overall: {
    average: number;
    count: number;
  };
}

export function HomeReviews({ quotes, overall }: HomeReviewsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-oat transition-all duration-300" aria-labelledby="reviews">
      <div className={`wrap transition-all duration-300 ${isOpen ? "py-12 sm:py-14 lg:py-20" : "py-8 sm:py-10 lg:py-12"}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="cursor-pointer select-none transition-opacity hover:opacity-85"
            >
              <SectionTitle id="reviews" title="What families say" size="md" />
            </div>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className={`grid size-9 sm:size-10 shrink-0 place-items-center rounded-full border border-line bg-milk text-ink-900 shadow-xs transition-all duration-300 hover:border-ghee-500 hover:bg-ghee-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghee-500 ${
                isOpen ? "rotate-180 bg-ghee-400 text-ink-950 border-ghee-500 shadow-sm" : ""
              }`}
              aria-expanded={isOpen}
              aria-controls="home-reviews-list"
              aria-label={isOpen ? "Hide customer reviews" : "Show customer reviews"}
            >
              <Icon name="chevronDown" className="size-4 sm:size-5 transition-transform duration-300" />
            </button>
          </div>

          {overall.count ? (
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-2 text-sm select-none transition-opacity hover:opacity-85"
            >
              <Stars rating={overall.average} className="size-4" />
              <span className="font-semibold">{overall.average.toFixed(1)} out of 5</span>
              <span className="text-ink-700">from {overall.count} reviews</span>
            </div>
          ) : null}
        </div>

        {/* Collapsible container with smooth height and opacity transition */}
        <div
          id="home-reviews-list"
          className={`grid transition-all duration-500 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            {/* A swipeable row on phones, three columns on wider screens. */}
            <ul className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-10 sm:overflow-visible sm:px-0 sm:pb-0">
              {quotes.map((r) => (
                <li key={r.id} className="w-[80%] shrink-0 snap-start sm:w-auto">
                  <figure className="flex h-full flex-col border-l-2 border-ghee-400 pl-4">
                    <Stars rating={r.rating} className="size-4" />
                    <blockquote className="mt-3 text-sm leading-relaxed text-ink-800 sm:text-base">
                      &ldquo;{r.body}&rdquo;
                    </blockquote>
                    <figcaption className="mt-auto pt-4 text-xs font-semibold text-ink-700">
                      {r.author}, {r.city}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
