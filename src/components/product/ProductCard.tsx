import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/types";
import { getVariant } from "@/data/products";
import { getRatingSummary } from "@/data/reviews";
import { formatPrice, pricePerLitre } from "@/lib/format";
import { Price } from "@/components/ui/Price";
import { Stars } from "@/components/ui/Stars";
import { QuickAddButton } from "./QuickAddButton";

export function ProductCard({ product, eager = false, headingLevel = 3 }: { product: Product; eager?: boolean; headingLevel?: 2 | 3 }) {
  const variant = getVariant(product);
  const rating = getRatingSummary(product.slug);
  const href = `/products/${product.slug}`;
  const H = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block" tabIndex={-1} aria-hidden>
        {/* Jharokha arch with a brass edge. */}
        <div className="arch bg-peetal p-[3px]">
          <div className="arch overflow-hidden bg-chandan">
            <Image
              src={product.images[0].src}
              alt=""
              width={600}
              height={600}
              loading={eager ? "eager" : "lazy"}
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
        {product.badge ? (
          <span className="absolute top-[18%] -left-1 bg-kumkum py-1 pr-4 pl-3 text-xs font-bold text-chandan [clip-path:polygon(0_0,100%_0,calc(100%-8px)_50%,100%_100%,0_100%)]">
            {product.badge}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 pt-4">
        <H className="font-display text-lg leading-snug text-maroon-800 sm:text-xl">
          <Link href={href} className="underline-offset-4 group-hover:underline">
            {product.name}
          </Link>
        </H>
        {rating.count ? (
          <p className="flex items-center gap-1.5 text-sm text-maroon-700">
            <Stars rating={rating.average} className="size-3.5" />
            <span>
              {rating.average.toFixed(1)} ({rating.count})
            </span>
          </p>
        ) : null}
        <p className="line-clamp-2 text-sm text-maroon-700">{product.tagline}</p>
        <div className="mt-auto pt-2">
          <Price price={variant.price} mrp={variant.mrp} />
          <p className="text-xs text-maroon-700">
            {variant.label}, {formatPrice(pricePerLitre(variant.price, variant.volumeMl))} per litre
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
          label={product.variants.length > 1 ? `Add ${variant.label}` : "Add to cart"}
          productName={product.name}
        />
      </div>
    </article>
  );
}
