import type { QA } from "@/data/types";
import { Icon } from "./Icon";

/**
 * Accordion built on <details>, so answers are in the HTML for crawlers and work without JavaScript.
 * Questions are headings: answer engines treat question-shaped headings as extractable Q&A.
 */
export function Faq({ items, headingLevel = 3, name = "faq" }: { items: readonly QA[]; headingLevel?: 2 | 3; name?: string }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} name={name} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <H className="text-lg leading-snug font-semibold">{item.q}</H>
            <span className="mt-1 shrink-0 rounded-full border border-ink-200 p-1 transition-transform group-open:rotate-45">
              <Icon name="plus" className="size-4" />
            </span>
          </summary>
          <p className="max-w-[68ch] pb-6 text-ink-800">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
