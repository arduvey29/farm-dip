import { site } from "@/lib/site";

const { freeShippingThreshold, shippingFee, dispatchHours, transitDays } = site.commerce;

export type Policy = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const policies: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping Policy",
    description: `Free shipping above ₹${freeShippingThreshold} | Dispatch within ${dispatchHours} hours and delivery across India in ${transitDays.min} to ${transitDays.max} days.`,
    updated: "2026-10-01",
    sections: [
      {
        heading: "Where we deliver",
        paragraphs: ["We deliver to most serviceable pincodes in India. Enter your pincode on a product page to check delivery to your address."],
      },
      {
        heading: "Shipping charges",
        paragraphs: [`Shipping is free on orders above ₹${freeShippingThreshold}. Orders below that have a flat shipping charge of ₹${shippingFee}. Cash on delivery is free.`],
      },
      {
        heading: "Dispatch and delivery times",
        paragraphs: [
          `Orders are dispatched within ${dispatchHours} hours on working days (Monday to Saturday, excluding public holidays).`,
          `Delivery usually takes ${transitDays.min} to 4 working days to metro cities and 4 to ${transitDays.max} working days elsewhere. You will receive tracking details by SMS, WhatsApp and email.`,
        ],
      },
      {
        heading: "Packaging",
        paragraphs: ["Jars are packed in moulded pulp inserts inside double-wall cartons with airtight seals. If a parcel looks damaged, take a photo before opening it."],
      },
    ],
  },
  {
    slug: "refund",
    title: "Refund Policy",
    description: "Our 7-day purity guarantee and refund policy | Full refund upon verified independent lab report if any quality issue is found.",
    updated: "2026-11-10",
    sections: [
      {
        heading: "Purity & quality guarantee",
        paragraphs: [
          "We take immense pride in the purity of Farm Dip Pure Desi Buffalo Ghee. Every batch is made from 100% natural buffalo milk without any preservatives, additives, or vanaspati.",
          `If you believe the ghee does not meet authentic quality standards or the product is impure in any way, you can get it tested at an accredited food laboratory and email the test report to us at ${site.contact.email}.`,
        ],
      },
      {
        heading: "Verification & 7-day refund",
        paragraphs: [
          "Once you email us the laboratory test report along with your order details and jar batch number, our quality team will conduct a thorough review.",
          "After proper checking and verification of the report, your refund will be processed and credited to your original payment method (or bank account/UPI for cash on delivery) within 7 days.",
        ],
      },
      {
        heading: "Contact us for refunds",
        paragraphs: [
          `To submit a lab report or request a refund, please write to us at ${site.contact.email} or contact our customer support with your order number.`,
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How Farm Dip collects, uses, and protects your personal data | DPDP Act compliant privacy guidelines.",
    updated: "2026-10-01",
    sections: [
      {
        heading: "What we collect",
        paragraphs: ["When you order, we collect your name, phone number, email, delivery address and order details. Payments are processed by our payment partner; we never see or store your full card details."],
      },
      {
        heading: "How we use it",
        paragraphs: ["We use your data to deliver orders, send order updates, provide support and, if you opt in, send offers. We do not sell your personal data."],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: ["We use essential cookies to keep your cart working, and analytics to understand how our site is used. Your cart is stored in your browser."],
      },
      {
        heading: "Your rights",
        paragraphs: [`You can ask us to access, correct or delete your personal data under the Digital Personal Data Protection Act, 2023. Write to ${site.contact.email}.`],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    description: "Terms and conditions governing orders, deliveries, payments, and website use for Farm Dip Foods.",
    updated: "2026-10-01",
    sections: [
      {
        heading: "About us",
        paragraphs: [`This website is operated by ${site.legalName}, ${site.address.locality}, ${site.address.region}, India. FSSAI licence number ${site.legal.fssai}.`],
      },
      {
        heading: "Prices and orders",
        paragraphs: ["All prices are in Indian rupees and include GST. We may cancel an order if a product is out of stock or a price was shown in error, and will refund any payment in full."],
      },
      {
        heading: "Product information",
        paragraphs: ["Natural ghee varies in colour and texture with the season. Images are for illustration. Nutrition values are typical, not guaranteed for every batch."],
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
