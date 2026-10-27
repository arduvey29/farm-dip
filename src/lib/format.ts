const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number) {
  return inr.format(amount);
}

export function percentOff(price: number, mrp: number) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/** Price per litre, the number shoppers actually compare between pack sizes. */
export function pricePerLitre(price: number, volumeMl: number) {
  return Math.round((price / volumeMl) * 1000);
}

export function formatVolume(ml: number) {
  return ml >= 1000 ? `${ml / 1000} L` : `${ml} ml`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
