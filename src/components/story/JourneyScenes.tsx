/*
  The six scenes of the ghee journey, painted in the same folk style as Rani the buffalo.
  Each scene sits on the shared sky (.journey-sky) and only loops while it is the active step.
  Scroll-tied parts read --sp, the progress through the current step, set by JourneyDriver.
*/
import { Buffalo } from "@/components/art/Buffalo";
import { GheeJar } from "@/components/art/GheeJar";

const box = { viewBox: "0 0 400 400", preserveAspectRatio: "xMidYMax slice", className: "absolute inset-0 size-full", "aria-hidden": true, focusable: "false" } as const;

function Flame({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="flicker" style={{ animationDelay: `${delay}s` }}>
        <path d="M0 0C-12 -8 -10 -22 0 -36C10 -22 12 -8 0 0Z" fill="var(--color-genda)" />
        <path d="M0 0C-6 -5 -5 -13 0 -22C5 -13 6 -5 0 0Z" fill="var(--color-haldi-300)" />
      </g>
    </g>
  );
}

function Lota({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path d="M-12 -24C-12 -30 -16 -32 -18 -34H18C16 -32 12 -30 12 -24Z" fill="#c99a3a" stroke="#7a5a1c" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="26" fill="#d9a943" stroke="#7a5a1c" strokeWidth="1.5" />
      <path d="M-20 -8C-8 -2 8 -2 20 -8" fill="none" stroke="#f8d47a" strokeWidth="2" opacity="0.8" />
      <ellipse cx="0" cy="-34" rx="19" ry="5" fill="#b8862b" stroke="#7a5a1c" strokeWidth="1.5" />
    </g>
  );
}

/** Rani wallows in the village johad (pond) with her egret, as buffaloes love to do. */
export function PondScene() {
  return (
    <>
      <svg {...box}>
        <circle cx="318" cy="86" r="26" fill="#fff4cf" stroke="#fcdb7e" strokeWidth="3" />
        <path d="M0 236C80 222 160 232 240 222C300 216 360 226 400 220V400H0Z" fill="#a3b356" />
        <g fill="#5f7d2a">
          <circle cx="40" cy="214" r="22" />
          <circle cx="66" cy="222" r="14" />
          <circle cx="360" cy="206" r="18" />
          <circle cx="336" cy="214" r="11" />
        </g>
        <path d="M0 262C90 250 300 250 400 262V400H0Z" fill="#5f8f86" />
        <path d="M30 276C120 268 280 268 370 276" stroke="#9cc4b8" strokeWidth="2" fill="none" opacity="0.7" />
      </svg>
      <Buffalo className="absolute bottom-[4%] left-1/2 w-[80%] max-w-[26rem] -translate-x-1/2" />
      {/* Water in front of her legs, with ripples and lotus pads. */}
      <div className="absolute inset-x-0 bottom-0 h-[21%] bg-[linear-gradient(rgb(84_135_128/0.9),rgb(46_92_92/0.97))]">
        <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden focusable="false">
          <g fill="none" stroke="#bfe0d4" strokeWidth="1.6" strokeLinecap="round">
            <ellipse className="ripple" cx="120" cy="10" rx="40" ry="4" />
            <ellipse className="ripple" cx="280" cy="14" rx="46" ry="4.5" style={{ animationDelay: "-1.2s" }} />
            <ellipse className="ripple" cx="200" cy="30" rx="60" ry="5" style={{ animationDelay: "-2.1s" }} />
          </g>
          <g>
            <ellipse cx="54" cy="46" rx="16" ry="5" fill="#4f7d2c" />
            <ellipse cx="344" cy="56" rx="18" ry="5.5" fill="#4f7d2c" />
            <path d="M344 50c-4-8 0-14 0-14s4 6 0 14Zm0 0c-6-4-10-4-12-2 3 4 8 4 12 2Zm0 0c6-4 10-4 12-2-3 4-8 4-12 2Z" fill="#f4a7c0" />
          </g>
        </svg>
      </div>
    </>
  );
}

export function MilkScene() {
  return (
    <svg {...box}>
      <defs>
        <linearGradient id="milk-brass" x1="0" x2="1">
          <stop offset="0" stopColor="#9a6e1f" />
          <stop offset="0.45" stopColor="#e8bd5a" />
          <stop offset="1" stopColor="#8c5f18" />
        </linearGradient>
      </defs>
      <circle cx="84" cy="262" r="40" fill="#fff1c4" />
      <path d="M0 262H400V400H0Z" fill="#c98b55" />
      <path d="M0 290C120 284 280 286 400 292M0 330C140 322 260 324 400 332" stroke="#b47744" strokeWidth="2" fill="none" />

      {/* Clay chulha with a low fire. */}
      <path d="M120 372C118 340 122 318 132 304H268C278 318 282 340 280 372Z" fill="#a8552e" stroke="#6e3216" strokeWidth="2" />
      <path d="M176 372C176 348 186 336 200 336S224 348 224 372Z" fill="#2a0e0a" />
      <Flame x={200} y={368} s={0.7} />
      <Flame x={188} y={370} s={0.45} delay={-0.3} />
      <Flame x={212} y={370} s={0.5} delay={-0.5} />

      {/* Brass pateela of buffalo milk, boiled slowly so the malai rises. */}
      <path d="M128 232C126 272 142 304 200 306S274 272 272 232Z" fill="url(#milk-brass)" stroke="#7a5a1c" strokeWidth="2" />
      <ellipse cx="200" cy="232" rx="72" ry="14" fill="#c99a3a" stroke="#7a5a1c" strokeWidth="2" />
      <ellipse cx="200" cy="234" rx="62" ry="9" fill="#fff3d6" />
      {/* Thick malai wrinkles over buffalo milk. */}
      <path d="M150 233c8-3 14 2 22-1s14 3 22 0 14 2 22-1 14 3 22 0" fill="none" stroke="#ecd9a8" strokeWidth="1.6" strokeLinecap="round" />
      <g fill="#fff" stroke="#efe3c8">
        <circle className="bubble" cx="176" cy="234" r="3" />
        <circle className="bubble" cx="214" cy="236" r="2.5" style={{ animationDelay: "-0.6s" }} />
        <circle className="bubble" cx="236" cy="232" r="2" style={{ animationDelay: "-1.1s" }} />
      </g>
      <g fill="none" stroke="#fff8ec" strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <path className="steam" d="M160 214c-8-10 8-16 0-28" />
        <path className="steam" d="M244 214c-8-10 8-16 0-28" style={{ animationDelay: "-1.6s" }} />
      </g>

      {/* Fresh milk poured from a brass lota. */}
      <path d="M128 112Q176 128 192 234" fill="none" stroke="#fffaf0" strokeWidth="8" strokeLinecap="round" />
      <path className="milk-flow" d="M128 112Q176 128 192 234" fill="none" stroke="#eadfc6" strokeWidth="3" strokeDasharray="5 9" strokeLinecap="round" />
      <Lota transform="translate(100 130) rotate(60)" />
    </svg>
  );
}

export function CurdScene() {
  const stars = [
    [40, 50, 1.6], [96, 30, 1.2], [150, 70, 1.8], [220, 34, 1.3], [286, 60, 1.7], [350, 28, 1.2], [372, 96, 1.6],
    [60, 120, 1.2], [250, 110, 1.4], [330, 150, 1.2], [180, 130, 1.1], [120, 176, 1.3],
  ];
  return (
    <svg {...box}>
      <defs>
        <linearGradient id="curd-clay" x1="0" x2="1">
          <stop offset="0" stopColor="#7a3418" />
          <stop offset="0.45" stopColor="#c8723e" />
          <stop offset="1" stopColor="#6e2e14" />
        </linearGradient>
        <radialGradient id="curd-glow">
          <stop offset="0" stopColor="#f8d47a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f8d47a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="#fff6d6">
        {stars.map(([x, y, r], i) => (
          <circle key={i} className="twinkle" cx={x} cy={y} r={r} style={{ animationDelay: `${-i * 0.37}s` }} />
        ))}
      </g>
      <g className="journey-moon">
        <path d="M70 128A24 24 0 1 0 70 176A18 24 0 1 1 70 128Z" fill="#fff1c4" />
      </g>
      <path d="M0 300H400V400H0Z" fill="#2e120e" />
      <path d="M0 300H400" stroke="#5a2a1c" strokeWidth="2" />
      <circle cx="84" cy="318" r="56" fill="url(#curd-glow)" />

      <rect x="124" y="330" width="152" height="14" rx="3" fill="#6e3b1c" />
      <path d="M150 210C110 230 108 300 140 322C165 338 235 338 260 322C292 300 290 230 250 210Z" fill="url(#curd-clay)" stroke="#4a1e0c" strokeWidth="2" />
      <path d="M164 212C166 200 170 194 176 192H224C230 194 234 200 236 212Z" fill="#a24f26" stroke="#4a1e0c" strokeWidth="2" />
      <path d="M126 262l12 8 12-8 12 8 12-8 12 8 12-8 12 8 12-8 12 8 12-8 12 8 12-8 12 8" fill="none" stroke="#f8ead0" strokeWidth="2" strokeLinejoin="round" opacity="0.85" />
      <path d="M134 284H266" stroke="#f8ead0" strokeWidth="1.4" strokeDasharray="2 5" strokeLinecap="round" opacity="0.7" />
      {/* Muslin tied over the mouth while the curd sets. */}
      <path d="M166 198C170 178 230 178 234 198L238 208C214 214 186 214 162 208Z" fill="#f3ead6" stroke="#cbbd9c" strokeWidth="1.2" />
      <path d="M164 203C188 208 212 208 236 203" stroke="var(--color-lal-700)" strokeWidth="2.4" fill="none" />

      <g transform="translate(84 330)">
        <Flame x={0} y={-8} s={0.42} />
        <path d="M-22 -6c5 11 12 16 22 16s17-5 22-16c-7 3-15 4.5-22 4.5S-15 -3 -22 -6Z" fill="#b5653a" />
      </g>
    </svg>
  );
}

export function ChurnScene() {
  return (
    <svg {...box}>
      <defs>
        <linearGradient id="churn-clay" x1="0" x2="1">
          <stop offset="0" stopColor="#7a3418" />
          <stop offset="0.45" stopColor="#d27c44" />
          <stop offset="1" stopColor="#6e2e14" />
        </linearGradient>
        <clipPath id="churn-rod">
          <rect x="193" y="64" width="14" height="186" rx="4" />
        </clipPath>
      </defs>
      <circle cx="70" cy="70" r="30" fill="#fff1c4" opacity="0.9" />
      <path d="M0 330H400V400H0Z" fill="#b9773f" />

      {/* Wooden post; the madhani is held upright by a rope loop. */}
      <rect x="300" y="0" width="22" height="336" fill="#7a4220" />
      <path d="M305 0V336M314 0V336" stroke="#5e3018" strokeWidth="1.2" />
      <path d="M206 98H302" stroke="#c9a26a" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="200" cy="98" rx="11" ry="4" fill="none" stroke="#c9a26a" strokeWidth="4" />

      <path d="M120 256C76 290 84 370 130 392C160 404 240 404 270 392C316 370 324 290 280 256Z" fill="url(#churn-clay)" stroke="#4a1e0c" strokeWidth="2" />
      <path d="M128 330l14 9 14-9 14 9 14-9 14 9 14-9 14 9 14-9 14 9 14-9 14 9" fill="none" stroke="#f8ead0" strokeWidth="2" opacity="0.85" />
      <ellipse cx="200" cy="252" rx="70" ry="15" fill="#9e4a22" stroke="#4a1e0c" strokeWidth="2" />
      <ellipse cx="200" cy="254" rx="60" ry="10" fill="#fbf6ea" />
      <g className="churn-twist" fill="none" stroke="#e3d6b8" strokeWidth="1.6" strokeLinecap="round">
        <path d="M160 255c10-5 26-6 34-2M206 257c10 3 24 2 32-3" />
      </g>
      <g fill="#fff1b8" stroke="#e8c86a" strokeWidth="1">
        <ellipse className="bob" cx="174" cy="252" rx="9" ry="4" />
        <ellipse className="bob" cx="226" cy="256" rx="8" ry="3.6" style={{ animationDelay: "-0.5s" }} />
        <ellipse className="bob" cx="214" cy="248" rx="5" ry="2.6" style={{ animationDelay: "-0.9s" }} />
      </g>
      <g fill="#fbf6ea">
        <circle className="bubble" cx="182" cy="240" r="2.2" />
        <circle className="bubble" cx="220" cy="238" r="2" style={{ animationDelay: "-0.7s" }} />
      </g>

      {/* The madhani: grooves slide to show it spinning one way, then the other. */}
      <rect x="193" y="64" width="14" height="190" rx="4" fill="#9a6232" stroke="#4a2410" strokeWidth="1.4" />
      <g clipPath="url(#churn-rod)">
        <g className="churn-twist" stroke="#5e3018" strokeWidth="2">
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M${170 + i * 5} 64l30 186`} />
          ))}
        </g>
      </g>
      <circle cx="200" cy="60" r="9" fill="#9a6232" stroke="#4a2410" strokeWidth="1.4" />

      {/* The neti rope, wound on the madhani and pulled in turn by two hands out of frame. */}
      <g className="churn-pull" fill="none" strokeLinecap="round">
        <path d="M194 156Q110 170 -10 204M206 168Q290 180 410 214" stroke="#7a5a2c" strokeWidth="6" />
        <path d="M194 156Q110 170 -10 204M206 168Q290 180 410 214" stroke="#e0c084" strokeWidth="3.4" />
        <path d="M192 150l16 6M192 158l16 6M192 166l16 6" stroke="#e0c084" strokeWidth="3.4" />
      </g>
    </svg>
  );
}

export function CookScene() {
  return (
    <svg {...box}>
      <defs>
        <radialGradient id="cook-glow" cx="0.5" cy="0.8" r="0.6">
          <stop offset="0" stopColor="#f07c12" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f07c12" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#cook-glow)" />
      <path d="M100 400V318C100 306 110 300 122 300H278C290 300 300 306 300 318V400Z" fill="#8e4626" stroke="#5e2a12" strokeWidth="2" />
      <path d="M160 400V362C160 342 176 332 200 332S240 342 240 362V400Z" fill="#1a0806" />
      <path d="M168 392l64 -10M170 382l60 12" stroke="#6b3a1c" strokeWidth="7" strokeLinecap="round" />
      <Flame x={200} y={384} s={1.1} />
      <Flame x={182} y={388} s={0.7} delay={-0.4} />
      <Flame x={218} y={388} s={0.75} delay={-0.2} />
      <Flame x={112} y={304} s={0.5} delay={-0.6} />
      <Flame x={288} y={304} s={0.5} delay={-0.1} />

      {/* Iron kadhai; the makkhan melts and turns golden as you scroll. */}
      <path d="M92 258C96 296 140 316 200 316S304 296 308 258Z" fill="#2f2622" stroke="#120a08" strokeWidth="2" />
      <path d="M78 262c0-10 10-12 16-6M322 262c0-10-10-12-16-6" fill="none" stroke="#2f2622" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="200" cy="258" rx="108" ry="16" fill="#45362f" stroke="#120a08" strokeWidth="2" />
      <ellipse className="ghee-melt" cx="200" cy="260" rx="96" ry="12" />
      <g fill="#fffaf0">
        <ellipse className="makkhan-melt" cx="170" cy="257" rx="20" ry="7" />
        <ellipse className="makkhan-melt" cx="230" cy="262" rx="15" ry="6" />
      </g>
      <g fill="#fff3c4" opacity="0.9">
        {[150, 176, 204, 232, 256, 190, 220].map((x, i) => (
          <circle key={x} className="bubble" cx={x} cy={258 + (i % 3) * 2} r={2 + (i % 2)} style={{ animationDelay: `${-i * 0.27}s` }} />
        ))}
      </g>
      <g fill="none" stroke="#f8d47a" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <path className="steam" d="M150 232c-10-12 10-20 0-34" />
        <path className="steam" d="M200 226c-10-12 10-20 0-34" style={{ animationDelay: "-1.2s" }} />
        <path className="steam" d="M250 232c-10-12 10-20 0-34" style={{ animationDelay: "-2.3s" }} />
      </g>
      <g className="stir" style={{ transformOrigin: "290px 110px" }}>
        <path d="M290 110L222 256" stroke="#9a6232" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="218" cy="260" rx="13" ry="5" fill="#7a4a24" />
      </g>
    </svg>
  );
}

export function JarScene() {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg {...box}>
      <g className="spin-slow" fill="#fff6d6" opacity="0.4">
        {rays.map((deg) => (
          <path key={deg} d="M200 130l10-150h-20Z" transform={`rotate(${deg} 200 210)`} />
        ))}
      </g>
      <rect x="0" y="316" width="400" height="84" fill="#8a5a2b" />
      <rect x="0" y="312" width="400" height="8" fill="#a8703a" />
      <path d="M0 340H400M0 366H400" stroke="#76491f" strokeWidth="1.4" />

      {/* Ghee strained through muslin into the jar, then the lid is tied on and it is stamped pure. */}
      <g className="pour-scroll">
        <path d="M237 83Q226 120 200 200" fill="none" stroke="var(--color-haldi-500)" strokeWidth="6" strokeLinecap="round" />
        <path className="milk-flow" d="M237 83Q226 120 200 200" fill="none" stroke="#fff3c4" strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />
        <path d="M166 196C178 210 222 210 234 196L240 190H160Z" fill="#f6efe0" stroke="#d8ccb0" strokeWidth="1.2" />
      </g>
      <Lota transform="translate(262 96) rotate(-62)" />
      <GheeJar id="journey-jar" fill="scroll" x={140} y={160} width={120} height={163} />

      <g className="stamp-scroll">
        <circle cx="306" cy="262" r="32" fill="#fff8ec" stroke="var(--color-lal-700)" strokeWidth="2.5" strokeDasharray="5 3" />
        <circle cx="306" cy="262" r="26" fill="none" stroke="var(--color-lal-700)" strokeWidth="1.2" />
        <text x="306" y="259" textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fill="var(--color-lal-700)">
          100%
        </text>
        <text x="306" y="276" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fill="var(--color-lal-700)" lang="hi">
          शुद्ध
        </text>
      </g>
    </svg>
  );
}

export const journeyScenes = [PondScene, MilkScene, CurdScene, ChurnScene, CookScene, JarScene];
