import type { Post } from "./types";
import { asset } from "@/lib/assets";

const FSSAI = { label: "Food Safety and Standards Authority of India (FSSAI): standards for ghee and the DART home-testing guide", href: "https://www.fssai.gov.in/" };
const USDA = { label: "USDA FoodData Central: nutrient profile of ghee (anhydrous butter oil)", href: "https://fdc.nal.usda.gov/" };
const NDDB = { label: "National Dairy Development Board: indigenous dairy breeds of India", href: "https://www.nddb.coop/" };

export const posts: Post[] = [
  {
    slug: "benefits-of-pure-buffalo-ghee",
    title: "Pure Desi Buffalo Ghee: Rich Taste, Danedar Texture and Nutrition",
    description:
      "Discover why pure desi buffalo ghee is cherished across India: rich aroma, creamy danedar texture, high smoke point, and natural fat-soluble vitamins.",
    quickAnswer:
      "Pure desi buffalo ghee is made from 100% whole buffalo milk. Naturally richer in milk solids and healthy fats, it delivers a distinctly rich aroma, creamy danedar (grainy) texture, and a high smoke point that makes it the premier choice for traditional cooking, aromatic tadka, and festive sweets.",
    category: "Buying guide",
    cover: asset("/images/blog/benefits-of-pure-buffalo-ghee.svg"),
    datePublished: "2026-08-12",
    dateModified: "2026-11-07",
    readingMinutes: 5,
    keyTakeaways: [
      "Pure buffalo milk is naturally rich in healthy fats and wholesome nutrients.",
      "Buffalo ghee has a higher smoke point, making it exceptionally stable for high-heat cooking.",
      "The natural cooling and cooking process gives buffalo ghee its classic danedar texture.",
      "100% natural with no preservatives, artificial colours, or chemical additives.",
    ],
    sections: [
      {
        id: "what-is-buffalo-ghee",
        heading: "What makes pure buffalo ghee special?",
        paragraphs: [
          "Buffalo milk contains a higher proportion of natural milk fat, giving buffalo ghee its luxurious, creamy mouthfeel, dense texture, and distinctive rich aroma.",
          "When cooked traditionally, buffalo ghee develops large, golden-white grains (danedar texture) that melt smoothly over steaming hot rotis, parathas, and rice dishes.",
        ],
      },
      {
        id: "cooking-benefits",
        heading: "Why buffalo ghee is the chef's choice for cooking",
        paragraphs: [
          "Because buffalo ghee has an exceptionally high smoke point (around 250°C), it does not burn or break down easily during deep frying or hot tadka. Spices release their essential oils directly into the fat, maximizing flavour and aroma.",
        ],
        table: {
          caption: "Benefits of pure desi buffalo ghee",
          head: ["Feature", "Buffalo Ghee Quality", "Cooking Benefit"],
          rows: [
            ["Texture", "Grainy & creamy (danedar)", "Melts smoothly on hot rotis"],
            ["Smoke point", "High (~250°C)", "Ideal for tadka, frying and halwa"],
            ["Flavour", "Rich, authentic & nutty", "Enhances traditional dishes"],
            ["Purity", "100% natural, no additives", "Nourishing and wholesome"],
          ],
        },
      },
      {
        id: "nutrition",
        heading: "Natural vitamins and wholesome nutrition",
        paragraphs: [
          "Pure buffalo ghee is an abundant source of fat-soluble vitamins (A, D, E, and K). These essential nutrients support healthy digestion, sustained energy, and joint flexibility.",
          "At Farm Dip, we make our buffalo ghee with zero additives, chemicals, or preservatives. Every spoonful is pure, wholesome goodness.",
        ],
      },
    ],
    faqs: [
      { q: "What does pure buffalo ghee taste like?", a: "It has a deliciously rich, nutty flavour and smooth, creamy mouthfeel that elevates rotis, dals, and traditional mithai." },
      { q: "Is buffalo ghee suitable for high heat cooking?", a: "Yes. With a high smoke point of approximately 250°C, buffalo ghee is one of the most stable fats for deep frying and tempering." },
      { q: "Does Farm Dip buffalo ghee contain preservatives?", a: "No. Farm Dip Pure Desi Buffalo Ghee is 100% natural with zero preservatives, colours, or fillers." },
    ],
    sources: [NDDB, USDA, FSSAI],
    relatedProducts: ["pure-desi-buffalo-ghee-500ml", "pure-desi-buffalo-ghee-1l"],
    keywords: ["pure desi buffalo ghee", "buffalo ghee benefits", "buffalo ghee cooking", "danedar buffalo ghee"],
  },
  {
    slug: "bilona-vs-cream-ghee",
    title: "Traditional bilona ghee vs commercial cream ghee: how they differ",
    description:
      "Traditional bilona ghee is made from curd; commercial ghee is made from machine-separated cream. We compare method, texture, taste and value.",
    quickAnswer:
      "Traditional ghee is crafted by turning whole milk into curd, churning to separate makkhan, and slow-cooking the makkhan. Commercial cream ghee skips fermentation: cream is separated mechanically and boiled. Traditional craftsmanship yields a richer, far more aromatic and grainy ghee.",
    category: "Process",
    cover: asset("/images/blog/bilona-vs-cream-ghee.svg"),
    datePublished: "2026-07-28",
    dateModified: "2026-11-07",
    readingMinutes: 5,
    keyTakeaways: [
      "Traditional method starts from curd; industrial ghee starts from separated cream.",
      "Traditional slow-cooking creates natural aroma compounds and danedar texture.",
      "Pure buffalo milk provides rich healthy fats without artificial thickeners.",
      "Always check for batch lab test reports to ensure zero adulteration.",
    ],
    sections: [
      {
        id: "two-methods",
        heading: "Two ways to make ghee",
        paragraphs: [
          "All ghee is butterfat cooked until moisture evaporates and solids separate. The difference lies in whether whole milk is cultured first or separated industrially.",
        ],
        table: {
          caption: "Traditional method compared with commercial cream method",
          head: ["", "Traditional Craft", "Commercial Cream Method"],
          rows: [
            ["Starting point", "Whole milk set into curd", "Cream separated by machine"],
            ["Cultured?", "Yes, naturally overnight", "Usually not fermented"],
            ["Texture", "Rich, grainy (danedar)", "Smooth or waxy"],
            ["Aroma", "Authentic, rich, nutty", "Milder, industrial"],
            ["Additives", "None (100% pure)", "Often uses flavour enhancers"],
          ],
        },
      },
      {
        id: "why-taste-differs",
        heading: "Why does authentic ghee taste so much better?",
        paragraphs: [
          "Slow traditional cooking and gradual cooling allow fat crystals to form naturally. That is where the beloved danedar texture and rich childhood aroma originate.",
        ],
      },
    ],
    faqs: [
      { q: "Why is traditional buffalo ghee grainy?", a: "Slow cooking and gentle cooling let fat crystals form naturally. It is the hallmark of genuine purity and traditional craft." },
      { q: "Does buffalo ghee have a strong aroma?", a: "Pure buffalo ghee has a deliciously rich, nutty, and mouth-watering aroma that enhances any Indian dish." },
    ],
    sources: [FSSAI, USDA],
    relatedProducts: ["pure-desi-buffalo-ghee-1l", "pure-desi-buffalo-ghee-5l"],
    keywords: ["traditional ghee vs commercial ghee", "pure buffalo ghee", "danedar texture ghee"],
  },
  {
    slug: "how-to-check-ghee-purity",
    title: "How to check ghee purity at home, and what a lab test checks",
    description:
      "Home tests for ghee can catch some adulteration but not all. Here are the simple tests FSSAI suggests, their limits, and the lab parameters that prove purity.",
    quickAnswer:
      "At home, you can melt a spoon of ghee: pure ghee melts quickly and turns dark brown; adulterated ghee melts slowly or stays pale. For vanaspati, FSSAI's DART guide suggests mixing melted ghee with hydrochloric acid and sugar: a crimson colour means added vanaspati. Only a lab test can rule out vegetable fats reliably.",
    category: "Purity",
    cover: asset("/images/blog/how-to-check-ghee-purity.svg"),
    datePublished: "2026-06-30",
    dateModified: "2026-11-07",
    readingMinutes: 7,
    keyTakeaways: [
      "Home tests can catch obvious adulteration, but skilled adulteration passes them.",
      "Vanaspati, vegetable oils, animal body fat and starch are the common adulterants.",
      "Lab tests such as RM value, BR reading and phytosterol acetate are the reliable checks.",
      "Buy from brands that publish a report for every batch, not one old certificate.",
    ],
    sections: [
      {
        id: "common-adulterants",
        heading: "What is ghee adulterated with?",
        paragraphs: [
          "Ghee is expensive, which makes it a common target for adulteration in India. The usual adulterants are vanaspati (hydrogenated vegetable fat), refined vegetable oils, and starches.",
        ],
      },
      {
        id: "home-tests",
        heading: "Simple home tests",
        list: {
          ordered: true,
          items: [
            "Heat test: warm a teaspoon of ghee in a pan. Pure ghee melts at once and turns dark brown. Ghee that melts slowly may be adulterated.",
            "Palm test: rub a little ghee on your palm. Pure ghee melts from body heat within a minute.",
            "Starch test: add a few drops of iodine tincture to melted ghee. A blue colour means starch has been added.",
          ],
        },
      },
      {
        id: "lab-tests",
        heading: "What a lab test checks",
        paragraphs: ["Indian labs test ghee against FSSAI standards. These are the parameters that matter most:"],
        table: {
          caption: "Key lab parameters for ghee purity",
          head: ["Parameter", "What it detects", "FSSAI limit (typical)"],
          rows: [
            ["Butyro-refractometer (BR) reading at 40°C", "Foreign oils and fats", "40.0 to 43.0"],
            ["Reichert-Meissl (RM) value", "Dilution with non-milk fats", "Minimum 28 for buffalo ghee"],
            ["Polenske value", "Coconut and other lauric oils", "1.0 to 2.0"],
            ["Baudouin test", "Vanaspati (contains sesame oil by law)", "Negative"],
            ["Phytosterol acetate test", "Any vegetable fat", "Negative"],
            ["Moisture", "Water, which shortens shelf life", "Maximum 0.3%"],
            ["Free fatty acids", "Staleness or rancidity", "Maximum 1.4%"],
          ],
        },
      },
    ],
    faqs: [
      { q: "How can I check if buffalo ghee is pure at home?", a: "Heat a spoon of ghee: pure ghee melts quickly and turns golden-brown. For starch, iodine test turns blue if adulterated." },
      { q: "Does pure buffalo ghee solidify in the fridge?", a: "Yes. Pure buffalo ghee becomes solid with a rich, uniform creamy texture in the fridge." },
    ],
    sources: [FSSAI],
    relatedProducts: ["pure-desi-buffalo-ghee-500ml", "pure-desi-buffalo-ghee-1l"],
    keywords: ["how to check ghee purity", "buffalo ghee purity test", "adulterated ghee test"],
  },
  {
    slug: "ghee-smoke-point-cooking",
    title: "Ghee smoke point: is buffalo ghee good for tadka and deep frying?",
    description:
      "Buffalo ghee's smoke point is around 250°C, higher than butter and many oils. What that means for tadka, roasting and deep frying, with a comparison table.",
    quickAnswer:
      "Buffalo ghee has a smoke point of about 250°C (482°F), much higher than butter at about 150°C. That makes pure buffalo ghee exceptionally well suited to aromatic tadka, sautéing, roasting, and deep frying.",
    category: "Cooking",
    cover: asset("/images/blog/ghee-smoke-point-cooking.svg"),
    datePublished: "2026-09-05",
    dateModified: "2026-11-07",
    readingMinutes: 4,
    keyTakeaways: [
      "Pure buffalo ghee smokes at about 250°C, butter at about 150°C.",
      "Removing milk solids is why ghee handles high heat without burning.",
      "Buffalo ghee's natural healthy fats make it exceptionally stable when heated.",
      "Use pure buffalo ghee for rich tadka, frying, and delicious sweets.",
    ],
    sections: [
      {
        id: "what-is-smoke-point",
        heading: "What is smoke point?",
        paragraphs: [
          "Smoke point is the temperature at which a fat starts to give off visible smoke. Buffalo ghee has one of the highest smoke points of any natural cooking fat, keeping your food pure, healthy, and aromatic.",
        ],
      },
      {
        id: "comparison",
        heading: "Buffalo ghee compared with other cooking fats",
        table: {
          caption: "Approximate smoke points of common cooking fats",
          head: ["Fat", "Approximate smoke point", "Good for"],
          rows: [
            ["Pure buffalo ghee", "250°C (482°F)", "Tadka, sautéing, roasting, deep frying"],
            ["Butter", "150°C (302°F)", "Baking, low-heat cooking"],
            ["Mustard oil", "about 250°C", "Pickles, tadka, frying"],
            ["Refined sunflower oil", "about 230°C", "Frying"],
            ["Extra virgin olive oil", "about 190°C", "Dressings, low to medium heat"],
          ],
        },
      },
      {
        id: "cooking-tips",
        heading: "How to cook with pure buffalo ghee",
        list: {
          items: [
            "Tadka: heat buffalo ghee until shimmering, then add jeera or mustard seeds for an instant burst of aroma.",
            "Deep frying: buffalo ghee produces crisp, fragrant puris and festive sweets without smoking.",
            "Finishing: top hot dal, khichdi, or parathas with a spoonful of pure buffalo ghee for irresistible flavour.",
          ],
        },
      },
    ],
    faqs: [
      { q: "What is the smoke point of buffalo ghee?", a: "About 250°C (482°F), giving it high thermal stability." },
      { q: "Can buffalo ghee be used for frying?", a: "Yes. It is considered the gold standard in Indian kitchens for frying puris and festive mithai." },
    ],
    sources: [USDA],
    relatedProducts: ["pure-desi-buffalo-ghee-500ml", "pure-desi-buffalo-ghee-1l"],
    keywords: ["buffalo ghee smoke point", "is buffalo ghee good for frying", "ghee for tadka"],
  },
  {
    slug: "how-to-store-ghee",
    title: "How to store buffalo ghee: shelf life, the fridge, and why texture changes",
    description:
      "Pure buffalo ghee keeps for 12 months unopened without refrigeration. How to store it, why it turns grainy or solid, and how to keep it fresh.",
    quickAnswer:
      "Store pure buffalo ghee in a closed glass or steel container in a cool, dark cupboard. Unopened, it keeps for 12 months; opened, it lasts for months if you always use a clean, dry spoon. Refrigeration is not needed.",
    category: "Storage",
    cover: asset("/images/blog/how-to-store-ghee.svg"),
    datePublished: "2026-05-18",
    dateModified: "2026-11-07",
    readingMinutes: 4,
    keyTakeaways: [
      "No fridge needed. A cool, dark cupboard is enough.",
      "Always use a dry spoon. Water is what spoils ghee.",
      "Liquid, solid and grainy are all natural textures for pure buffalo ghee.",
      "12-month shelf life when stored in airtight glass or steel containers.",
    ],
    sections: [
      {
        id: "how-to-store",
        heading: "How to store your ghee",
        list: {
          items: [
            "Keep it in an airtight glass jar or stainless steel dolchi.",
            "Store in a cool cupboard away from direct heat and sunlight.",
            "Always use a completely dry, clean spoon.",
          ],
        },
      },
    ],
    faqs: [
      { q: "Does buffalo ghee need to be refrigerated?", a: "No. Pure buffalo ghee keeps well at room temperature in a dry cupboard." },
      { q: "What is the shelf life of Farm Dip buffalo ghee?", a: "12 months from the date of packing." },
    ],
    sources: [FSSAI, USDA],
    relatedProducts: ["pure-desi-buffalo-ghee-1l", "pure-desi-buffalo-ghee-5l"],
    keywords: ["how to store buffalo ghee", "buffalo ghee shelf life"],
  },
];

export function getPost(slug: string) {
  if (slug === "a2-vs-a1-ghee") return posts[0];
  return posts.find((p) => p.slug === slug);
}

export const sortedPosts = [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
