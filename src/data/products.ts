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

// MRPs, SKUs and packaging from the team's product update (syAnasali, 2026-11-07).
// The MRP shown struck through must match the MRP printed on the pack (Legal Metrology rules).
const variants: Variant[] = [
  { id: "500-ml", label: "500 ml", volumeMl: 500, price: 1350, mrp: 1699, sku: "FD-BUF-500", packaging: "Jar", inStock: true, image: img("jar") },
  { id: "1-l", label: "1 L", volumeMl: 1000, price: 2210, mrp: 2799, sku: "FD-BUF-1000", packaging: "Jar", inStock: true, image: img("jar-1l") },
  { id: "5-l", label: "5 L", volumeMl: 5000, price: 9900, mrp: 12499, sku: "FD-BUF-5000", packaging: "Jar", inStock: true, image: img("dolchi"), bestValue: true },
];

export const products: Product[] = [
  {
    slug: SLUG,
    name: "Pure Desi Buffalo Ghee",
    shortName: "buffalo ghee",
    kind: "single",
    // About 12 to 14 litres of buffalo milk per litre of ghee, from the team's product update.
    milk: { litresPerLitre: 14, source: "buffalo milk" },
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
      { label: "Milk per litre of ghee", value: "About 12 to 14 litres" },
      { label: "Texture", value: "Rich, creamy and danedar. Sets firm in cool weather" },
      { label: "Colour", value: "Creamy white" },
      { label: "Flavour and aroma", value: "Authentic traditional taste, rich aroma" },
      { label: "Vitamins", value: "Naturally carries the fat-soluble vitamins A, D, E and K" },
      { label: "Shelf life", value: "12 months from packing" },
      { label: "Packed in", value: "Airtight food-grade jars with freshness seal (500 ml, 1 L, 5 L)" },
    ],
    images: [
      { src: img("jar"), alt: "Jar of Farm Dip pure desi buffalo ghee with a red cloth tied over the lid, on a banana leaf" },
      { src: img("texture"), alt: "Close view of creamy white buffalo ghee on a wooden spoon" },
      { src: img("sizes"), alt: "Farm Dip buffalo ghee in 500 ml, 1 L and 5 L jars" },
      { src: img("dolchi"), alt: "5 litre jar of Farm Dip buffalo ghee" },
    ],
    variants,
    defaultVariant: "1-l",
    ingredients: "Ghee made from pure buffalo milk. No preservatives, no additives, no colour.",
    shelfLife: "12 months from the date of packing",
    storage: "Store in a cool, dry place away from direct sunlight. Always use a clean, dry spoon. No refrigeration needed.",
    uses: [
      "Everyday cooking and traditional recipes",
      "Aromatic tadka for dal, sambar and curries",
      "On piping hot rotis, parathas and naan",
      "Festive sweets: halwa, ladoo and mithai",
      "Deep frying and sautéing, thanks to its high smoke point",
      "Diyas and pooja",
    ],
    faqs: [
      {
        q: "What makes Farm Dip Pure Desi Buffalo Ghee special?",
        a: "Made from pure buffalo milk, it has a rich, creamy texture, authentic taste and delicious flavour that makes every meal special. It is 100% natural with no preservatives or additives.",
      },
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
        a: "The 500 ml jar (₹1,350) suits small families or a first try. The 1 L jar (₹2,210) is the most popular monthly staple. For joint families, the 5 L jar (₹9,900) costs the least per litre, at ₹1,980.",
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

/** Typical values per 100 g for pure buffalo ghee, from the team's product update. Confirm against your own lab report. */
export const gheeNutrition = [
  { label: "Energy", value: "900 kcal" },
  { label: "Total fat", value: "99.8 g" },
  { label: "Saturated fat", value: "68.0 g" },
  { label: "Monounsaturated fat", value: "27.5 g" },
  { label: "Polyunsaturated fat", value: "3.2 g" },
  { label: "Trans fat (added)", value: "0 g" },
  { label: "Cholesterol", value: "256 mg" },
  { label: "Carbohydrate", value: "0 g" },
  { label: "Protein", value: "0 g" },
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
