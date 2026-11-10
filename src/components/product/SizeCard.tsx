import Image from "next/image";
import Link from "next/link";
import type { Product, Variant } from "@/data/types";
import { formatPrice, pricePerLitre } from "@/lib/format";
import { Price } from "@/components/ui/Price";
import { QuickAddButton } from "./QuickAddButton";

/**
 * One pack size of the ghee, as a card. The store sells one ghee in three sizes, so shoppers pick a size,
 * not a product. Maps to a Shopify variant: variant.image, variant.price, variant.title.
 */
export function SizeCard({
  product,
  variant,
  eager = false,
  headingLevel = 3,
  compact = false,
  className = "",
  style,
}: {
  product: Product;
  variant: Variant;
  eager?: boolean;
  headingLevel?: 2 | 3;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const href = `/products/${product.slug}?pack=${variant.id}`;
  const H = headingLevel === 2 ? "h2" : "h3";
  const perLitre = pricePerLitre(variant.price, variant.volumeMl);
  const highest = Math.max(...product.variants.map((v) => pricePerLitre(v.price, v.volumeMl)));
  const saving = Math.round(((highest - perLitre) / highest) * 100);

  return (
    <article
      style={style}
      className={`group flex flex-col rounded-[1.25rem] bg-milk shadow-md transition-all duration-300 hover:shadow-2xl hover:border-ghee-400 hover:-translate-y-1 border border-line/80 ${
        compact ? "p-2 sm:rounded-[1.65rem] sm:p-3" : "p-2 sm:rounded-[1.75rem] sm:p-3"
      } ${className}`}
    >
      <Link href={href} className="relative block overflow-hidden rounded-[1rem] bg-oat/70 sm:rounded-[1.35rem]" tabIndex={-1} aria-hidden>
        <Image
          src={variant.image}
          alt=""
          width={600}
          height={600}
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 48vw, 48vw"
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] ${
            compact ? "h-52 sm:h-56 lg:h-60" : "aspect-square sm:aspect-[4/5]"
          }`}
        />
        {variant.bestValue ? (
          <span className="absolute top-2 left-2 rounded-full bg-ink-950 px-2 py-0.5 text-[0.62rem] font-bold text-ghee-300 shadow-md sm:top-2.5 sm:left-2.5 sm:px-3 sm:py-1 sm:text-[0.72rem]">
            Best value
          </span>
        ) : variant.id === "1-l" ? (
          <span className="absolute top-2 left-2 rounded-full bg-pasture-800 px-2 py-0.5 text-[0.62rem] font-bold text-cream shadow-md sm:top-2.5 sm:left-2.5 sm:px-3 sm:py-1 sm:text-[0.72rem]">
            Most popular
          </span>
        ) : (
          <span className="absolute top-2 left-2 rounded-full bg-milk/95 px-2 py-0.5 text-[0.62rem] font-bold text-ink-800 shadow-sm backdrop-blur-xs sm:top-2.5 sm:left-2.5 sm:px-3 sm:py-1 sm:text-[0.72rem]">
            Daily size
          </span>
        )}
      </Link>

      <div className={`flex flex-1 flex-col ${compact ? "px-1.5 pt-2.5 pb-1 sm:px-2.5 sm:pt-3.5" : "px-1.5 pt-2.5 pb-1 sm:px-3 sm:pt-4 sm:pb-2"}`}>
        <div className="flex items-baseline justify-between gap-1.5">
          <H className="font-display text-lg font-bold leading-none text-ink-950 sm:text-2xl md:text-[1.85rem]">
            <Link href={href} className="underline-offset-4 group-hover:underline">
              {variant.label}
              <span className="sr-only"> {product.name}</span>
            </Link>
          </H>
          <span className="text-[0.7rem] font-semibold text-ink-600 sm:text-sm">{variant.packaging}</span>
        </div>

        <div className="mt-auto pt-2 sm:pt-3">
          <div className="flex flex-wrap items-baseline justify-between gap-1">
            <Price price={variant.price} mrp={variant.mrp} />
            {saving > 0 ? (
              <span className="rounded-md bg-pasture-100/90 px-1.5 py-0.2 text-[0.68rem] font-bold text-pasture-900 sm:px-2 sm:py-0.5 sm:text-xs">
                Save {saving}%
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-[0.7rem] font-medium text-ink-600 sm:text-xs">
            {formatPrice(perLitre)} / litre
          </p>
        </div>

        <QuickAddButton
          line={{
            slug: product.slug,
            variantId: variant.id,
            name: product.name,
            variantLabel: variant.label,
            price: variant.price,
            mrp: variant.mrp,
            image: variant.image,
            volumeMl: variant.volumeMl,
          }}
          label={`Add ${variant.label}`}
          productName={product.name}
        />
      </div>
    </article>
  );
}
