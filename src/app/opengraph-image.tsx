import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} | Pure Desi Buffalo Ghee`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({
    kicker: "Pure desi ghee from buffalo milk",
    title: "Made the way we ate it as children",
    footer: "No preservatives or additives. Free cash on delivery across India.",
  });
}
