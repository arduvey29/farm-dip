import Link from "next/link";
import type { Product } from "@/data/types";
import { formatPrice, pricePerLitre } from "@/lib/format";

/** Every pack with its price per litre. Answers "ghee price per litre" queries and helps shoppers pick a size. */
export function PriceTable({ products, caption }: { products: Product[]; caption: string }) {
  // If multiple products share the same variants (e.g. pack landing pages for the same ghee),
  // show one rowgroup per distinct variant set.
  const uniqueProducts = products.filter(
    (p, idx, arr) =>
      arr.findIndex(
        (x) => x.variants.map((v) => v.id).join(",") === p.variants.map((v) => v.id).join(","),
      ) === idx,
  );

  return (
    <div className="overflow-x-auto rounded-3xl border border-line">
      <table className="table-ghee min-w-[34rem]">
        <caption className="px-4 pt-4">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Ghee</th>
            <th scope="col">Pack</th>
            <th scope="col">Price</th>
            <th scope="col">Per litre</th>
          </tr>
        </thead>
        <tbody>
          {uniqueProducts.flatMap((p) =>
            p.variants.map((v, i) => (
              <tr key={`${p.slug}-${v.sku}-${v.id}`}>
                {i === 0 ? (
                  <th scope="rowgroup" rowSpan={p.variants.length} className="align-top">
                    <Link href={`/products/${p.slug}`} className="underline-offset-4 hover:underline">
                      Farm Dip Pure Desi Ghee
                    </Link>
                  </th>
                ) : null}
                <td>
                  <Link href={`/products/${p.slug}?pack=${v.id}`} className="underline-offset-4 hover:underline">
                    {v.label}
                  </Link>{" "}
                  <span className="text-sm text-maroon-700">{v.packaging}</span>
                </td>
                <td className="font-semibold tabular-nums">{formatPrice(v.price)}</td>
                <td className="tabular-nums">{formatPrice(pricePerLitre(v.price, v.volumeMl))}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}
