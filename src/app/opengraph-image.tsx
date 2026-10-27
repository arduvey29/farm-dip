import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: A2 bilona ghee from Gir cows`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({
    kicker: "A2 bilona ghee",
    title: "Churned from curd, slow-cooked on a wood fire",
    footer: "Lab report for every batch. Free cash on delivery across India.",
  });
}
