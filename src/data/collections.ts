import type { Collection } from "./types";
import { asset } from "@/lib/assets";

export const collections: Collection[] = [
  {
    slug: "buffalo-ghee",
    name: "Pure buffalo ghee",
    h1: "Pure desi buffalo ghee, traditionally crafted",
    intro:
      "Farm Dip Pure Desi Buffalo Ghee is crafted from 100% pure buffalo milk. It is rich, white and dense, naturally providing a delicious creamy flavour and rich aroma that elevates every traditional meal.",
    body: [
      {
        heading: "Why choose pure buffalo ghee?",
        text: "Buffalo milk is naturally richer in healthy fats and fat-soluble vitamins. This makes buffalo ghee naturally aromatic, heat-stable, and deliciously creamy with a classic danedar (grainy) texture that melts effortlessly on hot rotis.",
      },
      {
        heading: "Perfect for everyday cooking and traditional recipes",
        text: "With its higher smoke point, pure buffalo ghee doesn't break down or burn easily, making it the finest choice for aromatic tadka, deep frying, rotis, parathas, and festive Indian sweets like halwa and ladoos.",
      },
    ],
    faqs: [
      {
        q: "What makes pure buffalo ghee special?",
        a: "Buffalo ghee offers a richer, denser texture and a wonderfully subtle, nutty aroma. It holds up exceptionally well to high cooking temperatures.",
      },
      {
        q: "Does Farm Dip buffalo ghee contain any additives?",
        a: "No. Farm Dip Pure Desi Buffalo Ghee is 100% pure and natural with zero preservatives, colours, or artificial additives.",
      },
    ],
    image: asset("/images/products/desi-buffalo-bilona-ghee/jar.svg"),
    seo: {
      title: "Pure Desi Buffalo Ghee Online: 100% Natural Buffalo Milk Ghee",
      description: "Shop Farm Dip pure desi buffalo ghee made from whole buffalo milk. Rich, creamy, and lab tested. 500 ml to 5 L. Free COD across India.",
    },
  },
  {
    slug: "gift-packs",
    name: "Packs and steel dolchis",
    h1: "Buffalo ghee packs and steel dolchis",
    intro:
      "Our pure desi buffalo ghee comes in airtight glass jars (500 ml & 1 L) and traditional stainless steel dolchis (5 L) for pantry staples and festive gifting.",
    body: [
      {
        heading: "Family staples and bulk value",
        text: "The 5 L food-grade stainless steel dolchi is our best value pack at just ₹1,980 per litre. Keeps ghee fresh for 12 months in a sturdy, reusable container.",
      },
    ],
    faqs: [
      {
        q: "Are the steel dolchis food-grade?",
        a: "Yes. Our 5 L dolchis are made from premium food-grade stainless steel with airtight seals.",
      },
    ],
    image: asset("/images/products/desi-buffalo-bilona-ghee/dolchi.svg"),
    seo: {
      title: "Pure Buffalo Ghee Packs & Steel Dolchis",
      description: "Farm Dip pure desi buffalo ghee in 500 ml, 1 L glass jars and 5 L stainless steel dolchis. Free COD across India.",
    },
  },
];

export function getCollection(slug: string) {
  if (slug === "a2-cow-ghee") return collections[0];
  return collections.find((c) => c.slug === slug) ?? collections[0];
}
