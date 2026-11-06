import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: Pure Desi Buffalo Ghee`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({
    kicker: "Pure Desi Buffalo Ghee",
    title: "Bring home the goodness of tradition",
    footer: "Lab report for every batch. Free cash on delivery across India.",
  });
}
