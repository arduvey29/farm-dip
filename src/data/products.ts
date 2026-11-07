import type { Product, Variant } from "./types";
import { asset } from "@/lib/assets";

/*
  The catalogue: one ghee, Farm Dip Pure Desi Ghee made from buffalo milk, in three sizes.
  Prices are the brand's own. Images are generated placeholders (scripts/generate-placeholders.mjs);
  swap them for real photography (WebP/AVIF, 1600px square) and bump ASSET_VERSION.
  In Shopify this becomes one product with three variants; see SHOPIFY.md.
*/

const SLUG = "pure-desi-buffalo-ghee";
const img = (name: string) => asset(`/images/products/${SLUG}/${name}.svg`);

const variants: Variant[] = [
  // MRP equals price until the brand confirms printed MRPs; no strikethrough discounts are shown.
  { id: "500-ml", label: "500 ml", volumeMl: 500, price: 1350, mrp: 1350, sku: "FD-BUF-500", packaging: "Glass jar", inStock: true, image: img("jar") }, // PLACEHOLDER: SKU, packaging
  { id: "1-l", label: "1 L", volumeMl: 1000, price: 2210, mrp: 2210, sku: "FD-BUF-1000", packaging: "Glass jar", inStock: true, image: img("jar-1l") }, // PLACEHOLDER: SKU, packaging
  { id: "5-l", label: "5 L", volumeMl: 5000, price: 9900, mrp: 9900, sku: "FD-BUF-5000", packaging: "Steel dolchi", inStock: true, image: img("dolchi"), bestValue: true }, // PLACEHOLDER: SKU, packaging
];

export const products: Product[] = [
  {
    slug: SLUG,
    name: "Pure Desi Buffalo Ghee",
    shortName: "buffalo ghee",
    kind: "single",
    // PLACEHOLDER: litres of buffalo milk per litre of ghee. Confirm from your production records.
    milk: { litresPerLitre: 18, source: "buffalo milk" },
    badge: "100% natural",
    tagline: "Made from pure buffalo milk, the way we ate it as children",
    summary: "Rich, creamy desi ghee made from pure buffalo milk. 100% natural, with no preservatives or additives.",
    description: [
      "Bring home the goodness of tradition. Farm Dip Pure Desi Ghee is crafted with care to bring authentic taste and rich aroma to your everyday meals.",
      "Made from pure buffalo milk, it has a rich, creamy texture and a delicious flavour that makes every meal special. There are no preservatives or additives, just the simple goodness of nature in every spoonful.",
      "We make ghee the way we ate it in our childhood: pure, simple, rich and full of goodness. Our aim is to bring that same purity and health to every family's kitchen.",
    ],
    highlights: [
      "Pure and 100% natural",
      "Made from pure buffalo milk",
      "Rich in vitamins",
      "No preservatives or additives",
      "Perfect for everyday cooking and traditional recipes",
    ],
    facts: [
      { label: "Milk", value: "Pure buffalo milk" },
      { label: "Ingredients", value: "Ghee from buffalo milk. Nothing added." },
      { label: "Preservatives and additives", value: "None" },
      { label: "Texture", value: "Rich and creamy. Sets firm in cool weather" },
      { label: "Colour and aroma", value: "Creamy white with a rich, sweet aroma" },
      { label: "Shelf life", value: "12 months from packing" }, // PLACEHOLDER: confirm
      { label: "Packed in", value: "Glass jars for 500 ml and 1 L, steel dolchi for 5 L" }, // PLACEHOLDER: confirm
    ],
    images: [
      { src: img("jar"), alt: "Jar of Farm Dip pure desi buffalo ghee with a red cloth tied over the lid, on a banana leaf" },
      { src: img("texture"), alt: "Close view of creamy white buffalo ghee on a wooden spoon" },
      { src: img("sizes"), alt: "Farm Dip buffalo ghee in 500 ml and 1 litre jars and a 5 litre steel dolchi" },
      { src: img("dolchi"), alt: "5 litre steel dolchi of Farm Dip buffalo ghee" },
    ],
    variants,
    defaultVariant: "1-l",
    ingredients: "Ghee made from pure buffalo milk. No preservatives, no additives, no colour.",
    shelfLife: "12 months from the date of packing", // PLACEHOLDER: confirm
    storage: "Store in a cool, dry place away from direct sunlight. Always use a clean, dry spoon. No refrigeration needed.",
    uses: ["Tadka and everyday cooking", "On hot rotis, parathas and dal", "Halwa, ladoo and mithai", "Puris, pakode and deep frying", "Diyas and pooja"],
    faqs: [
      {
        q: "Why is buffalo ghee white?",
        a: "Buffalo milk carries very little beta-carotene, the pigment that makes cow ghee yellow. So pure buffalo ghee is naturally creamy white. The colour is not a sign of anything added or removed.",
      },
      {
        q: "Does Farm Dip ghee have any preservatives or additives?",
        a: "No. It is ghee made from pure buffalo milk and nothing else: no preservatives, no additives, no colour.",
      },
      {
        q: "Why is my ghee solid, or grainy?",
        a: "Buffalo ghee sets firm in cool weather and softens in summer, and it is often a mix of the two. The texture changes with temperature and does not change the quality.",
      },
      {
        q: "Which pack size should I buy?",
        a: "The 5 L pack works out to ₹1,980 per litre, the 1 L jar to ₹2,210 and the 500 ml jar to ₹2,700. A family that cooks with ghee every day usually goes for 1 L or 5 L. Ghee keeps well for months if you always use a dry spoon.",
      },
      {
        q: "Is buffalo ghee good for everyday cooking?",
        a: "Yes. It is rich and holds up well to high heat, which makes it good for tadka, parathas, puris and frying, and for traditional sweets like halwa and ladoo.",
      },
    ],
    related: [],
    seo: {
      title: "Pure Desi Buffalo Ghee: Rich, Creamy, No Preservatives",
      description:
        "Buy Farm Dip pure desi ghee made from buffalo milk. 100% natural, no preservatives or additives. 500 ml ₹1,350, 1 L ₹2,210, 5 L ₹9,900. Free cash on delivery.",
      keywords: ["buffalo ghee", "desi ghee", "pure buffalo ghee online", "buffalo ghee price", "ghee without preservatives", "bhains ka ghee"],
    },
    updatedAt: "2026-11-07",
  },
];

/** Typical values per 100 g for pure ghee. PLACEHOLDER: replace with values from your own lab report. */
export const gheeNutrition = [
  { label: "Energy", value: "897 kcal" },
  { label: "Total fat", value: "99.7 g" },
  { label: "Saturated fat", value: "61.9 g" },
  { label: "Monounsaturated fat", value: "28.7 g" },
  { label: "Polyunsaturated fat", value: "3.7 g" },
  { label: "Trans fat (added)", value: "0 g" },
  { label: "Cholesterol", value: "256 mg" },
  { label: "Carbohydrate", value: "0 g" },
  { label: "Protein", value: "0.3 g" },
];

/** The store sells one ghee. Pages that link to "the product" use this. */
export const mainProduct = products[0];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getVariant(product: Product, id?: string | null) {
  return product.variants.find((v) => v.id === id) ?? product.variants.find((v) => v.id === product.defaultVariant) ?? product.variants[0];
}

export function getProducts(slugs: string[]) {
  return slugs.map(getProduct).filter((p): p is Product => Boolean(p));
}

export function lowestPrice(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}
