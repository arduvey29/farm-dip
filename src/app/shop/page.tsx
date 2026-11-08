import type { Metadata } from "next";
import { mainProduct } from "@/data/products";
import { formatPrice, pricePerLitre } from "@/lib/format";
import { graph, itemListLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { SizeCard } from "@/components/product/SizeCard";
import { PriceTable } from "@/components/product/PriceTable";

const product = mainProduct;
const perLitre = product.variants.map((v) => pricePerLitre(v.price, v.volumeMl));
const cheapest = formatPrice(Math.min(...perLitre));
const dearest = formatPrice(Math.max(...perLitre));

const title = "Buy Pure Buffalo Ghee Online: 500 ml, 1 L and 5 L";
const description = `Buy Farm Dip pure desi buffalo ghee online. No preservatives or additives. ${product.variants.map((v) => `${v.label} ${formatPrice(v.price)}`).join(", ")}. Free shipping above ₹${site.commerce.freeShippingThreshold}, free COD.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/shop" });

export default function ShopPage() {
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Shop", path: "/shop" }]} />
      </div>

      <section className="wrap pt-8 pb-16">
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl">Buy buffalo ghee</h1>
        <div className="mt-5 max-w-2xl">
          <QuickAnswer label="How much does Farm Dip buffalo ghee cost?">
            {product.variants.map((v) => `${v.label} costs ${formatPrice(v.price)}`).join(", ")}. That is {cheapest} to {dearest} per litre; the bigger the pack, the less you pay per litre. All prices include taxes.
          </QuickAnswer>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-3">
          {product.variants.map((v, i) => (
            <SizeCard key={v.id} product={product} variant={v} headingLevel={2} eager={i < 3} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-oat py-16" aria-labelledby="prices">
        <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 id="prices" className="font-display text-3xl sm:text-4xl">
              Price per litre
            </h2>
            <p className="mt-4 text-ink-800">
              {site.name} pure buffalo ghee costs {cheapest} to {dearest} per litre depending on the pack. Free cash on delivery, and free shipping on orders above ₹{site.commerce.freeShippingThreshold}.
            </p>
          </div>
          <PriceTable products={[product]} caption="Farm Dip buffalo ghee prices by pack size" />
        </div>
      </section>

      <JsonLd
        data={graph(
          itemListLd(
            "Farm Dip buffalo ghee pack sizes",
            "/shop",
            product.variants.map((v) => ({ name: `${product.name}, ${v.label}`, path: `/products/${product.slug}?pack=${v.id}`, image: v.image })),
          ),
        )}
      />
    </>
  );
}
