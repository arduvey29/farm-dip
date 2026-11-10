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
  wordmark: "Farm Dip",
  legalName: "Farm Dip Foods Pvt. Ltd.",
  tagline: "Pure desi ghee from buffalo milk",
  description:
    "Farm Dip makes pure desi ghee from buffalo milk | Rich, creamy and full of aroma, with no preservatives or additives. Made the way we ate it in our childhood. Free cash on delivery across India.",
  // In the brand's own words. Shown on the home and about pages.
  aim: "We make ghee the way we ate it in our childhood: pure, simple, rich and full of goodness. Our aim is to bring that same purity and health to every family's kitchen.",
  // The ghee's test report (a PDF in /public/images/report) and the QR code that opens it.
  testReport: {
    url: "/images/report/FARM%20DIP%20_23-10-2026.pdf",
    filename: "FARM_DIP_Lab_Report_23-10-2026.pdf",
    qr: "/images/report/test-report-qr.png",
    date: "23 October 2026",
    sampleName: "Farm Dip Pure Desi Buffalo Ghee",
    driveUrl: "https://drive.google.com/file/d/1Le706dJaJqyTn1JhOFLlTmDnt50H_x40/view?usp=sharing",
  },
  url: resolveSiteUrl(),
  locale: "en_IN",
  language: "en-IN",
  currency: "INR",
  foundingYear: 2024,

  contact: {
    phone: "87690 45495",
    phoneHref: "+918769045495",
    whatsapp: "918769045495",
    email: "info.farmdip@gmail.com",
  },

  address: {
    street: "Village Road",
    locality: "Rohtak",
    region: "Haryana",
    isoRegion: "IN-HR",
    postalCode: "124001",
    country: "IN",
    countryName: "India",
  },
  // Farm location, used for Place/GeoCoordinates structured data.
  geo: { latitude: 28.8955, longitude: 76.6066 },

  legal: {
    fssai: "22226067009895",
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

  // Litres of buffalo milk per litre of ghee, from the team's product update.
  stats: {
    milkPerLitre: "about 12 to 14 litres",
  },

  announcement: "Free cash on delivery across India. Free shipping on orders above ₹999.",
} as const;

export type Site = typeof site;

export const mainNav = [
  { label: "Shop ghee", href: "/shop" },
  { label: "How it's made", href: "/how-its-made" },
  { label: "Our story", href: "/about" },
  { label: "Lab Reports", href: "/lab-reports" },
  { label: "Contact", href: "/contact" },
] as { label: string; href: string; children?: { label: string; href: string; note: string }[] }[];

export const footerNav = {
  ghee: [
    { label: "Shop", href: "/shop" },
    { label: "How it's made", href: "/how-its-made" },
    { label: "Lab Reports", href: "/lab-reports" },
  ],
  story: [
    { label: "Our story", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact" },
  ],
  support: [
    { label: "Track your order", href: "/track-order" },
    { label: "Search", href: "/search" },
    { label: "FAQ", href: "/faq" },
  ],
  policies: [
    { label: "Shipping", href: "/policies/shipping" },
    { label: "Refund", href: "/policies/refund" },
    { label: "Privacy", href: "/policies/privacy" },
    { label: "Terms", href: "/policies/terms" },
  ],
} as const;
