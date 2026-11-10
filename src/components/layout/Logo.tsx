"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/assets";
import { site } from "@/lib/site";

/**
 * The Farm Dip badge: a farmer resting under a banyan beside his fields, in a cream oval seal.
 * Drawn in src/components/brand/badge.mjs and written to /public/images/brand by `npm run placeholders`.
 */
export function LogoMark({ className = "h-14 w-auto" }: { className?: string }) {
  return <Image src={asset("/images/brand/farm-dip-badge.svg")} alt="" width={400} height={460} className={className} />;
}

/** The wordmark in type: "Farm Dip" in Eczar Bold, like the badge. */
export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`font-deva font-bold whitespace-nowrap ${className}`}>Farm Dip</span>;
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="inline-flex items-center gap-2.5"
      aria-label={`${site.name} home`}
    >
      <LogoMark className="h-12 w-auto shrink-0 lg:h-14" />
      <span className="flex flex-col leading-none">
        <Wordmark className={`text-[1.6rem] leading-none ${light ? "text-cream" : "text-ink-900"}`} />
        <span className={`mt-1 text-[0.78rem] leading-none font-medium ${light ? "text-ghee-300" : "text-ink-500"}`}>Pure desi ghee</span>
      </span>
    </Link>
  );
}
