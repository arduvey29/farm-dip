export type QA = { q: string; a: string };

export type CollectionSlug = "buffalo-ghee" | "gift-packs" | "a2-cow-ghee";

export type Variant = {
  /** URL-safe id, used as ?pack= on product pages. */
  id: string;
  label: string;
  volumeMl: number;
  price: number;
  mrp: number;
  sku: string;
  packaging: string;
  inStock: boolean;
  image: string;
  bestValue?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  kind: "single" | "bundle";
  /** Litres of milk that go into one litre of this ghee, shown on the product page. */
  milk?: { litresPerLitre: number; source: string };
  collections: CollectionSlug[];
  badge?: string;
  tagline: string;
  /** One sentence. Used on cards and as the base of the meta description. */
  summary: string;
  description: string[];
  highlights: string[];
  /** "At a glance" facts. Rendered as a definition list: easy for shoppers to scan and for AI to quote. */
  facts: { label: string; value: string }[];
  images: { src: string; alt: string }[];
  variants: Variant[];
  defaultVariant: string;
  contains?: string[];
  ingredients: string;
  shelfLife: string;
  storage: string;
  uses: string[];
  faqs: QA[];
  related: string[];
  seo: { title: string; description: string; keywords: string[] };
  updatedAt: string;
};

export type Review = {
  id: string;
  product: string;
  author: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  pack?: string;
};

export type Collection = {
  slug: CollectionSlug;
  name: string;
  h1: string;
  /** Answer-first intro shown above the grid. */
  intro: string;
  body: { heading: string; text: string }[];
  faqs: QA[];
  image: string;
  seo: { title: string; description: string };
};

export type PostSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  list?: { ordered?: boolean; items: string[] };
  table?: { caption: string; head: string[]; rows: string[][] };
  /** Paragraphs rendered after the list or table. */
  after?: string[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** 40–60 word direct answer for featured snippets, voice assistants and AI overviews. */
  quickAnswer: string;
  category: "Buying guide" | "Process" | "Cooking" | "Storage" | "Purity";
  cover: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  keyTakeaways: string[];
  sections: PostSection[];
  faqs: QA[];
  sources: { label: string; href: string }[];
  relatedProducts: string[];
  keywords: string[];
};
