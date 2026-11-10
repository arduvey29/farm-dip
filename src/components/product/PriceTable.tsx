import Link from "next/link";
import type { Product } from "@/data/types";
import { formatPrice, pricePerLitre } from "@/lib/format";

/** Every pack with its price per litre. Answers "ghee price per litre" queries and helps shoppers pick a size. */
export function PriceTable({ products, caption }: { products: Product[]; caption: string }) {
  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-xl border border-line">
      <table className="table-ghee w-full text-left">
        <caption className="px-3 pt-3 pb-2 text-xs font-semibold text-ink-900 sm:px-4 sm:pt-4 sm:text-sm">
          {caption}
        </caption>
        <thead>
          <tr>
            <th scope="col" className="hidden sm:table-cell">Ghee</th>
            <th scope="col">Pack</th>
            <th scope="col">Price</th>
            <th scope="col">Per litre</th>
          </tr>
        </thead>
        <tbody>
          {products.flatMap((p) =>
            p.variants.map((v, i) => (
              <tr key={v.sku}>
                {i === 0 ? (
                  <th scope="rowgroup" rowSpan={p.variants.length} className="hidden sm:table-cell align-top font-semibold">
                    <Link href={`/products/${p.slug}`} className="underline-offset-4 hover:underline">
                      {p.name}
                    </Link>
                  </th>
                ) : null}
                <td className="whitespace-nowrap">
                  <Link href={`/products/${p.slug}?pack=${v.id}`} className="font-medium text-ink-900 underline-offset-4 hover:underline">
                    {v.label}
                  </Link>{" "}
                  <span className="text-[0.7rem] text-ink-500 block sm:inline">({v.packaging})</span>
                </td>
                <td className="font-semibold tabular-nums whitespace-nowrap text-ink-900">{formatPrice(v.price)}</td>
                <td className="tabular-nums text-ink-700 whitespace-nowrap">{formatPrice(pricePerLitre(v.price, v.volumeMl))}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}
