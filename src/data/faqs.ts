import type { QA } from "./types";
import { site } from "@/lib/site";

const { freeShippingThreshold, shippingFee, returnWindowDays, transitDays } = site.commerce;

export const faqGroups: { id: string; title: string; items: QA[] }[] = [
  {
    id: "ghee",
    title: "About our ghee",
    items: [
      {
        q: "What is bilona ghee?",
        a: "Bilona ghee is ghee made from curd rather than cream. Whole milk is boiled, cooled and set into curd overnight. The curd is churned with a wooden churner called a bilona to separate makkhan (butter), and the makkhan is slow-cooked until it turns into clear, golden ghee.",
      },
      {
        q: "Why choose pure desi buffalo ghee?",
        a: "Made from pure buffalo milk, our ghee offers a rich, creamy texture and delicious flavour that makes every meal special. It is perfect for everyday cooking, aromatic tadka, and traditional recipes, with no preservatives or additives.",
      },
      {
        q: "How do you check that your ghee is pure?",
        a: `Every batch is tested in an independent NABL-accredited lab for ${site.stats.labParameters} parameters, including moisture, free fatty acids, butyro-refractometer reading, Reichert-Meissl value and tests for vanaspati, vegetable fat and added colour. The batch number on your jar links to its report.`,
      },
      {
        q: "Is ghee lactose-free?",
        a: "Ghee is almost pure butterfat and contains only trace amounts of lactose and milk protein, so many people with lactose intolerance tolerate it well. It is not certified lactose-free, so if you have a milk allergy, check with your doctor first.",
      },
      {
        q: "Why does the colour or texture of my ghee change between orders?",
        a: "Natural ghee changes with temperature and season. Pure buffalo ghee has a naturally rich, creamy danedar texture and stays stable in warm and cool weather. All variations are normal and reflect 100% natural purity.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Orders and delivery",
    items: [
      {
        q: "Do you deliver across India?",
        a: "Yes. We deliver to most serviceable pincodes in India. Enter your pincode on any product page to see the estimated delivery date.",
      },
      {
        q: "How long does delivery take?",
        a: `We dispatch within ${site.commerce.dispatchHours} hours on working days. Delivery usually takes ${transitDays.min} to 4 days to metro cities and 4 to ${transitDays.max} days elsewhere.`,
      },
      {
        q: "How much does shipping cost?",
        a: `Shipping is free on orders above ₹${freeShippingThreshold}. Below that, a flat ₹${shippingFee} is added at checkout.`,
      },
      {
        q: "Do you ship outside India?",
        a: "Not yet. Leave your email on our contact page and we will let you know when international shipping starts.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payments",
    items: [
      { q: "Is cash on delivery available?", a: "Yes. Cash on delivery is free across India, with no extra charge." },
      { q: "Which payment methods do you accept?", a: "UPI, debit and credit cards, net banking, popular wallets and cash on delivery." },
    ],
  },
  {
    id: "returns",
    title: "Returns and refunds",
    items: [
      {
        q: "What if my jar arrives broken or leaking?",
        a: "Send us a photo of the parcel and jar within 48 hours of delivery by WhatsApp or email. We will ship a free replacement or refund you in full.",
      },
      {
        q: "Can I return ghee I have opened?",
        a: `For food safety we cannot accept opened jars back unless there is a quality problem. If you are unhappy with the quality, tell us within ${returnWindowDays} days of delivery and we will make it right.`,
      },
    ],
  },
  {
    id: "storage",
    title: "Storage and use",
    items: [
      {
        q: "Does ghee need to be refrigerated?",
        a: "No. Keep ghee in a cool, dry cupboard away from sunlight, with the lid closed. Refrigeration makes it hard but does no harm.",
      },
      {
        q: "How long does ghee last after opening?",
        a: "Pure ghee keeps for months after opening if you always use a clean, dry spoon. Water or food particles in the jar are what make ghee spoil.",
      },
      {
        q: "Can I use ghee for deep frying?",
        a: "Yes. Ghee has a smoke point of around 250°C, higher than butter and many refined oils, so it handles deep frying and tadka well.",
      },
    ],
  },
];

export const homeFaqs: QA[] = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[0].items[2],
  faqGroups[1].items[1],
  faqGroups[2].items[0],
  faqGroups[4].items[0],
];
