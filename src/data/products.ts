import type { Product, Variant } from "./types";
import { asset } from "@/lib/assets";

const img = (name: string) => asset(`/images/products/desi-buffalo-bilona-ghee/${name}.svg`);

const commonStorage =
  "Store in a cool, dry place away from direct sunlight. Always use a clean, dry spoon. No refrigeration needed.";

export const buffaloVariants: Variant[] = [
  {
    id: "500-ml",
    label: "500 ml",
    volumeMl: 500,
    price: 1350,
    mrp: 1699,
    sku: "FD-BUF-500",
    packaging: "Glass jar",
    inStock: true,
    image: img("jar"),
  },
  {
    id: "1-l",
    label: "1 L",
    volumeMl: 1000,
    price: 2210,
    mrp: 2799,
    sku: "FD-BUF-1000",
    packaging: "Glass jar",
    inStock: true,
    image: img("jar"),
  },
  {
    id: "5-l",
    label: "5 L",
    volumeMl: 5000,
    price: 9900,
    mrp: 12499,
    sku: "FD-BUF-5000",
    packaging: "Steel dolchi",
    inStock: true,
    image: img("dolchi"),
    bestValue: true,
  },
];

const clientDescription = [
  "Bring home the goodness of tradition with Farm Dip Pure Desi Ghee, crafted with care to bring authentic taste and rich aroma to your everyday meals.",
  "Made from pure buffalo milk, our ghee offers a rich, creamy texture and delicious flavour that makes every meal special. With no preservatives or additives, Farm Dip brings you the simple goodness of nature in every spoonful.",
  "We make ghee the way we ate it in our childhood: pure, simple, rich and full of goodness. Our aim is to bring that same purity and health to every family’s kitchen.",
];

const clientHighlights = [
  "✨ Pure and 100% natural",
  "✨ Rich in vitamins",
  "✨ No preservatives or additives",
  "✨ Perfect for everyday cooking and traditional recipes",
  "Made from 100% pure buffalo milk",
  "Rich, creamy texture & delicious flavour",
];

const clientFaqs = [
  {
    q: "What makes Farm Dip Pure Desi Buffalo Ghee special?",
    a: "Made from pure buffalo milk, our ghee offers a rich, creamy texture, authentic taste and delicious flavour that makes every meal special. It is 100% natural with no preservatives or additives.",
  },
  {
    q: "Is Farm Dip ghee 100% pure and natural?",
    a: "Yes. Farm Dip Pure Desi Buffalo Ghee is 100% natural and made without any preservatives, artificial flavours, colours or chemical additives. We bring you the simple goodness of nature in every spoonful.",
  },
  {
    q: "What is Farm Dip's aim?",
    a: "We make ghee the way we ate it in our childhood: pure, simple, rich and full of goodness. Our aim is to bring that same purity and health to every family’s kitchen.",
  },
  {
    q: "How should I store Farm Dip Pure Desi Buffalo Ghee?",
    a: "Store in a cool, dry cupboard away from direct sunlight. Always use a clean, dry spoon. Refrigeration is not needed.",
  },
  {
    q: "Which pack size should I choose?",
    a: "Our 500 ml jar (₹1,350) is great for small families or trial. The 1 L jar (₹2,210) is the most popular monthly staple. For joint families and maximum savings, our 5 L stainless steel dolchi (₹9,900) offers the lowest price per litre at ₹1,980/L.",
  },
];

const clientUses = [
  "Perfect for everyday cooking and traditional recipes",
  "Aromatic tadka for dal, sambar, and curries",
  "Generously spread on piping hot rotis, parathas, and naan",
  "Traditional festive sweets, halwa, ladoos, and mithai",
  "Deep frying and sautéing with a high smoke point",
];

export const products: Product[] = [
  {
    slug: "pure-desi-buffalo-ghee-500ml",
    name: "Farm Dip Pure Desi Buffalo Ghee (500 ml)",
    shortName: "Pure Buffalo Ghee 500 ml",
    kind: "single",
    milk: { litresPerLitre: 14, source: "Pure buffalo milk" },
    collections: ["buffalo-ghee"],
    badge: "100% Natural",
    tagline: "Bring home the goodness of tradition with Farm Dip Pure Desi Ghee",
    summary:
      "Crafted from pure buffalo milk with rich creamy texture and delicious flavour. 500 ml glass jar (₹1,350).",
    description: clientDescription,
    highlights: clientHighlights,
    facts: [
      { label: "Milk source", value: "100% pure buffalo milk" },
      { label: "Purity", value: "100% natural, no preservatives or additives" },
      { label: "Pack size", value: "500 ml (₹1,350)" },
      { label: "Texture", value: "Rich, creamy and danedar" },
      { label: "Flavour & aroma", value: "Authentic traditional taste, rich aroma" },
      { label: "Vitamins", value: "Naturally rich in fat-soluble vitamins (A, D, E, K)" },
      { label: "Shelf life", value: "12 months from packing" },
      { label: "Packed in", value: "Airtight food-grade glass jar" },
    ],
    images: [
      { src: img("jar"), alt: "Farm Dip Pure Desi Buffalo Ghee 500 ml glass jar" },
      { src: img("texture"), alt: "Rich creamy texture of Farm Dip Pure Desi Buffalo Ghee" },
      { src: img("sizes"), alt: "Farm Dip Pure Desi Buffalo Ghee in 500 ml, 1 L and 5 L packs" },
      { src: img("dolchi"), alt: "5 L stainless steel dolchi of Farm Dip Pure Desi Buffalo Ghee" },
    ],
    variants: buffaloVariants,
    defaultVariant: "500-ml",
    ingredients: "100% Pure Desi Ghee made from pure buffalo milk. No preservatives, additives, or chemicals.",
    shelfLife: "12 months from the date of packing",
    storage: commonStorage,
    uses: clientUses,
    faqs: clientFaqs,
    related: ["pure-desi-buffalo-ghee-1l", "pure-desi-buffalo-ghee-5l"],
    seo: {
      title: "Farm Dip Pure Desi Buffalo Ghee 500 ml (₹1,350): 100% Natural Buffalo Milk Ghee",
      description:
        "Buy Farm Dip Pure Desi Buffalo Ghee 500 ml jar for ₹1,350. Made from pure buffalo milk with rich creamy texture and delicious flavour. 100% natural. Free COD.",
      keywords: ["farm dip pure desi buffalo ghee", "pure buffalo ghee 500ml", "buffalo milk ghee", "natural buffalo ghee"],
    },
    updatedAt: "2026-11-07",
  },
  {
    slug: "pure-desi-buffalo-ghee-1l",
    name: "Farm Dip Pure Desi Buffalo Ghee (1 L)",
    shortName: "Pure Buffalo Ghee 1 L",
    kind: "single",
    milk: { litresPerLitre: 14, source: "Pure buffalo milk" },
    collections: ["buffalo-ghee"],
    badge: "Best seller",
    tagline: "Bring home the goodness of tradition with Farm Dip Pure Desi Ghee",
    summary:
      "Crafted from pure buffalo milk for everyday authentic cooking. 1 L glass jar (₹2,210).",
    description: clientDescription,
    highlights: clientHighlights,
    facts: [
      { label: "Milk source", value: "100% pure buffalo milk" },
      { label: "Purity", value: "100% natural, no preservatives or additives" },
      { label: "Pack size", value: "1 L (1000 ml) (₹2,210)" },
      { label: "Texture", value: "Rich, creamy and danedar" },
      { label: "Flavour & aroma", value: "Authentic traditional taste, rich aroma" },
      { label: "Vitamins", value: "Naturally rich in fat-soluble vitamins (A, D, E, K)" },
      { label: "Shelf life", value: "12 months from packing" },
      { label: "Packed in", value: "Airtight food-grade glass jar" },
    ],
    images: [
      { src: img("jar"), alt: "Farm Dip Pure Desi Buffalo Ghee 1 L glass jar" },
      { src: img("texture"), alt: "Rich creamy texture of Farm Dip Pure Desi Buffalo Ghee" },
      { src: img("sizes"), alt: "Farm Dip Pure Desi Buffalo Ghee in 500 ml, 1 L and 5 L packs" },
      { src: img("dolchi"), alt: "5 L stainless steel dolchi of Farm Dip Pure Desi Buffalo Ghee" },
    ],
    variants: buffaloVariants,
    defaultVariant: "1-l",
    ingredients: "100% Pure Desi Ghee made from pure buffalo milk. No preservatives, additives, or chemicals.",
    shelfLife: "12 months from the date of packing",
    storage: commonStorage,
    uses: clientUses,
    faqs: clientFaqs,
    related: ["pure-desi-buffalo-ghee-500ml", "pure-desi-buffalo-ghee-5l"],
    seo: {
      title: "Farm Dip Pure Desi Buffalo Ghee 1 L (₹2,210): Authentic Buffalo Milk Ghee",
      description:
        "Buy Farm Dip Pure Desi Buffalo Ghee 1 L jar for ₹2,210. Made from pure buffalo milk, rich aroma, and delicious flavour. 100% natural with no preservatives. Free shipping.",
      keywords: ["farm dip pure desi buffalo ghee 1l", "1 litre buffalo ghee", "buffalo milk ghee 1l", "pure buffalo ghee price"],
    },
    updatedAt: "2026-11-07",
  },
  {
    slug: "pure-desi-buffalo-ghee-5l",
    name: "Farm Dip Pure Desi Buffalo Ghee (5 L)",
    shortName: "Pure Buffalo Ghee 5 L dolchi",
    kind: "single",
    milk: { litresPerLitre: 14, source: "Pure buffalo milk" },
    collections: ["buffalo-ghee"],
    badge: "Best value",
    tagline: "Bring home the goodness of tradition with Farm Dip Pure Desi Ghee in a 5 L steel dolchi",
    summary:
      "Pure buffalo milk desi ghee in a traditional 5 L stainless steel dolchi (₹9,900 / ₹1,980 per L).",
    description: clientDescription,
    highlights: clientHighlights,
    facts: [
      { label: "Milk source", value: "100% pure buffalo milk" },
      { label: "Purity", value: "100% natural, no preservatives or additives" },
      { label: "Pack size", value: "5 L (5000 ml) (₹9,900)" },
      { label: "Per litre cost", value: "₹1,980 per litre (Lowest price per litre)" },
      { label: "Texture", value: "Rich, creamy and danedar" },
      { label: "Flavour & aroma", value: "Authentic traditional taste, rich aroma" },
      { label: "Vitamins", value: "Naturally rich in fat-soluble vitamins (A, D, E, K)" },
      { label: "Shelf life", value: "12 months from packing" },
      { label: "Packed in", value: "Food-grade stainless steel dolchi with airtight seal" },
    ],
    images: [
      { src: img("dolchi"), alt: "5 L food-grade steel dolchi of Farm Dip Pure Desi Buffalo Ghee" },
      { src: img("jar"), alt: "Farm Dip Pure Desi Buffalo Ghee glass jar" },
      { src: img("texture"), alt: "Rich creamy texture of Farm Dip Pure Desi Buffalo Ghee" },
      { src: img("sizes"), alt: "Farm Dip Pure Desi Buffalo Ghee in 500 ml, 1 L and 5 L packs" },
    ],
    variants: buffaloVariants,
    defaultVariant: "5-l",
    ingredients: "100% Pure Desi Ghee made from pure buffalo milk. No preservatives, additives, or chemicals.",
    shelfLife: "12 months from the date of packing",
    storage: commonStorage,
    uses: clientUses,
    faqs: clientFaqs,
    related: ["pure-desi-buffalo-ghee-1l", "pure-desi-buffalo-ghee-500ml"],
    seo: {
      title: "Farm Dip Pure Desi Buffalo Ghee 5 L Steel Dolchi (₹9,900): Best Value",
      description:
        "Buy Farm Dip Pure Desi Buffalo Ghee 5 L steel dolchi for ₹9,900 (₹1,980/L). Made from pure buffalo milk. 100% natural with rich creamy flavour. Free shipping & COD.",
      keywords: ["farm dip buffalo ghee 5l", "5 litre pure desi buffalo ghee", "buffalo ghee 5l dolchi", "bulk buffalo ghee"],
    },
    updatedAt: "2026-11-07",
  },
];

/** Typical nutritional values per 100 g for pure buffalo desi ghee. */
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
  { label: "Vitamins (A, D, E)", value: "Rich in natural vitamins" },
];

export function getProduct(slug: string) {
  if (
    slug === "pure-desi-buffalo-ghee" ||
    slug === "pure-desi-buffalo-ghee-500ml" ||
    slug === "a2-gir-cow-bilona-ghee" ||
    slug === "a2-gir-cow-bilona-ghee-500ml"
  ) {
    return products[0];
  }
  if (slug === "pure-desi-buffalo-ghee-1l" || slug === "a2-gir-cow-bilona-ghee-1l") {
    return products[1];
  }
  if (slug === "pure-desi-buffalo-ghee-5l" || slug === "a2-gir-cow-bilona-ghee-5l") {
    return products[2];
  }
  return products.find((p) => p.slug === slug);
}

export function getVariant(product: Product, id?: string | null) {
  return product.variants.find((v) => v.id === id) ?? product.variants.find((v) => v.id === product.defaultVariant) ?? product.variants[0];
}

export function getProductsByCollection(slug: string) {
  const matches = products.filter((p) => p.collections.includes(slug as Product["collections"][number]));
  return matches.length > 0 ? matches : products;
}

export function getProducts(slugs: string[]) {
  return slugs.map(getProduct).filter((p): p is Product => Boolean(p));
}

export function lowestPrice(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}

export const bestSellers = [
  "pure-desi-buffalo-ghee-500ml",
  "pure-desi-buffalo-ghee-1l",
  "pure-desi-buffalo-ghee-5l",
];
