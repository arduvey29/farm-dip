import { Buffalo } from "@/components/art/Buffalo";
import { GheeJar } from "@/components/art/GheeJar";
import { Pausable } from "@/components/art/Pausable";
import { BuffaloHello } from "./BuffaloHello";

/**
 * The hero picture: Rani the buffalo on a green rise in front of a giant drop of molten ghee,
 * with a jar beside her. Flat, modern shapes; Rani keeps her folk-painted details.
 * Tap Rani to say hello.
 */
export function HeroScene() {
  return (
    <Pausable className="relative aspect-[5/6] w-full" data-hello-scene="">
      <svg viewBox="0 0 500 600" className="absolute inset-0 size-full" aria-hidden focusable="false">
        <defs>
          <radialGradient id="hero-drop" cx="0.38" cy="0.62" r="0.7">
            <stop offset="0" stopColor="#ffe6a3" />
            <stop offset="0.45" stopColor="#f8c95a" />
            <stop offset="1" stopColor="#e9a224" />
          </radialGradient>
          <linearGradient id="hero-hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-pasture-600)" />
            <stop offset="1" stopColor="var(--color-pasture-800)" />
          </linearGradient>
        </defs>
        {/* A giant drop of ghee as the sky. */}
        <path d="M250 18C292 108 452 220 452 352A202 202 0 0 1 48 352C48 220 208 108 250 18Z" fill="url(#hero-drop)" />
        <path d="M150 300C142 250 176 196 214 170" fill="none" stroke="#fff6dc" strokeWidth="14" strokeLinecap="round" opacity="0.55" />
        <circle cx="134" cy="352" r="9" fill="#fff6dc" opacity="0.55" />
        {/* Green rise she stands on. */}
        <path d="M0 470C90 430 200 420 300 432S440 466 500 456V556Q500 600 456 600H44Q0 600 0 556Z" fill="url(#hero-hill)" />
        <path d="M0 520C120 494 260 492 380 506S470 520 500 516V556Q500 600 456 600H44Q0 600 0 556Z" fill="var(--color-pasture-900)" opacity="0.55" />
        <g stroke="var(--color-pasture-300)" strokeWidth="2.4" strokeLinecap="round" opacity="0.7">
          <path d="M70 486l-4-12M76 486l1-13M82 486l4-11M392 474l-3-11M398 474l1-12M420 480l-3-10M426 480l2-11" />
        </g>
      </svg>
      <Buffalo className="absolute bottom-[17%] left-[1%] w-[74%]" />
      <GheeJar id="hero-jar" className="absolute right-[5%] bottom-[9%] w-[27%] drop-shadow-[0_14px_14px_rgb(13_34_22/0.35)]" />
      <BuffaloHello className="bottom-[19%] left-[2%] h-[44%] w-[70%]" />
    </Pausable>
  );
}
