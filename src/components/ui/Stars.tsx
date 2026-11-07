const STAR = "M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9L12 2.8Z";

export function Stars({ rating, className = "size-4" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <svg key={i} viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
            <defs>
              <linearGradient id={`s${i}-${Math.round(fill * 100)}`}>
                <stop offset={fill} stopColor="var(--color-haldi-500)" />
                <stop offset={fill} stopColor="var(--color-line)" />
              </linearGradient>
            </defs>
            <path d={STAR} fill={`url(#s${i}-${Math.round(fill * 100)})`} />
          </svg>
        );
      })}
    </span>
  );
}

export function RatingInline({ average, count, href }: { average: number; count: number; href?: string }) {
  if (!count) return null;
  const body = (
    <span className="inline-flex items-center gap-2 text-sm">
      <Stars rating={average} />
      <span className="font-semibold">{average.toFixed(1)}</span>
      <span className="text-kattha-700">
        ({count} {count === 1 ? "review" : "reviews"})
      </span>
    </span>
  );
  return href ? (
    <a href={href} className="underline-offset-4 hover:underline">
      {body}
    </a>
  ) : (
    body
  );
}
