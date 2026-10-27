import { getProduct, lowestPrice, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Farm Dip ghee";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return renderOg({ kicker: "Farm Dip", title: "A2 bilona ghee", footer: "Free cash on delivery across India" });
  const sizes = product.variants.map((v) => v.label).join(", ");
  return renderOg({
    kicker: product.tagline,
    title: product.name,
    footer: `From ${formatPrice(lowestPrice(product))}. ${sizes}. Free COD.`,
  });
}
