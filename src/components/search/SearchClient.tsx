"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type SearchDoc = { type: "Product" | "Guide" | "Question"; title: string; text: string; href: string; terms: string };

function score(doc: SearchDoc, words: string[]) {
  let s = 0;
  const title = doc.title.toLowerCase();
  for (const w of words) {
    if (title.includes(w)) s += 3;
    if (doc.terms.includes(w)) s += 1;
  }
  return words.every((w) => doc.terms.includes(w) || title.includes(w)) ? s : 0;
}

export function SearchClient({ docs }: { docs: SearchDoc[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    if (!words.length) return [];
    return docs
      .map((d) => ({ d, s: score(d, words) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.d);
  }, [docs, query]);

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(`/search?q=${encodeURIComponent(query)}`);
        }}
        className="relative max-w-2xl"
      >
        <label htmlFor="q" className="sr-only">
          Search ghee, guides and questions
        </label>
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-5 size-6 -translate-y-1/2 text-kattha-500" />
        <input
          id="q"
          name="q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “buffalo ghee” or “smoke point”"
          autoFocus
          className="min-h-14 w-full rounded-full border-2 border-kattha-200 pr-5 pl-14 text-lg focus:border-kattha-900"
        />
      </form>

      <div className="mt-10" aria-live="polite">
        {query.trim().length > 1 ? (
          results.length ? (
            <>
              <p className="text-sm text-kattha-700">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
              </p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {results.map((r) => (
                  <li key={r.href + r.title}>
                    <Link href={r.href} className="block py-5 hover:bg-chandan sm:px-3">
                      <span className="text-xs font-semibold text-haldi-800">{r.type}</span>
                      <span className="mt-0.5 block text-lg font-semibold">{r.title}</span>
                      <span className="mt-1 line-clamp-2 block text-kattha-700">{r.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-lg">
              Nothing matches “{query}”. Try a simpler word like “buffalo”, “5 L” or “storage”, or{" "}
              <Link href="/shop" className="font-semibold underline underline-offset-4">
                browse all ghee
              </Link>
              .
            </p>
          )
        ) : null}
      </div>
    </div>
  );
}
