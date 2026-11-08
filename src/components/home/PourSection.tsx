import { asset } from "@/lib/assets";
import { site } from "@/lib/site";
import { ProgressDriver } from "@/components/art/ProgressDriver";

/**
 * The brand's aim beside the pour: as the section scrolls up the screen, a brass pateela tips,
 * a stream of molten ghee reaches the jar, the jar fills and, right at the end, spills over the rim.
 * Scroll-tied parts read --p from trackProgress() in lib/motion. Without JavaScript the jar shows full.
 */
function PourArt() {
  return (
    <svg viewBox="0 0 400 480" className="w-full" aria-hidden focusable="false">
      <defs>
        <linearGradient id="pour-ghee" x1="0" x2="1">
          <stop offset="0" stopColor="#e09a1e" />
          <stop offset="0.4" stopColor="#f8c95a" />
          <stop offset="0.6" stopColor="#ffdf8c" />
          <stop offset="1" stopColor="#e09a1e" />
        </linearGradient>
        <linearGradient id="pour-brass" x1="0" x2="1">
          <stop offset="0" stopColor="#8c5f18" />
          <stop offset="0.45" stopColor="#e8bd5a" />
          <stop offset="1" stopColor="#7a5214" />
        </linearGradient>
        <clipPath id="pour-glass">
          <rect x="120" y="244" width="172" height="208" rx="26" />
        </clipPath>
      </defs>

      {/* Table and shadow. */}
      <ellipse cx="206" cy="458" rx="150" ry="10" fill="rgb(35 27 30 / 0.12)" />

      {/* The jar, open, filling from the bottom. */}
      <rect x="120" y="244" width="172" height="208" rx="26" fill="rgb(255 255 255 / 0.55)" />
      <g clipPath="url(#pour-glass)">
        <rect className="pour-fill" x="120" y="250" width="172" height="202" fill="url(#pour-ghee)" />
        <rect x="134" y="256" width="10" height="180" rx="5" fill="#fff" opacity="0.4" />
      </g>
      <rect x="120" y="244" width="172" height="208" rx="26" fill="none" stroke="var(--color-ink-900)" strokeOpacity="0.28" strokeWidth="2" />
      <rect x="128" y="232" width="156" height="16" rx="6" fill="rgb(255 255 255 / 0.7)" stroke="var(--color-ink-900)" strokeOpacity="0.28" strokeWidth="2" />
      <rect x="160" y="326" width="92" height="92" rx="14" fill="#fff6e0" stroke="var(--color-ink-900)" strokeOpacity="0.15" />
      <image href={asset("/images/brand/farm-dip-badge.svg")} x="176" y="332" width="60" height="69" />

      {/* Over the rim, and a little pool on the table. */}
      <path className="pour-spill" d="M282 236C300 242 300 262 298 296S294 420 300 452" pathLength={1} strokeDasharray="1 1" fill="none" stroke="url(#pour-ghee)" strokeWidth="11" strokeLinecap="round" />
      <ellipse className="pour-puddle" cx="306" cy="456" rx="34" ry="5" fill="#f2b53c" />

      {/* The stream, from the lip of the pateela into the jar. */}
      <path className="pour-stream" d="M178 98C194 122 204 172 206 238" pathLength={1} strokeDasharray="1 1" fill="none" stroke="url(#pour-ghee)" strokeWidth="11" strokeLinecap="round" />
      <g className="pour-splash" fill="#f8c95a">
        <circle cx="190" cy="232" r="4" />
        <circle cx="224" cy="230" r="3" />
        <circle cx="214" cy="222" r="2.4" />
      </g>

      {/* Brass pateela, tipping as you scroll. It turns about the lip, so the stream stays attached. */}
      <g className="pour-pot" style={{ transformOrigin: "178px 96px" }}>
        <g transform="translate(118 106)">
          <path d="M-60 -10C-62 40-40 66 0 66S62 40 60-10Z" fill="url(#pour-brass)" stroke="#5e3f0f" strokeWidth="2" />
          <ellipse cx="0" cy="-10" rx="60" ry="11" fill="#c99a3a" stroke="#5e3f0f" strokeWidth="2" />
          <ellipse cx="0" cy="-9" rx="52" ry="7" fill="#f6c14d" />
          <path d="M-50 18C-30 26 30 26 50 18" fill="none" stroke="#f8d47a" strokeWidth="2.4" opacity="0.7" />
        </g>
      </g>
    </svg>
  );
}

export function PourSection() {
  return (
    <section className="pour relative" data-progress="" aria-labelledby="aim">
      <ProgressDriver start={0.95} end={0.2} still={0.78} />
      <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-28">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <PourArt />
        </div>
        <div>
          <h2 id="aim" className="font-display text-4xl leading-[1.04] text-ink-900 sm:text-5xl lg:text-6xl">
            Pure, simple, rich and full of goodness.
          </h2>
          <blockquote className="mt-6 max-w-xl text-xl leading-relaxed text-ink-700">
            <p>{site.aim}</p>
          </blockquote>
          <p className="mt-3 text-sm font-medium text-ink-500">The {site.name} family</p>

          <figure className="mt-10 max-w-xl rounded-[2rem] bg-pasture-900 px-8 py-7 text-cream">
            <p lang="sa" className="font-deva text-5xl leading-tight font-semibold text-ghee-300 sm:text-6xl">
              आयुर्वै घृतम्
            </p>
            <figcaption className="mt-3 text-pasture-100">
              <span className="font-display text-xl text-cream italic">“Ghee, truly, is life.”</span>
              <span className="mt-1 block text-sm">An old Sanskrit saying, and the reason we make ours slowly.</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
