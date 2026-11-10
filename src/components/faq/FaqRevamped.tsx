"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { GheeDropMark } from "@/components/ui/Ornament";
import type { QA } from "@/data/types";

export interface FaqGroup {
  id: string;
  title: string;
  items: QA[];
}

const CATEGORY_ICONS: Record<string, IconName> = {
  all: "fileText",
  ghee: "leaf",
  delivery: "truck",
  payment: "cash",
  returns: "shield",
  storage: "clock",
};

const SUGGESTED_QUERIES = [
  "buffalo vs cow",
  "lactose",
  "refund policy",
  "delivery time",
  "shelf life",
  "smoke point",
];

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <mark
            key={i}
            className="rounded bg-ghee-300/90 px-1 py-0.5 font-semibold text-ink-950"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function FaqRevamped({ faqGroups }: { faqGroups: FaqGroup[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    // Keep the very first question open initially as an invitation
    [faqGroups[0]?.items[0]?.q || ""]: true,
  });

  // Flatten all items with their category metadata
  const allItemsWithGroup = useMemo(() => {
    return faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        ...item,
        groupId: group.id,
        groupTitle: group.title,
      }))
    );
  }, [faqGroups]);

  // Filter items based on active category and search query
  const filteredItems = useMemo(() => {
    let items = allItemsWithGroup;

    if (activeCategory !== "all") {
      items = items.filter((item) => item.groupId === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q) ||
          item.groupTitle.toLowerCase().includes(q)
      );
    }

    return items;
  }, [allItemsWithGroup, activeCategory, searchQuery]);

  // Toggle single accordion item
  const toggleItem = (question: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [question]: !prev[question],
    }));
  };

  // Expand or collapse all currently visible items
  const allVisibleOpen = useMemo(() => {
    if (filteredItems.length === 0) return false;
    return filteredItems.every((item) => openItems[item.q]);
  }, [filteredItems, openItems]);

  const toggleAllVisible = () => {
    if (allVisibleOpen) {
      setOpenItems({});
    } else {
      const next: Record<string, boolean> = {};
      filteredItems.forEach((item) => {
        next[item.q] = true;
      });
      setOpenItems(next);
    }
  };

  // When a search query is typed, automatically open the first 2 matching results
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const matches = allItemsWithGroup.filter(
        (item) =>
          item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      );
      if (matches.length > 0) {
        setOpenItems((prev) => {
          const next = { ...prev };
          matches.slice(0, 3).forEach((m) => {
            next[m.q] = true;
          });
          return next;
        });
      }
    }
  };

  const handleChipClick = (term: string) => {
    handleSearchChange(term);
  };

  return (
    <div className="relative pb-24">
      {/* Subtle atmospheric ambient glow */}
      <div
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 size-96 rounded-full bg-ghee-300/20 blur-3xl"
        aria-hidden="true"
      />

      {/* CREATIVE HERO SECTION */}
      <section className="relative mx-auto max-w-4xl pt-6 pb-10 text-center sm:pt-10 sm:pb-14">
        {/* Animated Rotating Purity Seal Badge */}
        <div className="mx-auto mb-6 flex items-center justify-center">
          <div className="relative size-16 shrink-0 sm:size-20">
            <svg
              viewBox="0 0 200 200"
              className="size-full animate-[spin_24s_linear_infinite]"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="faqSealPath"
                  d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                />
              </defs>
              <text
                fontSize="13.5"
                fontWeight="bold"
                letterSpacing="3.5"
                fill="var(--color-pasture-800)"
              >
                <textPath href="#faqSealPath" startOffset="0%">
                  • CLARITY & TRUTH • FARM DIP ANSWERS •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid size-9 place-items-center rounded-full bg-ghee-400 text-ink-950 shadow-sm sm:size-10">
                <GheeDropMark className="size-4 text-ink-950" />
              </div>
            </div>
          </div>
        </div>

        <h1 className="font-display text-4xl leading-[1.04] text-ink-950 sm:text-5xl lg:text-6xl">
          Everything you wondered, answered.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-700 sm:text-lg">
          Clear, honest facts on our buffalo milk sourcing, traditional bilona churning, national doorstep delivery, and lab-tested purity.
        </p>

        {/* MINIMALIST INTERACTIVE SEARCH BAR */}
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="group relative flex items-center rounded-2xl border-2 border-line bg-milk px-4 py-2.5 shadow-sm transition-all duration-300 focus-within:border-ghee-500 focus-within:bg-white focus-within:shadow-md sm:px-5 sm:py-3.5">
            <Icon
              name="search"
              className="size-5 shrink-0 text-ink-400 transition-colors group-focus-within:text-ghee-700"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by topic (e.g. 'buffalo milk', 'lactose', 'refund', 'storage')..."
              className="ml-3 w-full bg-transparent text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none sm:text-base"
              aria-label="Search questions"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="ml-2 rounded-lg p-1 text-ink-400 hover:bg-oat hover:text-ink-900"
                aria-label="Clear search"
              >
                <Icon name="close" className="size-4" />
              </button>
            )}
          </div>

          {/* Quick topic pills */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-ink-600">
            <span className="font-semibold text-ink-800">Popular:</span>
            {SUGGESTED_QUERIES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleChipClick(term)}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  searchQuery.toLowerCase() === term.toLowerCase()
                    ? "bg-ghee-400 font-semibold text-ink-950"
                    : "bg-oat/70 hover:bg-oat text-ink-700 hover:text-ink-950"
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER TABS & BULK EXPAND TOGGLE */}
      <div className="mx-auto mb-8 max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Horizontally scrollable category pills */}
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 sm:text-sm ${
                activeCategory === "all"
                  ? "bg-ink-950 text-cream shadow-sm scale-100"
                  : "border border-line/80 bg-milk text-ink-700 hover:bg-oat hover:text-ink-950"
              }`}
            >
              <span>All Questions</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[0.68rem] font-bold ${
                  activeCategory === "all"
                    ? "bg-cream/20 text-cream"
                    : "bg-oat text-ink-800"
                }`}
              >
                {allItemsWithGroup.length}
              </span>
            </button>

            {faqGroups.map((group) => {
              const isActive = activeCategory === group.id;
              const iconName = CATEGORY_ICONS[group.id] || "tag";
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveCategory(group.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 sm:text-sm ${
                    isActive
                      ? "bg-ink-950 text-cream shadow-sm"
                      : "border border-line/80 bg-milk text-ink-700 hover:bg-oat hover:text-ink-950"
                  }`}
                >
                  <Icon name={iconName} className="size-3.5" />
                  <span>{group.title}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[0.68rem] font-bold ${
                      isActive
                        ? "bg-cream/20 text-cream"
                        : "bg-oat text-ink-800"
                    }`}
                  >
                    {group.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Tools: Results Count & Expand All */}
          <div className="flex items-center justify-between gap-4 border-t border-line/60 pt-2 text-xs text-ink-600 sm:border-0 sm:pt-0">
            <span className="font-medium">
              Showing <strong className="text-ink-950">{filteredItems.length}</strong> of {allItemsWithGroup.length}
            </span>

            {filteredItems.length > 0 && (
              <button
                type="button"
                onClick={toggleAllVisible}
                className="inline-flex items-center gap-1 font-semibold text-ink-800 underline underline-offset-4 hover:text-ghee-800"
              >
                <span>{allVisibleOpen ? "Collapse all" : "Expand all"}</span>
                <Icon
                  name={allVisibleOpen ? "minus" : "plus"}
                  className="size-3"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ACCORDION QUESTIONS LIST */}
      <div className="mx-auto max-w-4xl">
        {filteredItems.length === 0 ? (
          /* EMPTY SEARCH RESULTS STATE */
          <div className="rounded-3xl border-2 border-dashed border-line bg-milk p-10 text-center sm:p-14">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-oat text-ink-600">
              <Icon name="search" className="size-7" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-ink-950">
              No matching questions found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-700 sm:text-base">
              We couldn&apos;t find any answer matching &ldquo;
              <strong className="text-ink-950">{searchQuery}</strong>&rdquo;. Try searching for another keyword or reach out directly.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="btn btn-ink"
              >
                Reset search
              </button>
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-oat px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-ghee-300"
              >
                <Icon name="whatsapp" className="size-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredItems.map((item, idx) => {
              const isOpen = !!openItems[item.q];

              return (
                <div
                  key={item.q}
                  className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-ghee-400 bg-white shadow-md ring-1 ring-ghee-400/30"
                      : "border-line/80 bg-milk hover:border-ghee-300 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.q)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-start justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      {/* Monospace index counter */}
                      <span className="mt-1 font-mono text-xs font-semibold text-ghee-700/80 sm:text-sm">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div>
                        {/* Subtle category tag */}
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-oat/80 px-2 py-0.5 text-[0.65rem] font-bold tracking-wider text-ink-600 uppercase">
                            {item.groupTitle}
                          </span>
                        </div>

                        {/* Question text */}
                        <h2 className="font-display text-lg font-bold leading-snug text-ink-950 transition-colors group-hover:text-ghee-800 sm:text-xl md:text-2xl">
                          {highlightMatch(item.q, searchQuery)}
                        </h2>
                      </div>
                    </div>

                    {/* Animated circular indicator icon */}
                    <div
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 sm:size-10 ${
                        isOpen
                          ? "rotate-45 border-ink-950 bg-ink-950 text-cream shadow-sm"
                          : "border-line bg-oat/60 text-ink-800 group-hover:border-ghee-400 group-hover:bg-ghee-300/50"
                      }`}
                    >
                      <Icon name="plus" className="size-4" />
                    </div>
                  </button>

                  {/* Expanded Answer Body with Smooth Revelation */}
                  {isOpen && (
                    <div className="animate-fade-in border-t border-line/60 px-5 pt-4 pb-6 pl-11 sm:px-6 sm:pt-4 sm:pb-7 sm:pl-14">
                      <p className="max-w-3xl text-base leading-relaxed text-ink-800 sm:text-lg">
                        {highlightMatch(item.a, searchQuery)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MINIMALIST CREATIVE HELP FOOTER BANNER */}
      <section className="mx-auto mt-16 max-w-4xl" aria-label="Still need assistance">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-milk to-oat/70 p-6 shadow-sm sm:p-10 lg:p-12">
          {/* Ambient decorative blob */}
          <div
            className="pointer-events-none absolute -right-16 -bottom-16 size-64 rounded-full bg-ghee-300/25 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-widest text-ghee-800 uppercase">
                Direct Help & Questions
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
                Still have a question we didn&apos;t answer?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-700 sm:text-base">
                Ask us directly on WhatsApp or phone. We are always happy to talk about our buffaloes, batch testing reports, or bulk orders.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-pasture-900 px-5 py-3.5 text-sm font-semibold text-cream shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-pasture-800"
              >
                <Icon name="whatsapp" className="size-4 text-ghee-300" />
                <span>WhatsApp us</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-2xl border border-line bg-milk px-5 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-200 hover:border-ink-900 hover:bg-white"
              >
                <span>Contact page</span>
                <Icon name="arrowRight" className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
