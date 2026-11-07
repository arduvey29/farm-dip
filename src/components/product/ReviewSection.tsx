import type { Review } from "@/data/types";
import { formatDate } from "@/lib/format";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";

export function ReviewSection({ reviews, summary }: { reviews: Review[]; summary: { average: number; count: number; distribution: { stars: number; count: number }[] } }) {
  if (!summary.count) {
    return <p className="text-kattha-700">No reviews yet. Bought this ghee? Your review helps other families choose.</p>;
  }
  return (
    <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
      <div>
        <p className="font-display text-6xl leading-none">{summary.average.toFixed(1)}</p>
        <div className="mt-2">
          <Stars rating={summary.average} className="size-5" />
        </div>
        <p className="mt-1 text-sm text-kattha-700">
          Based on {summary.count} verified {summary.count === 1 ? "review" : "reviews"}
        </p>
        <dl className="mt-5 space-y-1.5">
          {summary.distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3 text-sm">
              <dt className="w-12 shrink-0">{d.stars} star</dt>
              <dd className="flex flex-1 items-center gap-2">
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-haldi-100">
                  <span className="block h-full rounded-full bg-haldi-500" style={{ width: `${(d.count / summary.count) * 100}%` }} />
                </span>
                <span className="w-6 text-right tabular-nums text-kattha-700">{d.count}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="divide-y divide-line border-y border-line">
        {reviews.map((r) => (
          <li key={r.id} className="py-6">
            <article>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Stars rating={r.rating} />
                <h3 className="font-semibold">{r.title}</h3>
              </div>
              <p className="mt-2 max-w-[68ch]">{r.body}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-kattha-700">
                <span className="font-semibold text-kattha-900">{r.author}</span>
                <span>{r.city}</span>
                <time dateTime={r.date}>{formatDate(r.date)}</time>
                {r.pack ? <span>Bought {r.pack}</span> : null}
                {r.verified ? (
                  <span className="inline-flex items-center gap-1 text-hara">
                    <Icon name="check" className="size-4" /> Verified buyer
                  </span>
                ) : null}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
