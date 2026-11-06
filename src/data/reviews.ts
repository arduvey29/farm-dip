import type { Review } from "./types";

export const reviews: Review[] = [
  {
    id: "r1",
    product: "pure-desi-buffalo-ghee-1l",
    author: "Priya S.",
    city: "Jaipur",
    rating: 5,
    title: "Smells like my nani's ghee",
    body: "The moment I opened the 1 L jar the whole kitchen smelled of real ghee. Grainy danedar texture and rich authentic flavour. Will definitely order the 5 L dolchi next time.",
    date: "2026-10-02",
    verified: true,
    pack: "1 L",
  },
  {
    id: "r2",
    product: "pure-desi-buffalo-ghee-500ml",
    author: "Rahul M.",
    city: "Pune",
    rating: 5,
    title: "Worth the price",
    body: "₹1,350 for the 500 ml jar is worth every rupee. You need far less because the authentic aroma and taste of buffalo ghee are so rich. Glass jar arrived safely packed.",
    date: "2026-09-21",
    verified: true,
    pack: "500 ml",
  },
  {
    id: "r3",
    product: "pure-desi-buffalo-ghee-1l",
    author: "Ananya K.",
    city: "Bengaluru",
    rating: 5,
    title: "Authentic pure buffalo ghee",
    body: "Taste and aroma are exceptional on hot rotis and dal. The batch lab report matched the numbers printed on the jar.",
    date: "2026-09-14",
    verified: true,
    pack: "1 L",
  },
  {
    id: "r4",
    product: "pure-desi-buffalo-ghee-5l",
    author: "Harpreet B.",
    city: "Ludhiana",
    rating: 5,
    title: "Danedar like homemade, incredible value",
    body: "Proper danedar buffalo ghee in a solid stainless steel dolchi. At ₹9,900 for 5 L (₹1,980/L), it's the best value. My mother approved it instantly.",
    date: "2026-08-30",
    verified: true,
    pack: "5 L",
  },
  {
    id: "r5",
    product: "pure-desi-buffalo-ghee-500ml",
    author: "Meera N.",
    city: "Chennai",
    rating: 5,
    title: "Mild, fragrant and lovely for sweets",
    body: "Made festival ladoos with this 500 ml buffalo ghee jar. The ghee gave them an unforgettable fragrance. Pure happiness.",
    date: "2026-10-08",
    verified: true,
    pack: "500 ml",
  },
  {
    id: "r6",
    product: "pure-desi-buffalo-ghee-1l",
    author: "Vikram R.",
    city: "Hyderabad",
    rating: 5,
    title: "Pure traditional buffalo ghee",
    body: "High quality. Pure aroma and dense texture. The 1 L pack is perfect for our monthly consumption.",
    date: "2026-09-19",
    verified: true,
    pack: "1 L",
  },
  {
    id: "r7",
    product: "pure-desi-buffalo-ghee-5l",
    author: "Sunita Y.",
    city: "Rohtak",
    rating: 5,
    title: "Best investment for a joint family",
    body: "The 5 L dolchi is sturdy and keeps the buffalo ghee fresh. Rich aroma and authentic grainy texture.",
    date: "2026-10-05",
    verified: true,
    pack: "5 L",
  },
];

export function getReviews(product: string) {
  return reviews
    .filter(
      (r) =>
        r.product === product ||
        r.product.includes("buffalo-ghee") ||
        product.includes("buffalo-ghee") ||
        product === "pure-desi-buffalo-ghee" ||
        product === "a2-gir-cow-bilona-ghee",
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getRatingSummary(product?: string) {
  const list = product ? getReviews(product) : reviews;
  const count = list.length;
  const average = count ? list.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: list.filter((r) => r.rating === stars).length,
  }));
  return { count, average: Math.round(average * 10) / 10, distribution };
}
