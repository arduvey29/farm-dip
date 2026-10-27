import type { Review } from "./types";

/*
  SAMPLE REVIEWS for layout only. Replace with real, verified customer reviews
  (e.g. from Judge.me, Yotpo or your order system) before launch.
  Ratings in structured data are computed from this list, and Google penalises
  review markup that is not genuine.
*/
export const reviews: Review[] = [
  { id: "r1", product: "a2-gir-cow-bilona-ghee", author: "Priya S.", city: "Jaipur", rating: 5, title: "Smells like my nani's ghee", body: "The moment I opened the jar the whole kitchen smelled of ghee. Grainy texture, golden colour. I have finished one jar and ordered the 2.5 L.", date: "2026-10-02", verified: true, pack: "1 L" },
  { id: "r2", product: "a2-gir-cow-bilona-ghee", author: "Rahul M.", city: "Pune", rating: 5, title: "Worth the price", body: "Costly compared to supermarket ghee, but you use less because the flavour is strong. Packing was solid, jar arrived without a scratch.", date: "2026-09-21", verified: true, pack: "500 ml" },
  { id: "r3", product: "a2-gir-cow-bilona-ghee", author: "Ananya K.", city: "Bengaluru", rating: 4, title: "Good ghee, delivery took 6 days", body: "Taste and aroma are excellent. Delivery to Bengaluru took six days, a little longer than shown. The batch report QR code worked.", date: "2026-09-14", verified: true, pack: "1 L" },
  { id: "r4", product: "a2-gir-cow-bilona-ghee", author: "Harpreet B.", city: "Ludhiana", rating: 5, title: "Danedar like homemade", body: "Proper danedar ghee. My mother checked it the old way, heating a spoon, and was happy. Will reorder.", date: "2026-08-30", verified: true, pack: "5 L" },
  { id: "r5", product: "a2-sahiwal-cow-bilona-ghee", author: "Meera N.", city: "Chennai", rating: 5, title: "Mild and lovely for sweets", body: "Made Diwali ladoos with this. Lighter taste than the Gir ghee I tried before, which my kids prefer.", date: "2026-10-08", verified: true, pack: "1 L" },
  { id: "r6", product: "a2-sahiwal-cow-bilona-ghee", author: "Vikram R.", city: "Hyderabad", rating: 4, title: "Nice, subtle aroma", body: "Good quality. Aroma is subtle. If you want a strong ghee smell go for Gir.", date: "2026-09-19", verified: true, pack: "500 ml" },
  { id: "r7", product: "desi-buffalo-bilona-ghee", author: "Sunita Y.", city: "Rohtak", rating: 5, title: "Perfect for halwa", body: "Thick, white, rich. Exactly what buffalo ghee should be. Halwa came out perfect.", date: "2026-10-05", verified: true, pack: "1 L" },
  { id: "r8", product: "desi-buffalo-bilona-ghee", author: "Arjun P.", city: "Indore", rating: 4, title: "Good for frying", body: "Doesn't smoke much when frying puris. Value for money in the 2.5 L dolchi.", date: "2026-09-02", verified: true, pack: "2.5 L" },
  { id: "r9", product: "haldi-infused-cow-ghee", author: "Kavya T.", city: "Kochi", rating: 5, title: "Haldi doodh made easy", body: "One spoon in warm milk at night. No gritty powder at the bottom of the cup.", date: "2026-10-18", verified: true, pack: "250 ml" },
  { id: "r10", product: "festive-gift-box", author: "Rohan D.", city: "Mumbai", rating: 5, title: "Clients loved it", body: "Ordered 40 boxes for clients. Each arrived with the handwritten card. The indigo box looks premium.", date: "2026-10-21", verified: true, pack: "500 ml gift box" },
  { id: "r11", product: "festive-gift-box", author: "Neha G.", city: "Delhi", rating: 5, title: "Beautiful gift", body: "Gifted to my in-laws. They asked where to buy more.", date: "2026-10-12", verified: true },
  { id: "r12", product: "ghee-tasting-duo", author: "Ishaan V.", city: "Ahmedabad", rating: 5, title: "Great way to choose", body: "Tried both on rotis. Family voted for Gir. Good idea to start small.", date: "2026-09-28", verified: true },
  { id: "r13", product: "family-saver-2x1l", author: "Lakshmi I.", city: "Coimbatore", rating: 5, title: "Monthly order now", body: "Two litres lasts us about seven weeks. Cheaper than buying single jars.", date: "2026-10-01", verified: true },
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
