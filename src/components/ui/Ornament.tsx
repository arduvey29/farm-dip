/* Decorative motifs drawn in SVG so they stay crisp and take theme colours. All are aria-hidden. */

const petal = (r: number, len: number, w: number) => `M200 ${200 - r} C ${200 + w} ${200 - r - len * 0.35}, ${200 + w * 0.6} ${200 - r - len * 0.85}, 200 ${200 - r - len} C ${200 - w * 0.6} ${200 - r - len * 0.85}, ${200 - w} ${200 - r - len * 0.35}, 200 ${200 - r} Z`;

function Ring({ count, r, len, w, stroke, fill, offset = 0 }: { count: number; r: number; len: number; w: number; stroke: string; fill?: string; offset?: number }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={petal(r, len, w)} transform={`rotate(${(360 / count) * i + offset} 200 200)`} fill={fill ?? "none"} stroke={stroke} strokeWidth={1.6} />
      ))}
    </g>
  );
}

/** Rangoli-style mandala. Rotates very slowly where motion is allowed. */
export function Mandala({ className = "", spin = false }: { className?: string; spin?: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className={`${className} ${spin ? "animate-mandala" : ""}`} aria-hidden focusable="false">
      <circle cx="200" cy="200" r="196" fill="none" stroke="var(--color-peetal)" strokeWidth="1.5" strokeDasharray="2 6" />
      <circle cx="200" cy="200" r="186" fill="none" stroke="var(--color-peetal)" strokeWidth="1" opacity="0.7" />
      <Ring count={32} r={150} len={34} w={9} stroke="var(--color-peetal)" />
      <Ring count={16} r={112} len={40} w={20} stroke="var(--color-haldi-400)" fill="rgb(232 163 12 / 0.08)" />
      <Ring count={16} r={112} len={26} w={10} stroke="var(--color-genda)" offset={11.25} />
      <circle cx="200" cy="200" r="108" fill="none" stroke="var(--color-peetal)" strokeWidth="1.2" />
      <Ring count={12} r={58} len={48} w={22} stroke="var(--color-haldi-300)" fill="rgb(179 32 26 / 0.12)" />
      <circle cx="200" cy="200" r="54" fill="none" stroke="var(--color-peetal)" strokeWidth="1.2" />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return <circle key={i} cx={200 + Math.cos(a) * 170} cy={200 + Math.sin(a) * 170} r="2.6" fill="var(--color-haldi-400)" />;
      })}
      <Ring count={8} r={14} len={36} w={14} stroke="var(--color-haldi-400)" fill="rgb(240 124 18 / 0.25)" />
      <circle cx="200" cy="200" r="10" fill="var(--color-lal-700)" stroke="var(--color-haldi-400)" strokeWidth="2" />
    </svg>
  );
}

/** Lotus between two rules. Sits under section headings. */
export function LotusRule({ className = "", align = "left" }: { className?: string; align?: "left" | "center" }) {
  return (
    <div className={`flex items-center gap-3 text-peetal ${align === "center" ? "justify-center" : ""} ${className}`} aria-hidden>
      {align === "center" ? <span className="h-px w-16 bg-current" /> : null}
      <svg viewBox="0 0 40 20" className="h-4 w-8 shrink-0" focusable="false">
        <path d="M20 2c3 4 3 9 0 14-3-5-3-10 0-14Z" fill="var(--color-lal-700)" />
        <path d="M20 16c-2-5-6-8-11-8 1 5 5 8 11 8Zm0 0c2-5 6-8 11-8-1 5-5 8-11 8Z" fill="var(--color-haldi-500)" />
        <path d="M20 16c-4-2-10-2-14 0 4 2 10 2 14 0Zm0 0c4-2 10-2 14 0-4 2-10 2-14 0Z" fill="currentColor" />
      </svg>
      <span className="h-px w-24 bg-current sm:w-40" />
      <span className="size-1.5 rotate-45 bg-current" />
    </div>
  );
}

export function DiyaIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <path d="M24 6c4 6 5 10 2.5 14-1.3 2-3.7 2-5 0C19 16 20 12 24 6Z" fill="var(--color-genda)" />
      <path d="M24 11c2 3.5 2.4 6 1 8-.6.9-1.4.9-2 0-1.4-2-1-4.5 1-8Z" fill="var(--color-haldi-300)" />
      <path d="M6 26c4 9 11 13 18 13s14-4 18-13c-6 2.5-12 3.5-18 3.5S12 28.5 6 26Z" fill="var(--color-haldi-500)" />
      <path d="M6 26c6 2.5 12 3.5 18 3.5s12-1 18-3.5" fill="none" stroke="var(--color-haldi-800)" strokeWidth="1.5" />
    </svg>
  );
}

/** Section heading with a Hindi line above and a lotus rule below. */
export function SectionTitle({
  id,
  hindi,
  title,
  tone = "light",
  align = "left",
  size = "lg",
}: {
  id?: string;
  hindi?: string;
  title: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  size?: "md" | "lg";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {hindi ? (
        <p lang="hi" className={`font-hand text-xl sm:text-2xl ${dark ? "text-haldi-300" : "text-rani"}`}>
          {hindi}
        </p>
      ) : null}
      <h2 id={id} className={`font-display leading-[1.08] text-balance ${size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"} ${dark ? "text-chandan" : "text-kattha-800"}`}>
        {title}
      </h2>
      <LotusRule className="mt-4" align={align} />
    </div>
  );
}
