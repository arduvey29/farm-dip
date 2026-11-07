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
    <article className="group flex flex-col">
      <Link href={href} className="relative block" tabIndex={-1} aria-hidden>
        {/* Jharokha arch with a brass edge. */}
        <div className="arch bg-peetal p-[3px]">
          <div className="arch overflow-hidden bg-chandan">
            <Image
              src={variant.image}
              alt=""
              width={600}
              height={600}
              loading={eager ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 33vw, 80vw"
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
        {variant.bestValue ? (
          <span className="absolute top-[18%] -left-1 bg-rani py-1 pr-4 pl-3 text-xs font-bold text-chandan [clip-path:polygon(0_0,100%_0,calc(100%-8px)_50%,100%_100%,0_100%)]">
            Best value
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1 pt-4">
        <H className="font-display text-2xl leading-snug text-kattha-800">
          <Link href={href} className="underline-offset-4 group-hover:underline">
            {variant.label} <span className="text-lg text-kattha-700">{variant.packaging.toLowerCase()}</span>
          </Link>
        </H>
        <p className="text-sm text-kattha-700">{product.name}</p>
        <div className="mt-auto pt-2">
          <Price price={variant.price} mrp={variant.mrp} />
          <p className="text-xs text-kattha-700">
            {formatPrice(perLitre)} per litre
            {saving > 0 ? <span className="block font-semibold text-hara">Save {saving}% per litre</span> : null}
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
