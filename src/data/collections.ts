import type { Collection } from "./types";
import { asset } from "@/lib/assets";

export const collections: Collection[] = [
  {
    slug: "a2-cow-ghee",
    name: "A2 cow ghee",
    h1: "A2 desi cow ghee, bilona churned",
    intro:
      "A2 cow ghee is ghee made from the milk of native Indian cow breeds such as Gir and Sahiwal, whose milk carries the A2 type of beta-casein protein. Ours is made by the bilona method: milk set into curd, hand-churned into makkhan and slow-cooked.",
    body: [
      {
        heading: "Gir or Sahiwal: which should you choose?",
        text: "Both are A2 breeds and both ghees are made the same way. Gir ghee is golden with a strong, nutty aroma that suits tadka and rotis. Sahiwal ghee is paler and milder, which many families prefer for sweets and children's food. If you cannot decide, the tasting duo has both.",
      },
      {
        heading: "What makes bilona ghee different?",
        text: "Most ghee is made by boiling separated cream. Bilona ghee starts from whole milk turned into curd, which is churned to collect makkhan. It takes about twice the milk and much more time, and gives a grainy texture and deeper aroma.",
      },
    ],
    faqs: [
      { q: "What does A2 mean on ghee?", a: "A2 refers to the type of beta-casein protein in the milk the ghee is made from. Native Indian breeds like Gir and Sahiwal give A2 milk. Ghee is almost pure fat, so the label mainly tells you which cows the milk came from." },
      { q: "Is A2 ghee the same as desi ghee?", a: "Desi ghee usually means traditionally made Indian ghee, from any cow or buffalo milk. A2 ghee specifically comes from native breeds with A2 milk." },
    ],
    image: asset("/images/products/a2-gir-cow-bilona-ghee/jar.svg"),
    seo: {
      title: "A2 Desi Cow Ghee Online: Gir and Sahiwal Bilona Ghee",
      description: "Shop A2 desi cow ghee from Gir and Sahiwal cows, churned from curd by the bilona method. Lab tested every batch. 250 ml to 5 L. Free COD across India.",
    },
  },
  {
    slug: "buffalo-ghee",
    name: "Buffalo ghee",
    h1: "Desi buffalo ghee, churned from curd",
    intro:
      "Buffalo ghee is ghee made from buffalo milk. It is white, rich and dense because buffalo milk has more fat and no yellow beta-carotene. It holds up well to high heat, so it is the traditional choice for frying and mithai.",
    body: [
      {
        heading: "When to use buffalo ghee",
        text: "Use buffalo ghee for deep frying, parathas, halwa and mithai, where its richness and stability help. Many households keep cow ghee for the table and buffalo ghee for cooking.",
      },
    ],
    faqs: [
      { q: "Is buffalo ghee healthier than cow ghee?", a: "Neither is simply healthier. Buffalo ghee is richer and denser; cow ghee is lighter with more beta-carotene. Choose by taste and use. Both are mostly fat, so use them in moderation." },
    ],
    image: asset("/images/products/desi-buffalo-bilona-ghee/jar.svg"),
    seo: {
      title: "Desi Buffalo Ghee Online: Bilona, Curd-Churned",
      description: "Buy desi buffalo ghee made by the bilona method from curd. Rich and white, ideal for frying and sweets. Lab tested. Free COD across India.",
    },
  },
  {
    slug: "infused-ghee",
    name: "Infused ghee",
    h1: "Infused ghee made with A2 Gir cow ghee",
    intro:
      "Infused ghee is ghee gently warmed with spices or herbs and strained, so the flavour stays in the fat. Ours starts with A2 Gir cow bilona ghee and real whole spices, with nothing artificial.",
    body: [
      {
        heading: "How to cook with infused ghee",
        text: "Use infused ghee to finish dishes rather than for high-heat frying, so the spices stay fresh. A spoon over dal, khichdi, rice or roasted vegetables is enough.",
      },
    ],
    faqs: [
      { q: "Does infused ghee last as long as plain ghee?", a: "Slightly less. Our infused ghee has a 9 month shelf life against 12 months for plain ghee." },
    ],
    image: asset("/images/products/haldi-infused-cow-ghee/jar.svg"),
    seo: {
      title: "Infused Ghee: Haldi and Black Pepper A2 Cow Ghee",
      description: "A2 Gir cow bilona ghee infused with Lakadong turmeric and black pepper. Real spices, no colour or preservatives. Free COD across India.",
    },
  },
  {
    slug: "gift-packs",
    name: "Gift packs and savers",
    h1: "Ghee gift boxes and family saver packs",
    intro:
      "Our gift packs pair A2 bilona ghee with block-print boxes and handwritten cards for Diwali, weddings and corporate gifting. Saver packs give families a lower price per litre.",
    body: [
      {
        heading: "Corporate and bulk gifting",
        text: "We pack and deliver gift boxes to multiple addresses across India, with your logo on the card. Write to us with the number of boxes and delivery dates for a quote.",
      },
    ],
    faqs: [
      { q: "Can you deliver gifts to different addresses?", a: "Yes. For bulk orders, send us a list of addresses and we will ship each box separately with tracking." },
    ],
    image: asset("/images/products/festive-gift-box/bundle.svg"),
    seo: {
      title: "Ghee Gift Boxes and Combo Packs for Diwali",
      description: "A2 Gir cow ghee gift boxes with handwritten cards, tasting duos and family saver packs. Corporate gifting across India. Free COD.",
    },
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
