import type { QA } from "./types";
import { site } from "@/lib/site";

const { freeShippingThreshold, shippingFee, returnWindowDays, transitDays } = site.commerce;

export const faqGroups: { id: string; title: string; items: QA[] }[] = [
  {
    id: "ghee",
    title: "About our ghee",
    items: [
      {
        q: "What is Farm Dip ghee made from?",
        a: "Pure buffalo milk, and nothing else. There are no preservatives, no additives and no colour. We make it the way we ate ghee in our childhood: pure, simple and rich.",
      },
      {
        q: "Why is buffalo ghee white and not yellow?",
        a: "Cow milk carries beta-carotene from the fodder, which makes cow ghee yellow. Buffalo milk has almost none, so pure buffalo ghee is naturally creamy white. The colour is not a sign of anything added or removed.",
      },
      {
        q: "What is the difference between buffalo ghee and cow ghee?",
        a: "Buffalo milk has roughly twice the fat of cow milk, so buffalo ghee is thicker, creamier and richer, and sets firm when cool. Cow ghee is yellow, lighter and often grainy. Buffalo ghee is the favourite for halwa, ladoo, mithai, parathas and frying.",
      },
      {
        q: "Is Farm Dip ghee good for everyday cooking?",
        a: "Yes. It holds up well to high heat, so it is good for tadka, rotis, parathas and frying, and for traditional recipes and sweets.",
      },
      {
        q: "Is ghee lactose-free?",
        a: "Ghee is almost pure milk fat and contains only trace amounts of lactose and milk protein, so many people with lactose intolerance tolerate it well. It is not certified lactose-free, so if you have a milk allergy, check with your doctor first.",
      },
      {
        q: "Why does the texture of my ghee change?",
        a: "Ghee changes with temperature. It is soft or liquid in summer, firm in winter and often grainy in between. Buffalo ghee sets firmer than cow ghee. None of this changes its quality.",
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
