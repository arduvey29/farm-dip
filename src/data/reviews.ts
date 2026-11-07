import type { Review } from "./types";

/*
  SAMPLE REVIEWS for layout only. Replace with real, verified customer reviews
  (e.g. from Judge.me, Yotpo or your order system) before launch.
  Ratings in structured data are computed from this list, and Google penalises
  review markup that is not genuine.
*/
export const reviews: Review[] = [
  { id: "r1", product: "pure-desi-buffalo-ghee", author: "Sunita Y.", city: "Rohtak", rating: 5, title: "Just like ghar ka ghee", body: "Thick, white and full of smell, the way my mother's ghee was. The halwa came out perfect.", date: "2026-11-02", verified: true, pack: "1 L" },
  { id: "r2", product: "pure-desi-buffalo-ghee", author: "Harpreet B.", city: "Ludhiana", rating: 5, title: "Rich and creamy", body: "We use it on parathas every morning. Very rich, so a little goes a long way. Ordering the 5 litre pack next.", date: "2026-10-28", verified: true, pack: "1 L" },
  { id: "r3", product: "pure-desi-buffalo-ghee", author: "Rahul M.", city: "Jaipur", rating: 4, title: "Good ghee, well packed", body: "Taste and aroma are very good. Jar came packed well. Delivery took five days.", date: "2026-10-21", verified: true, pack: "500 ml" },
  { id: "r4", product: "pure-desi-buffalo-ghee", author: "Neha G.", city: "Delhi", rating: 5, title: "Perfect for Diwali sweets", body: "Made ladoo and besan barfi with it. Everyone asked which ghee we used.", date: "2026-10-30", verified: true, pack: "5 L" },
];

export function getReviews(product: string) {
  return reviews.filter((r) => r.product === product).sort((a, b) => b.date.localeCompare(a.date));
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
