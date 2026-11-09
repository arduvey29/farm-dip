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
export function SizeCard({ product, variant, eager = false, headingLevel = 3 }: { product: Product; variant: Variant; eager?: boolean; headingLevel?: 2 | 3 }) {
  const href = `/products/${product.slug}?pack=${variant.id}`;
  const H = headingLevel === 2 ? "h2" : "h3";
  const perLitre = pricePerLitre(variant.price, variant.volumeMl);
  const highest = Math.max(...product.variants.map((v) => pricePerLitre(v.price, v.volumeMl)));
  const saving = Math.round(((highest - perLitre) / highest) * 100);

  return (
    <article className="group flex flex-col rounded-[1.25rem] bg-milk p-1.5 sm:rounded-[1.75rem] sm:p-2.5 shadow-[0_1px_0_var(--color-line),0_24px_50px_-34px_rgb(35_27_30/0.45)]">
      <Link href={href} className="relative block overflow-hidden rounded-[1rem] bg-oat sm:rounded-[1.35rem]" tabIndex={-1} aria-hidden>
        <Image
          src={variant.image}
          alt=""
          width={600}
          height={600}
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 300px, 48vw"
          className="aspect-square w-full object-cover sm:aspect-[4/5] transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {variant.bestValue ? <span className="absolute top-2 left-2 rounded-full bg-ink-900 px-2.5 py-1 text-[0.7rem] font-semibold text-ghee-300 sm:top-3 sm:left-3 sm:px-3 sm:text-xs">Best value</span> : null}
      </Link>

      <div className="flex flex-1 flex-col px-1.5 pt-3 pb-1.5 sm:px-3 sm:pt-5 sm:pb-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <H className="font-display text-2xl leading-none text-ink-900 sm:text-3xl">
            <Link href={href} className="underline-offset-4 group-hover:underline">
              {variant.label}
              <span className="sr-only"> {product.name}</span>
            </Link>
          </H>
          <span className="text-xs text-ink-500 sm:text-sm">{variant.packaging}</span>
        </div>
        <div className="mt-auto pt-3 sm:pt-4">
          <Price price={variant.price} mrp={variant.mrp} />
          <p className="text-xs text-ink-700 sm:text-sm">{formatPrice(perLitre)} per litre</p>
          {saving > 0 ? <p className="text-xs font-semibold text-pasture-600 sm:text-sm">Save {saving}% per litre</p> : null}
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
