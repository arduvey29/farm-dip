import { site } from "@/lib/site";

const { freeShippingThreshold, shippingFee, returnWindowDays, dispatchHours, transitDays } = site.commerce;

export type Policy = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

/* PLACEHOLDER legal copy. Have a lawyer review before launch. */
export const policies: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping policy",
    description: `Free shipping above ₹${freeShippingThreshold}, dispatch within ${dispatchHours} hours and delivery across India in ${transitDays.min} to ${transitDays.max} days.`,
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
        paragraphs: ["Glass jars are packed in moulded pulp inserts inside double-wall cartons. Steel dolchis are sealed and boxed. If a parcel looks damaged, take a photo before opening it."],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns and refund policy",
    description: `Free replacement for broken or leaking jars reported within 48 hours, and a ${returnWindowDays}-day quality promise.`,
    updated: "2026-10-01",
    sections: [
      {
        heading: "Damaged or leaking jars",
        paragraphs: ["If your jar arrives broken or leaking, send a photo of the parcel and product within 48 hours of delivery. We will send a free replacement or refund you in full, as you prefer."],
      },
      {
        heading: "Quality promise",
        paragraphs: [`If you are not happy with the quality of our ghee, tell us within ${returnWindowDays} days of delivery. We may ask for the batch number and a photo. We will replace the product or refund you.`],
      },
      {
        heading: "Opened products",
        paragraphs: ["For food safety, we cannot resell or accept opened products back except where there is a quality issue covered above."],
      },
      {
        heading: "Refund timelines",
        paragraphs: ["Refunds to UPI, cards and net banking are processed within 5 to 7 working days of approval. For cash on delivery orders, we refund to your bank account or UPI ID."],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    description: "What personal data we collect, why, and how you can control it.",
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
    title: "Terms of service",
    description: "The terms that apply when you use our website and buy from us.",
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
      {
        heading: "Grievances",
        paragraphs: [`Our grievance officer, ${site.legal.grievanceOfficer.name}, can be reached at ${site.legal.grievanceOfficer.email}. We acknowledge complaints within 48 hours and resolve them within one month.`],
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
