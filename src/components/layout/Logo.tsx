"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/assets";
import { site } from "@/lib/site";

/**
 * The फ़ार्म dip badge: a farmer resting under a banyan beside his fields, in a cream oval seal.
 * Drawn in src/components/brand/badge.mjs and written to /public/images/brand by `npm run placeholders`.
 */
export function LogoMark({ className = "h-14 w-auto" }: { className?: string }) {
  return <Image src={asset("/images/brand/farm-dip-badge.svg")} alt="" width={400} height={460} className={className} />;
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="inline-flex items-center gap-2.5"
      aria-label={`${site.name} home`}
    >
      <LogoMark className="h-14 w-auto shrink-0 lg:h-16" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.7rem] leading-none font-bold whitespace-nowrap ${light ? "text-chandan" : "text-maroon-800"}`}>
          <span lang="hi">फ़ार्म</span> dip
        </span>
        <span className={`mt-1 text-[0.8rem] leading-none font-semibold ${light ? "text-haldi-300" : "text-kumkum"}`}>Pure Desi Ghee</span>
      </span>
    </Link>
  );
}
