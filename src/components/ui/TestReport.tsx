import Image from "next/image";
import { asset } from "@/lib/assets";
import { site } from "@/lib/site";

/**
 * The QR code for the ghee's test report. Scanning it (or tapping it, on a phone) opens the report PDF.
 * `row` sits in the footer; `tile` fills the fourth cell of the pack-size grid.
 */
export function TestReport({ layout = "row", className = "" }: { layout?: "row" | "tile"; className?: string }) {
  const tile = layout === "tile";
  return (
    <a
      href={site.testReport.url}
      target="_blank"
      rel="noopener"
      className={`group bg-pasture-900 text-pasture-100 hover:bg-pasture-800 ${
        tile
          ? "flex flex-col items-center justify-center gap-3 rounded-[1.25rem] p-4 text-center sm:gap-4 sm:rounded-[1.75rem] sm:p-6"
          : "inline-flex items-center gap-4 rounded-2xl p-3 pr-5"
      } ${className}`}
    >
      <Image
        src={asset(site.testReport.qr)}
        alt="QR code that opens the Farm Dip test report"
        width={990}
        height={990}
        sizes={tile ? "(min-width: 1024px) 180px, 40vw" : "96px"}
        className={`shrink-0 rounded-xl bg-white p-1.5 ${tile ? "w-full max-w-44" : "size-20 sm:size-24"}`}
      />
      <span className={`text-sm leading-snug ${tile ? "" : "max-w-[12rem]"}`}>
        <span className={`block font-display text-cream ${tile ? "text-xl sm:text-2xl" : "text-lg"}`}>Our test report</span>
        <span className="mt-0.5 block">Scan the code to see how our ghee tested.</span>
        <span className="mt-1.5 block font-semibold text-ghee-300 underline-offset-4 group-hover:underline">Open the report</span>
      </span>
    </a>
  );
}
