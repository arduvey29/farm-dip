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

const title = "Shop A2 Bilona Ghee Online: Gir, Sahiwal and Buffalo";
const description = `Buy bilona ghee online: A2 Gir and Sahiwal cow ghee, desi buffalo ghee, haldi ghee and gift boxes. Lab tested. Free shipping above ₹${site.commerce.freeShippingThreshold}, free COD.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/shop" });

function perLitreRange(slug: string) {
  const product = getProduct(slug);
  const values = product ? product.variants.map((v) => pricePerLitre(v.price, v.volumeMl)) : [0];
  return { min: formatPrice(Math.min(...values)), max: formatPrice(Math.max(...values)) };
}

export default function ShopPage() {
  const singles = products.filter((p) => p.kind === "single");
  const gir = perLitreRange("a2-gir-cow-bilona-ghee");
  const buffalo = perLitreRange("desi-buffalo-bilona-ghee");
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Shop", path: "/shop" }]} />
      </div>

      <section className="wrap pt-8 pb-16">
        <h1 className="font-display text-5xl sm:text-6xl">All ghee</h1>
        <p className="mt-4 max-w-2xl text-lg text-maroon-800">
          Every {site.name} ghee is churned from curd by the bilona method and tested in an independent lab. Choose by milk, taste or pack size. Larger packs cost less per litre.
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

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} headingLevel={2} eager={i < 4} />
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
              A2 Gir cow bilona ghee costs {gir.min} to {gir.max} per litre depending on pack size. Desi buffalo ghee costs {buffalo.min} to {buffalo.max} per litre. All prices include GST.
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
