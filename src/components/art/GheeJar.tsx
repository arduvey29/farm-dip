/*
  A glass jar of creamy white buffalo ghee with a green cloth tied over the lid and the Farm Dip badge as its label.
  `fill="scroll"` ties the ghee level to the ghee journey's scroll progress (--sp).
*/
import { asset } from "@/lib/assets";

const grains: [number, number, number][] = [
  [30, 150, 2.2], [44, 132, 1.6], [58, 160, 2], [72, 140, 1.4], [88, 156, 2.4], [102, 136, 1.8], [114, 152, 1.5],
  [36, 114, 1.4], [52, 96, 1.8], [96, 104, 1.6], [110, 90, 2], [26, 84, 1.6], [64, 76, 1.2], [118, 70, 1.4],
];

export function GheeJar({ id, className = "", fill = "full", ...svg }: { id: string; className?: string; fill?: "full" | "scroll" } & Omit<React.SVGProps<SVGSVGElement>, "fill">) {
  const hem = Array.from({ length: 8 }, (_, i) => `Q${14 + i * 14 + 7} 58 ${14 + (i + 1) * 14} 50`).join("");
  return (
    <svg viewBox="0 0 140 190" className={className} aria-hidden focusable="false" {...svg}>
      <defs>
        <linearGradient id={`${id}-ghee`} x1="0" x2="1">
          <stop offset="0" stopColor="#d9c18a" />
          <stop offset="0.35" stopColor="#f3e6c4" />
          <stop offset="0.62" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#d9c18a" />
        </linearGradient>
        <clipPath id={`${id}-glass`}>
          <rect x="16" y="44" width="108" height="134" rx="18" />
        </clipPath>
      </defs>
      <ellipse cx="70" cy="182" rx="58" ry="6" fill="rgb(42 14 10 / 0.25)" />
      <rect x="16" y="44" width="108" height="134" rx="18" fill="rgb(255 255 255 / 0.5)" />
      <g clipPath={`url(#${id}-glass)`}>
        <g className={fill === "scroll" ? "jar-fill-scroll" : undefined}>
          <rect x="16" y="56" width="108" height="122" fill={`url(#${id}-ghee)`} />
          <g fill="#e3d2a6" opacity="0.7">
            {grains.map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
            ))}
          </g>
        </g>
        <rect x="27" y="50" width="8" height="120" rx="4" fill="#fff" opacity="0.35" />
      </g>
      <rect x="16" y="44" width="108" height="134" rx="18" fill="none" stroke="var(--color-ink-900)" strokeOpacity="0.3" strokeWidth="1.5" />
      <image href={asset("/images/brand/farm-dip-badge.svg")} x="37" y="74" width="66" height="76" />
      <rect x="16" y="154" width="108" height="14" fill="var(--color-ink-900)" />
      <path d="M16 156.5h108M16 165.5h108" stroke="var(--color-brass)" strokeWidth="0.8" />

      {/* Cloth tied over the lid with twine. In the journey it is tied on once the jar is full. */}
      <g className={fill === "scroll" ? "lid-scroll" : undefined}>
      <path d="M18 26Q70 2 122 26L126 50H14Z" fill="var(--color-pasture-700)" />
      <path d={`M12 50${hem}`} fill="var(--color-pasture-700)" stroke="var(--color-ghee-400)" strokeWidth="1.6" />
      <g fill="var(--color-ghee-300)" opacity="0.85">
        <circle cx="40" cy="24" r="1.6" />
        <circle cx="62" cy="18" r="1.6" />
        <circle cx="86" cy="20" r="1.6" />
        <circle cx="106" cy="28" r="1.6" />
        <circle cx="30" cy="40" r="1.6" />
        <circle cx="54" cy="36" r="1.6" />
        <circle cx="78" cy="34" r="1.6" />
        <circle cx="100" cy="40" r="1.6" />
      </g>
      <rect x="13" y="40" width="114" height="4" rx="2" fill="var(--color-brass)" />
      <path d="M104 44q4 12-2 22M106 44q8 10 6 20" fill="none" stroke="var(--color-brass)" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
