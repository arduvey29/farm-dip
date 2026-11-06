import Link from "next/link";
import type { Metadata } from "next";
import { getProduct, products } from "@/data/products";
import { formatPrice, pricePerLitre } from "@/lib/format";
import { collections } from "@/data/collections";
import { graph, itemListLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProductCard } from "@/components/product/ProductCard";
import { PriceTable } from "@/components/product/PriceTable";

const title = "Shop Farm Dip Pure Desi Ghee: 500 ml, 1 L and 5 L";
const description = `Bring home the goodness of tradition with Farm Dip Pure Desi Ghee. Made from pure buffalo milk: 500 ml (₹1,350), 1 L (₹2,210), and 5 L (₹9,900) steel dolchi. 100% natural, no preservatives. Free COD.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/shop" });

function perLitreRange(slug: string) {
  const product = getProduct(slug);
  const values = product ? product.variants.map((v) => pricePerLitre(v.price, v.volumeMl)) : [0];
  return { min: formatPrice(Math.min(...values)), max: formatPrice(Math.max(...values)) };
}

export default function ShopPage() {
  const singles = products.filter((p) => p.kind === "single");
  const gheePrice = perLitreRange(products[0]?.slug ?? "pure-desi-buffalo-ghee-500ml");
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Shop", path: "/shop" }]} />
      </div>

      <section className="wrap pt-8 pb-16">
        <h1 className="font-display text-5xl sm:text-6xl">Farm Dip – Pure Desi Ghee</h1>
        <p className="mt-4 max-w-2xl text-lg text-maroon-800">
          Crafted with care from pure buffalo milk to bring authentic taste and rich aroma to your everyday meals. 100% natural with no preservatives or additives. Larger packs cost less per litre.
        </p>

        <nav aria-label="Collections" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-maroon-200 px-4 font-medium hover:border-maroon-900 hover:bg-chandan">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} headingLevel={2} eager={i < 3} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-chandan py-16" aria-labelledby="prices">
        <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 id="prices" className="font-display text-3xl sm:text-4xl">
              Ghee prices per litre
            </h2>
            <p className="mt-4 text-maroon-800">
              Farm Dip Pure Desi Ghee costs {gheePrice.min} to {gheePrice.max} per litre depending on pack size: 500 ml (₹1,350), 1 L (₹2,210), and 5 L (₹9,900). Buying the 5 L dolchi brings the per-litre price to just ₹1,980/L. All prices include GST.
            </p>
          </div>
          <PriceTable products={singles} caption="Bilona ghee prices by pack size" />
        </div>
      </section>

      <JsonLd
        data={graph(
          itemListLd(
            "All ghee",
            "/shop",
            products.map((p) => ({ name: p.name, path: `/products/${p.slug}`, image: p.images[0].src })),
          ),
        )}
      />
    </>
  );
}
