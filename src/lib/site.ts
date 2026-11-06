/**
 * Single source of truth for brand, contact, legal and commerce settings.
 * Everything marked PLACEHOLDER must be replaced with real details before launch:
 * search engines and AI assistants cross-check these facts (NAP consistency).
 */

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Farm Dip",
  // The wordmark: "farm" in Devanagari, "dip" in Latin letters.
  wordmark: "फ़ार्म dip",
  legalName: "Farm Dip Foods Pvt. Ltd.", // PLACEHOLDER
  tagline: "Pure Desi Buffalo Ghee",
  aim: "We make ghee the way we ate it in our childhood: pure, simple, rich and full of goodness. Our aim is to bring that same purity and health to every family’s kitchen.",
  description:
    "Bring home the goodness of tradition with Farm Dip Pure Desi Ghee, crafted with care to bring authentic taste and rich aroma to your everyday meals. Made from pure buffalo milk for a rich, creamy texture and delicious flavour. 100% natural with no preservatives or additives. Free cash on delivery across India.",
  url: resolveSiteUrl(),
  locale: "en_IN",
  language: "en-IN",
  currency: "INR",
  foundingYear: 2019, // PLACEHOLDER

  contact: {
    phone: "+91 90000 00000", // PLACEHOLDER
    phoneHref: "+919000000000",
    whatsapp: "919000000000", // PLACEHOLDER, digits only
    email: "care@farmdip.example", // PLACEHOLDER
    hours: "Monday to Saturday, 9 am to 7 pm IST",
    hoursSpec: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "19:00" },
  },

  address: {
    street: "Survey No. 00, Dairy Road", // PLACEHOLDER
    locality: "Talala",
    region: "Gujarat",
    postalCode: "362150",
    country: "IN",
    countryName: "India",
  },
  // Farm location, used for Place/GeoCoordinates structured data.
  geo: { latitude: 21.0458, longitude: 70.5357 },

  legal: {
    fssai: "10000000000000", // PLACEHOLDER: 14-digit FSSAI licence number (mandatory on Indian food e-commerce)
    gstin: "24AAAAA0000A1Z5", // PLACEHOLDER
    grievanceOfficer: { name: "Grievance Officer", email: "grievance@farmdip.example" }, // PLACEHOLDER (Consumer Protection (E-Commerce) Rules, 2020)
  },

  // Add real profile URLs; they become `sameAs` in Organization structured data.
  social: [] as { label: string; href: string }[],

  commerce: {
    freeShippingThreshold: 999,
    shippingFee: 79,
    codFee: 0,
    returnWindowDays: 7,
    dispatchHours: 24,
    transitDays: { min: 2, max: 7 },
    coupons: [
      { code: "FIRSTJAR", percentOff: 10, minSubtotal: 0, label: "10% off your first order" },
      { code: "FESTIVE15", percentOff: 15, minSubtotal: 2499, label: "15% off orders above ₹2,499" },
    ],
  },

  // PLACEHOLDER figures. Only publish numbers you can substantiate.
  stats: {
    partnerFarms: 120,
    labParameters: 32,
    milkPerLitre: "12 to 14 litres",
  },

  announcement: "Free cash on delivery across India. Free shipping on orders above ₹999.",
  // Seasonal greeting shown in the top bar. Set to null outside festivals.
  festive: { hindi: "शुभ दीपावली", text: "Pure Desi Buffalo Ghee in 500 ml, 1 L & 5 L", href: "/shop" } as { hindi: string; text: string; href: string } | null,
} as const;

export type Site = typeof site;

export const mainNav = [
  {
    label: "Shop ghee",
    href: "/shop",
    children: [
      { label: "500 ml Glass Jar", href: "/products/pure-desi-buffalo-ghee-500ml", note: "Pure buffalo ghee, ₹1,350" },
      { label: "1 L Glass Jar", href: "/products/pure-desi-buffalo-ghee-1l", note: "Family favourite, ₹2,210" },
      { label: "5 L Steel Dolchi", href: "/products/pure-desi-buffalo-ghee-5l", note: "Best value, ₹9,900" },
      { label: "Buffalo Ghee", href: "/collections/buffalo-ghee", note: "Pure desi buffalo ghee" },
    ],
  },
  { label: "Bilona process", href: "/bilona-process" },
  { label: "Lab reports", href: "/lab-reports" },
  { label: "Learn", href: "/blog" },
  { label: "Our farms", href: "/about" },
] as const;

export const footerNav = {
  shop: [
    { label: "All ghee", href: "/shop" },
    { label: "500 ml Glass Jar (₹1,350)", href: "/products/pure-desi-buffalo-ghee-500ml" },
    { label: "1 L Glass Jar (₹2,210)", href: "/products/pure-desi-buffalo-ghee-1l" },
    { label: "5 L Steel Dolchi (₹9,900)", href: "/products/pure-desi-buffalo-ghee-5l" },
    { label: "Pure Buffalo Ghee", href: "/collections/buffalo-ghee" },
  ],
  company: [
    { label: "Our farms", href: "/about" },
    { label: "Bilona process", href: "/bilona-process" },
    { label: "Lab reports", href: "/lab-reports" },
    { label: "Learn about ghee", href: "/blog" },
    { label: "Contact us", href: "/contact" },
  ],
  help: [
    { label: "Track your order", href: "/track-order" },
    { label: "Questions and answers", href: "/faq" },
    { label: "Shipping policy", href: "/policies/shipping" },
    { label: "Returns and refunds", href: "/policies/returns" },
    { label: "Privacy policy", href: "/policies/privacy" },
    { label: "Terms of service", href: "/policies/terms" },
  ],
} as const;
