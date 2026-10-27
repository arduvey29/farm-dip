import { GirCow } from "@/components/art/GirCow";
import { GheeJar } from "@/components/art/GheeJar";
import { Pausable } from "@/components/art/Pausable";
import { CowHello } from "./CowHello";

/** Dawn over the goshala: sky, rising sun, birds, a hill temple, a kadamba tree and pasture. */
function DawnSky({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 14 }, (_, i) => i * (360 / 14));
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="dawn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0a24c" />
          <stop offset="0.45" stopColor="#f8cd85" />
          <stop offset="0.7" stopColor="#fde7bd" />
        </linearGradient>
        <radialGradient id="dawn-glow">
          <stop offset="0" stopColor="#fff6d6" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff6d6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="url(#dawn-sky)" />

      <g className="sun-rise">
        <circle cx="290" cy="248" r="92" fill="url(#dawn-glow)" />
        <g className="spin-slow" fill="#fff4cf" opacity="0.55">
          {rays.map((deg) => (
            <path key={deg} d="M290 196l4 -36h-8Z" transform={`rotate(${deg} 290 248)`} />
          ))}
        </g>
        <circle cx="290" cy="248" r="36" fill="#fff1c4" stroke="#f8d47a" strokeWidth="3" />
      </g>

      <g className="birds" fill="none" stroke="var(--color-maroon-900)" strokeWidth="1.6" strokeLinecap="round">
        <path className="flap" d="M40 120q5-5 10 0q5-5 10 0" />
        <path className="flap" d="M66 106q4-4 8 0q4-4 8 0" style={{ animationDelay: "-0.2s" }} />
        <path className="flap" d="M84 128q4-4 8 0q4-4 8 0" style={{ animationDelay: "-0.35s" }} />
      </g>

      <path d="M0 300C60 272 110 288 160 274C220 258 280 284 340 268C370 262 390 268 400 272V340H0Z" fill="#dc9b5e" opacity="0.7" />
      {/* A small hill temple with its flag in the breeze. */}
      <g fill="#a85a35" transform="translate(96 0)">
        <rect x="112" y="262" width="16" height="13" />
        <path d="M112 262C113 250 117 242 120 236C123 242 127 250 128 262Z" />
        <circle cx="120" cy="234" r="1.8" fill="var(--color-haldi-500)" />
        <path d="M120 234V220" stroke="#a85a35" strokeWidth="1.2" />
        <path className="flag" d="M120 220l11 3-11 3Z" fill="var(--color-kumkum)" />
      </g>
      <path d="M0 330C80 306 170 318 240 308C300 300 360 312 400 306V500H0Z" fill="#8c9b45" />

      {/* Kadamba tree, painted the Pichwai way: a dense round crown studded with golden flowers. */}
      <g>
        <path d="M44 360C46 320 48 290 46 250L56 250C55 290 57 322 62 360Z" fill="var(--color-maroon-800)" />
        <g fill="#4f6b24">
          <circle cx="50" cy="214" r="52" />
          <circle cx="12" cy="236" r="30" />
          <circle cx="92" cy="232" r="30" />
        </g>
        <g fill="#6c8a32">
          <circle cx="40" cy="200" r="34" />
          <circle cx="82" cy="220" r="18" />
        </g>
        <g fill="var(--color-haldi-400)">
          {[
            [30, 186], [56, 178], [74, 200], [20, 214], [46, 222], [70, 240], [96, 226], [10, 244], [36, 248], [62, 202],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" />
          ))}
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
      <path d="M14 33h32" stroke="#f8d47a" strokeWidth="1.4" strokeDasharray="1 3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The hero window: a jharokha arch looking out on a goshala at dawn, with Gauri the Gir cow
 * in the pasture and a jar of ghee and a diya on the sill. Tap Gauri to say hello.
 */
export function GoshalaWindow() {
  return (
    <Pausable className="arch aspect-[4/5] bg-peetal p-[5px]" data-cow-scene="">
      <div className="arch relative size-full overflow-hidden">
        <DawnSky className="absolute inset-0 size-full" />
        <GirCow className="absolute bottom-[15%] -left-[2%] w-[74%]" />
        <div className="absolute inset-x-0 bottom-0 h-[12%] border-t-4 border-double border-peetal bg-maroon-800 bg-[radial-gradient(circle,var(--color-maroon-700)_1.5px,transparent_2px)] bg-[length:14px_14px]" />
        <Diya className="absolute bottom-[7%] left-[4%] w-[17%]" />
        <span className="absolute bottom-[8%] left-[23%] size-2.5 rounded-full bg-genda" aria-hidden />
        <span className="absolute bottom-[9.5%] left-[26%] size-2 rounded-full bg-haldi-400" aria-hidden />
        <GheeJar id="hero-jar" className="absolute right-[4%] bottom-[6.5%] w-[25%] drop-shadow-[0_10px_12px_rgb(42_14_10/0.35)]" />
        <CowHello className="bottom-[16%] left-0 h-[46%] w-[70%]" />
      </div>
    </Pausable>
  );
}
