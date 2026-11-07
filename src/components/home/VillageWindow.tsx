import { Buffalo } from "@/components/art/Buffalo";
import { GheeJar } from "@/components/art/GheeJar";
import { Pausable } from "@/components/art/Pausable";
import { BuffaloHello } from "./BuffaloHello";

/**
 * Dawn over a Haryana village: rising sun, birds, a mud house, a neem tree,
 * a bitoda (the painted dung-cake store every village has) and a field of yellow sarson.
 */
function VillageDawn({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 14 }, (_, i) => i * (360 / 14));
  const sarson = Array.from({ length: 42 }, (_, i) => [(i * 37) % 400, 300 + ((i * 53) % 34)]);
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="dawn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ef7f3a" />
          <stop offset="0.42" stopColor="#f8c264" />
          <stop offset="0.68" stopColor="#fde6b8" />
        </linearGradient>
        <radialGradient id="dawn-glow">
          <stop offset="0" stopColor="#fff6d6" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff6d6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="url(#dawn-sky)" />

      <g className="sun-rise">
        <circle cx="292" cy="250" r="92" fill="url(#dawn-glow)" />
        <g className="spin-slow" fill="#fff4cf" opacity="0.55">
          {rays.map((deg) => (
            <path key={deg} d="M292 198l4 -36h-8Z" transform={`rotate(${deg} 292 250)`} />
          ))}
        </g>
        <circle cx="292" cy="250" r="36" fill="#fff1c4" stroke="#fcdb7e" strokeWidth="3" />
      </g>

      <g className="birds" fill="none" stroke="var(--color-kattha-900)" strokeWidth="1.6" strokeLinecap="round">
        <path className="flap" d="M40 120q5-5 10 0q5-5 10 0" />
        <path className="flap" d="M66 106q4-4 8 0q4-4 8 0" style={{ animationDelay: "-0.2s" }} />
        <path className="flap" d="M84 128q4-4 8 0q4-4 8 0" style={{ animationDelay: "-0.35s" }} />
      </g>

      {/* Flat Haryana horizon with a mud house far off. */}
      <path d="M0 292C90 286 190 290 280 284C330 281 370 284 400 283V340H0Z" fill="#d79a5c" opacity="0.75" />
      <g transform="translate(330 252)">
        <rect x="0" y="12" width="44" height="26" fill="#c98a4b" />
        <path d="M-4 12h52l-4-8H0Z" fill="#8e5a2c" />
        <rect x="18" y="22" width="9" height="16" fill="#5e3418" />
        <path d="M4 18h8M32 18h8" stroke="#f6e7c9" strokeWidth="1.4" />
      </g>

      {/* Sarson ke khet: a yellow mustard field. */}
      <path d="M0 300C100 294 220 298 400 292V340H0Z" fill="#c9b13a" />
      <g fill="#ffd93b">
        {sarson.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" />
        ))}
      </g>
      <path d="M0 330C80 314 170 322 240 314C300 308 360 318 400 312V500H0Z" fill="#8c9b45" />

      {/* Neem tree. */}
      <g>
        <path d="M44 360C46 320 48 290 46 252L56 252C55 290 57 322 62 360Z" fill="var(--color-kattha-800)" />
        <path d="M50 280l-18-22M52 290l20-18" stroke="var(--color-kattha-800)" strokeWidth="4" strokeLinecap="round" />
        <g fill="#4f6b24">
          <circle cx="50" cy="216" r="50" />
          <circle cx="12" cy="238" r="28" />
          <circle cx="90" cy="236" r="28" />
        </g>
        <g fill="#6c8a32">
          <circle cx="40" cy="202" r="32" />
          <circle cx="82" cy="222" r="16" />
        </g>
        <g fill="#8fae45">
          {[
            [28, 190], [52, 182], [70, 204], [18, 216], [44, 226], [66, 244], [92, 230], [8, 246], [36, 250],
          ].map(([x, y]) => (
            <path key={`${x}-${y}`} d={`M${x} ${y}c3-4 7-4 10 0-3 4-7 4-10 0Z`} />
          ))}
        </g>
      </g>

      {/* Bitoda: dung cakes stacked into a cone, plastered and painted. */}
      <g transform="translate(108 270)">
        <path d="M0 64V40C0 24 14 8 28 0C42 8 56 24 56 40V64Z" fill="#b5804d" stroke="#7a4e26" strokeWidth="1.4" />
        <path d="M6 44l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6" fill="none" stroke="#fff4dc" strokeWidth="1.6" />
        <circle cx="28" cy="26" r="5" fill="none" stroke="var(--color-rani)" strokeWidth="1.6" />
        <g fill="#fff4dc">
          <circle cx="16" cy="54" r="1.6" />
          <circle cx="28" cy="56" r="1.6" />
          <circle cx="40" cy="54" r="1.6" />
        </g>
      </g>

      <path d="M0 380C100 366 220 372 400 362V500H0Z" fill="#74872f" />
      <g stroke="#4f6b24" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M150 400l-3-9M155 401l1-10M160 400l3-8M250 396l-2-8M255 396l1-9M330 392l-3-8M335 392l2-9M60 404l-2-8M65 404l2-9" />
      </g>
      <g fill="var(--color-genda)">
        <circle cx="157" cy="389" r="2.6" />
        <circle cx="254" cy="386" r="2.6" />
        <circle cx="64" cy="394" r="2.6" />
      </g>
    </svg>
  );
}

function Diya({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 50" className={className} aria-hidden focusable="false">
      <ellipse cx="30" cy="46" rx="22" ry="3" fill="rgb(42 14 10 / 0.35)" />
      <g className="flicker">
        <path d="M30 2c5 7 6 12 3 17-1.6 2.6-4.4 2.6-6 0-3-5-2-10 3-17Z" fill="var(--color-genda)" />
        <path d="M30 8c2.6 4 3 7 1.4 9.6-.7 1.1-2.1 1.1-2.8 0C27 15 27.4 12 30 8Z" fill="var(--color-haldi-300)" />
      </g>
      <path d="M6 26c5 11 13 17 24 17s19-6 24-17c-8 3-16 4.5-24 4.5S14 29 6 26Z" fill="#b5653a" />
      <path d="M6 26c8 3 16 4.5 24 4.5S46 29 54 26" fill="none" stroke="#7a3a1c" strokeWidth="1.6" />
      <path d="M14 33h32" stroke="#fcdb7e" strokeWidth="1.4" strokeDasharray="1 3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The hero window: a jharokha arch looking out on a village at dawn, with Rani the buffalo
 * (and her egret) in front, and a jar of ghee and a diya on the sill. Tap Rani to say hello.
 */
export function VillageWindow() {
  return (
    <Pausable className="arch aspect-[4/5] bg-peetal p-[5px]" data-hello-scene="">
      <div className="arch relative size-full overflow-hidden">
        <VillageDawn className="absolute inset-0 size-full" />
        <Buffalo className="absolute bottom-[15%] -left-[3%] w-[76%]" />
        <div className="absolute inset-x-0 bottom-0 h-[12%] border-t-4 border-double border-peetal bg-lal-800 bg-[radial-gradient(circle,var(--color-lal-700)_1.5px,transparent_2px)] bg-[length:14px_14px]" />
        <Diya className="absolute bottom-[7%] left-[4%] w-[17%]" />
        <span className="absolute bottom-[8%] left-[23%] size-2.5 rounded-full bg-genda" aria-hidden />
        <span className="absolute bottom-[9.5%] left-[26%] size-2 rounded-full bg-haldi-400" aria-hidden />
        <GheeJar id="hero-jar" className="absolute right-[4%] bottom-[6.5%] w-[25%] drop-shadow-[0_10px_12px_rgb(42_14_10/0.35)]" />
        <BuffaloHello className="bottom-[16%] left-0 h-[46%] w-[72%]" />
      </div>
    </Pausable>
  );
}
