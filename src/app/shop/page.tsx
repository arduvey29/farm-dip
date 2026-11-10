import Link from "next/link";
import type { Metadata } from "next";
import { mainProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { graph, itemListLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { SizeCard } from "@/components/product/SizeCard";
import { PriceTable } from "@/components/product/PriceTable";
import { Icon } from "@/components/ui/Icon";
import { GheeDropMark } from "@/components/ui/Ornament";

const product = mainProduct;

const title = "Buy Pure Buffalo Ghee Online | 500 ml, 1 L & 5 L";
const description = `Buy Farm Dip pure desi buffalo ghee online | 100% natural with no preservatives or additives. ${product.variants
  .map((v) => `${v.label} ${formatPrice(v.price)}`)
  .join(", ")}. Free cash on delivery nationwide.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/shop" });

const packGuides = [
  {
    title: "500 ml Jar",
    badge: "First Try",
    badgeTone: "bg-milk text-ink-800 border border-line",
    price: "₹1,350",
    rate: "₹2,700 / L",
    idealFor: "Singles, couples & testing purity",
    description: "Great for trying authentic buffalo ghee on morning rotis and dal. Lasts 2–3 weeks in small kitchens.",
    lasts: "2–3 weeks",
  },
  {
    title: "1 L Jar",
    badge: "Most Popular",
    badgeTone: "bg-pasture-800 text-cream shadow-sm",
    price: "₹2,210",
    rate: "₹2,210 / L (Save 18%)",
    idealFor: "Standard families of 3 to 5 people",
    description: "The daily kitchen workhorse for daily rotis, vegetable tadka, khichdi, and children's daily nourishment.",
    lasts: "4–5 weeks",
  },
  {
    title: "5 L Jar",
    badge: "Best Value",
    badgeTone: "bg-ink-950 text-ghee-300 shadow-sm",
    price: "₹9,900",
    rate: "₹1,980 / L (Save 27%)",
    idealFor: "Joint families & festive halwa/sweets",
    description: "Lowest price per litre across all sizes. Perfect for halwa, ladoos, festive cooking, and long-term pantry storage.",
    lasts: "2–3 months",
  },
];

export default function ShopPage() {
  return (
    <>
      <div className="wrap pt-2 sm:pt-3">
        <Breadcrumbs items={[{ name: "Shop", path: "/shop" }]} />
      </div>

      {/* 0 SCROLL HERO SECTION: Products completely visible on screen load with animated entrance */}
      <section className="wrap pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-3 lg:pb-10">
        <div className="flex flex-col gap-2 border-b border-line/70 pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:pb-3.5">
          <h1 className="font-display text-3xl font-bold leading-tight text-ink-950 sm:text-4xl lg:text-[2.75rem]">
            Buy buffalo ghee
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-700 sm:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-oat/90 px-3 py-1 font-medium text-ink-900">
              <Icon name="truck" className="size-3.5 text-pasture-700" />
              Free shipping above ₹{site.commerce.freeShippingThreshold}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-oat/90 px-3 py-1 font-medium text-ink-900">
              <Icon name="cash" className="size-3.5 text-ghee-800" />
              Free cash on delivery
            </span>
          </div>
        </div>

        {/* Animated Staggered Product Cards - More prominent, bigger and 100% visible on 0 scroll */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {product.variants.map((v, i) => (
            <SizeCard
              key={v.id}
              product={product}
              variant={v}
              headingLevel={2}
              eager={i < 3}
              compact
              className="animate-product-rise"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </section>

      {/* CREATIVE SECTION 2: WHICH SIZE IS RIGHT FOR YOU? */}
      <section className="border-t border-line bg-milk py-14 sm:py-16" aria-labelledby="guide-heading">
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider text-ghee-800 uppercase">
              Kitchen Guide
            </span>
            <h2 id="guide-heading" className="mt-1 font-display text-3xl font-bold text-ink-950 sm:text-4xl">
              Which jar size is right for your kitchen?
            </h2>
            <p className="mt-2 text-base text-ink-700">
              All three sizes contain the exact same single-origin buffalo ghee. Pick the size that fits your household cooking routine.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packGuides.map((guide) => (
              <div
                key={guide.title}
                className="group relative flex flex-col rounded-2xl border border-line bg-cream/70 p-6 shadow-xs transition-all duration-300 hover:border-ghee-400 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${guide.badgeTone}`}>
                    {guide.badge}
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink-600">
                    Lasts {guide.lasts}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-ink-950">
                  {guide.title}
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-ink-900">{guide.price}</span>
                  <span className="text-xs text-ink-600">{guide.rate}</span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  {guide.description}
                </p>

                <div className="mt-auto border-t border-line/70 pt-4 text-xs font-medium text-ink-600">
                  <span className="font-semibold text-ink-800">Ideal for: </span>
                  {guide.idealFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATIVE SECTION 3: TRANSPARENT PRICE & VALUE LEDGER */}
      <section className="overflow-x-clip border-t border-line bg-oat py-14 sm:py-16" aria-labelledby="prices">
        <div className="wrap grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-bold text-ghee-800 shadow-xs">
              <GheeDropMark className="size-3 text-ghee-700" />
              <span>Transparent Pricing</span>
            </div>
            <h2 id="prices" className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl">
              Honest prices, from ₹1,980 to ₹2,700 per litre.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-800">
              About 14 litres of full-fat buffalo milk are slow-churned for every single litre of Farm Dip ghee. We believe in clear pricing: the bigger the jar, the less you pay per litre. All taxes are included.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-700">
              <li className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-pasture-700" />
                <span>Free cash on delivery available nationwide</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-pasture-700" />
                <span>Free shipping on all orders over ₹{site.commerce.freeShippingThreshold}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-pasture-700" />
                <span>Double-boxed protective shockproof packaging</span>
              </li>
            </ul>
          </div>

          <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-xs sm:p-5">
            <PriceTable products={[product]} caption="Farm Dip buffalo ghee prices by pack size" />
          </div>
        </div>
      </section>

      {/* CREATIVE SECTION 4: PURITY & TRUST RIBBON */}
      <section className="border-t border-line bg-pasture-950 py-12 text-cream" aria-label="Purity guarantees">
        <div className="wrap grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
          <div className="flex flex-col gap-2">
            <div className="grid size-10 place-items-center rounded-xl bg-pasture-800 text-ghee-400">
              <Icon name="shield" className="size-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-cream sm:text-xl">100% Buffalo Fat</h3>
            <p className="text-xs leading-relaxed text-pasture-200">
              Zero cow milk mixing. Zero vanaspati or vegetable oil. Verified RM value of 32.4.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid size-10 place-items-center rounded-xl bg-pasture-800 text-ghee-400">
              <Icon name="flask" className="size-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-cream sm:text-xl">NABL Lab Tested</h3>
            <p className="text-xs leading-relaxed text-pasture-200">
              Every single batch is independently tested against strict FSSAI national standards.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid size-10 place-items-center rounded-xl bg-pasture-800 text-ghee-400">
              <Icon name="truck" className="size-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-cream sm:text-xl">24h Dispatch</h3>
            <p className="text-xs leading-relaxed text-pasture-200">
              Packed fresh and dispatched within 24 hours with live SMS and WhatsApp tracking.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid size-10 place-items-center rounded-xl bg-pasture-800 text-ghee-400">
              <Icon name="refresh" className="size-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-cream sm:text-xl">7-Day Refund</h3>
            <p className="text-xs leading-relaxed text-pasture-200">
              If an accredited lab test shows impurity, email us the report for a 100% refund.
            </p>
          </div>
        </div>
      </section>

      {/* CREATIVE SECTION 5: QUICK ANSWERS & ASSISTANCE */}
      <section className="wrap py-14 sm:py-16" aria-labelledby="faq-quick-heading">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold tracking-wider text-ghee-800 uppercase">
            Got Questions?
          </span>
          <h2 id="faq-quick-heading" className="mt-1 font-display text-3xl font-bold text-ink-950 sm:text-4xl">
            Everything you need before your first order
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-2xl divide-y divide-line rounded-2xl border border-line bg-milk p-6 shadow-sm">
          <details className="group py-4 first:pt-0">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-bold text-ink-950 sm:text-xl">
              <span>Is cash on delivery free across India?</span>
              <Icon name="plus" className="size-4 transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Yes. Cash on delivery is completely free with no extra fees across all serviceable pincodes in India.
            </p>
          </details>

          <details className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-bold text-ink-950 sm:text-xl">
              <span>What is the shelf life of unopened and opened ghee?</span>
              <Icon name="plus" className="size-4 transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Unopened, Farm Dip ghee lasts 12 months in a cool, dark cupboard. Once opened, it keeps for months provided you use a clean, dry spoon.
            </p>
          </details>

          <details className="group py-4 last:pb-0">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-bold text-ink-950 sm:text-xl">
              <span>How does the 7-day purity refund policy work?</span>
              <Icon name="plus" className="size-4 transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              If you believe the ghee does not meet quality or purity standards, you can have it tested at an accredited laboratory and email us the report. Upon verification, we issue a 100% refund within 7 days.
            </p>
          </details>
        </div>

        <div className="mt-8 text-center text-sm text-ink-700">
          Have more questions? Browse our{" "}
          <Link href="/faq" className="font-semibold text-ink-950 underline underline-offset-4 hover:text-ghee-800">
            Questions & Answers page
          </Link>{" "}
          or <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink-950 underline underline-offset-4 hover:text-ghee-800">WhatsApp us directly</a>.
        </div>
      </section>

      <JsonLd
        data={graph(
          itemListLd(
            "Farm Dip buffalo ghee pack sizes",
            "/shop",
            product.variants.map((v) => ({
              name: `${product.name}, ${v.label}`,
              path: `/products/${product.slug}?pack=${v.id}`,
              image: v.image,
            })),
          ),
        )}
      />
    </>
  );
}
