import type { Post } from "./types";
import { asset } from "@/lib/assets";

const FSSAI = { label: "Food Safety and Standards Authority of India (FSSAI): standards for ghee and the DART home-testing guide", href: "https://www.fssai.gov.in/" };
const USDA = { label: "USDA FoodData Central: nutrient profile of ghee (anhydrous butter oil)", href: "https://fdc.nal.usda.gov/" };

export const posts: Post[] = [
  {
    slug: "buffalo-ghee-vs-cow-ghee",
    title: "Buffalo Ghee vs Cow Ghee | Colour, Taste, Texture & Cooking Uses",
    description:
      "Buffalo ghee is white, thick and rich; cow ghee is yellow and lighter | Why they differ, how they compare for cooking, smoke points, and how to choose.",
    quickAnswer:
      "Buffalo ghee is made from buffalo milk, which has roughly twice the fat of cow milk and almost no beta-carotene. So buffalo ghee is creamy white, thicker and richer, and sets firm when cool. Cow ghee is yellow and lighter. Both are pure ghee; buffalo ghee is the classic choice for halwa, mithai, parathas and frying.",
    category: "Buying guide",
    cover: asset("/images/blog/buffalo-ghee-vs-cow-ghee.svg"),
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    readingMinutes: 5,
    keyTakeaways: [
      "Buffalo ghee is white because buffalo milk carries almost no beta-carotene. Cow ghee is yellow because cow milk does.",
      "Buffalo milk has about 6 to 8% fat against about 3.5 to 4.5% in cow milk, so it gives more malai and more ghee per litre.",
      "Buffalo ghee is thicker and richer and sets firm in cool weather; cow ghee is softer and lighter.",
      "Both are pure ghee. Choose by taste and by what you cook.",
    ],
    sections: [
      {
        id: "why-white",
        heading: "Why is buffalo ghee white?",
        paragraphs: [
          "The yellow in cow ghee comes from beta-carotene, a pigment cows take in from green fodder and pass into their milk fat. Buffalo turn almost all of it into colourless vitamin A, so their milk, butter and ghee are white.",
          "So a pure buffalo ghee should look creamy white, and a pure cow ghee golden. Colour alone does not prove purity either way.",
        ],
      },
      {
        id: "how-they-compare",
        heading: "How do buffalo ghee and cow ghee compare?",
        table: {
          caption: "Buffalo ghee and cow ghee compared",
          head: ["", "Buffalo ghee", "Cow ghee"],
          rows: [
            ["Colour", "Creamy white", "Golden yellow"],
            ["Fat in the milk", "About 6 to 8%", "About 3.5 to 4.5%"],
            ["Texture", "Thick, creamy, sets firm when cool", "Softer, often grainy"],
            ["Taste", "Rich and sweet", "Lighter and nutty"],
            ["Best for", "Halwa, ladoo, mithai, parathas, puris, frying", "Everyday tadka, dal and rice"],
          ],
        },
      },
      {
        id: "which-to-use",
        heading: "Which ghee should I use?",
        list: {
          items: [
            "For sweets such as halwa, ladoo, barfi and gajar ka halwa, buffalo ghee gives the rich, full taste most family recipes expect.",
            "For parathas, puris and frying, buffalo ghee's richness and its tolerance of high heat work well.",
            "For a spoon over hot dal or rice, either works; it comes down to the taste your family grew up with.",
          ],
        },
        after: ["Many households in Punjab, Haryana and Uttar Pradesh have always cooked with buffalo ghee, because buffalo milk was what the family had at home."],
      },
      {
        id: "buying",
        heading: "What to look for when you buy buffalo ghee",
        list: {
          ordered: true,
          items: [
            "It should be white to creamy white, never bright yellow.",
            "The ingredients should say only ghee, or milk fat, from buffalo milk. Nothing else.",
            "It should smell rich and sweet when warmed, not flat or oily.",
            "It should set firm in the fridge and melt clear when heated.",
          ],
        },
      },
    ],
    faqs: [
      { q: "Is buffalo ghee healthier than cow ghee?", a: "Both are pure ghee and nutritionally very similar per spoon. Buffalo ghee is a little richer. Choose by taste and by what you cook, and use any ghee in moderation." },
      { q: "Why is buffalo ghee cheaper per litre than some cow ghee?", a: "Buffalo milk has more fat, so less milk is needed for each litre of ghee. Price also depends on how the ghee is made and packed." },
      { q: "Can I mix buffalo ghee and cow ghee?", a: "You can in cooking, but a pure ghee should be one or the other. Farm Dip ghee is made only from buffalo milk." },
    ],
    sources: [USDA, FSSAI],
    relatedProducts: ["pure-desi-buffalo-ghee"],
    keywords: ["buffalo ghee vs cow ghee", "why is buffalo ghee white", "buffalo ghee benefits", "bhains ka ghee", "which ghee is best for sweets"],
  },
  {
    slug: "benefits-of-pure-buffalo-ghee",
    title: "Pure Desi Buffalo Ghee | Benefits, Danedar Texture & Nutrition",
    description:
      "Why pure desi buffalo ghee is cherished across India | Rich aroma, creamy danedar texture, high smoke point, and natural fat-soluble vitamins.",
    quickAnswer:
      "Pure desi buffalo ghee is made from whole buffalo milk, which is naturally rich in milk fat. That gives it a distinctly rich aroma, a creamy danedar (grainy) texture and a high smoke point, which is why it is a favourite for traditional cooking, tadka and festive sweets.",
    category: "Buying guide",
    cover: asset("/images/blog/benefits-of-pure-buffalo-ghee.svg"),
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    readingMinutes: 4,
    keyTakeaways: [
      "Buffalo milk is naturally rich in milk fat, which makes its ghee thick and creamy.",
      "Ghee has a high smoke point, around 250°C, so it is stable for high-heat cooking.",
      "Slow cooking and natural cooling give buffalo ghee its classic danedar texture.",
      "Farm Dip ghee is 100% natural, with no preservatives, colours or additives.",
    ],
    sections: [
      {
        id: "what-is-buffalo-ghee",
        heading: "What makes pure buffalo ghee special?",
        paragraphs: [
          "Buffalo milk carries more natural milk fat than cow milk, which gives buffalo ghee its creamy mouthfeel, dense texture and rich aroma.",
          "Cooked the traditional way, buffalo ghee forms soft, creamy-white grains (danedar texture) that melt smoothly over hot rotis, parathas and rice.",
        ],
      },
      {
        id: "cooking-benefits",
        heading: "Why cooks reach for buffalo ghee",
        paragraphs: [
          "Ghee has a high smoke point, around 250°C, so it does not burn easily during deep frying or a hot tadka. Spices release their aroma into the fat, which is what makes a ghee tadka smell the way it does.",
        ],
        table: {
          caption: "Pure desi buffalo ghee in the kitchen",
          head: ["Feature", "Buffalo ghee", "In the kitchen"],
          rows: [
            ["Texture", "Grainy and creamy (danedar)", "Melts smoothly on hot rotis"],
            ["Smoke point", "High, around 250°C", "Good for tadka, frying and halwa"],
            ["Flavour", "Rich and authentic", "Lifts traditional dishes"],
            ["Purity", "100% natural, nothing added", "Just ghee, as it should be"],
          ],
        },
      },
      {
        id: "nutrition",
        heading: "Vitamins and nutrition",
        paragraphs: [
          "Like all ghee, buffalo ghee naturally carries the fat-soluble vitamins A, D, E and K. Ghee is almost pure fat, so enjoy it as part of a balanced diet.",
          "Farm Dip makes its buffalo ghee with nothing added: no preservatives, colours or chemicals. Every spoonful is just ghee.",
        ],
      },
    ],
    faqs: [
      { q: "What does pure buffalo ghee taste like?", a: "It has a rich, mildly sweet flavour and a smooth, creamy mouthfeel that lifts rotis, dal and traditional mithai." },
      { q: "Is buffalo ghee suitable for high-heat cooking?", a: "Yes. With a smoke point of around 250°C, ghee is one of the most stable fats for deep frying and tempering." },
      { q: "Does Farm Dip buffalo ghee contain preservatives?", a: "No. Farm Dip Pure Desi Buffalo Ghee is 100% natural, with no preservatives, colours or fillers." },
    ],
    sources: [USDA, FSSAI],
    relatedProducts: ["pure-desi-buffalo-ghee"],
    keywords: ["pure desi buffalo ghee", "buffalo ghee benefits", "buffalo ghee for cooking", "danedar buffalo ghee"],
  },
  {
    slug: "how-to-check-ghee-purity",
    title: "How to Check Ghee Purity at Home | Lab Test Parameters & FSSAI Tests",
    description:
      "Home tests suggested by FSSAI to check ghee purity | Simple tests, limitations, and key laboratory parameters (RM value, Baudouin) that prove authenticity.",
    quickAnswer:
      "At home, you can melt a spoon of ghee: pure ghee melts quickly and turns dark brown; adulterated ghee melts slowly or stays pale. For vanaspati, FSSAI's DART guide suggests mixing melted ghee with hydrochloric acid and sugar: a crimson colour means added vanaspati. Only a lab test can rule out vegetable fats reliably.",
    category: "Purity",
    cover: asset("/images/blog/how-to-check-ghee-purity.svg"),
    datePublished: "2026-06-30",
    dateModified: "2026-10-15",
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
          "Ghee is expensive, which makes it a common target for adulteration in India. The usual adulterants are vanaspati (hydrogenated vegetable fat), refined vegetable oils, animal body fat, and starches such as mashed potato or flour added for body.",
        ],
      },
      {
        id: "home-tests",
        heading: "Simple home tests",
        list: {
          ordered: true,
          items: [
            "Heat test: warm a teaspoon of ghee in a pan. Pure ghee melts at once and turns dark brown. Ghee that melts slowly or stays yellow may be adulterated.",
            "Palm test: rub a little ghee on your palm. Pure ghee melts from body heat within a minute.",
            "Starch test: add a few drops of iodine tincture to melted ghee. A blue colour means starch has been added.",
            "Vanaspati test (from FSSAI's DART guide): mix one teaspoon of melted ghee with an equal amount of concentrated hydrochloric acid and a pinch of sugar. A crimson colour suggests added vanaspati. Handle the acid with care.",
            "Fridge test: melt ghee in a jar and refrigerate. Separate layers can indicate other fats were mixed in.",
          ],
        },
        after: [
          "These tests catch crude adulteration. A careful adulterant blend can pass all of them, which is why lab testing matters.",
        ],
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
            ["Reichert-Meissl (RM) value", "Dilution with non-milk fats", "Minimum 24 (varies by region)"],
            ["Polenske value", "Coconut and other lauric oils", "1.0 to 2.0"],
            ["Baudouin test", "Vanaspati (contains sesame oil by law)", "Negative"],
            ["Phytosterol acetate test", "Any vegetable fat", "Negative"],
            ["Moisture", "Water, which shortens shelf life", "Maximum 0.5%"],
            ["Free fatty acids", "Staleness or rancidity", "Maximum 3.0%"],
          ],
        },
      },
      {
        id: "what-to-ask",
        heading: "What to ask a ghee brand",
        list: {
          items: [
            "Is there a lab report for the batch I am buying, or only one sample from years ago?",
            "Is the lab NABL-accredited and independent?",
            "Does the report include the phytosterol acetate and Baudouin tests?",
            "Can I match the batch number on my jar to the report?",
          ],
        },
      },
    ],
    faqs: [
      { q: "How can I check if ghee is pure at home?", a: "Heat a spoon of ghee: pure ghee melts quickly and turns dark brown. Add iodine to melted ghee to check for starch (blue means starch). For vanaspati, FSSAI's DART guide uses hydrochloric acid and sugar: a crimson colour indicates adulteration." },
      { q: "Does pure ghee solidify in the fridge?", a: "Yes. Pure ghee becomes solid and evenly textured in the fridge. Distinct separate layers can suggest other fats have been mixed in." },
      { q: "Which lab test proves ghee has no vegetable fat?", a: "The phytosterol acetate test. Plant sterols are only present in vegetable fats, so a negative result shows no vegetable fat was added." },
    ],
    sources: [FSSAI],
    relatedProducts: ["pure-desi-buffalo-ghee"],
    keywords: ["how to check ghee purity", "ghee purity test at home", "adulterated ghee test", "ghee lab test"],
  },
  {
    slug: "ghee-smoke-point-cooking",
    title: "Ghee Smoke Point | Cooking, Tadka & Deep Frying Guide",
    description:
      "Ghee's smoke point is around 250°C (482°F) | Why it outperforms butter and cooking oils for high-heat cooking, tadka, roasting, and deep frying.",
    quickAnswer:
      "Ghee has a smoke point of about 250°C (482°F), much higher than butter at about 150°C, because the milk solids that burn in butter have been removed. That makes ghee well suited to tadka, sautéing, roasting and deep frying.",
    category: "Cooking",
    cover: asset("/images/blog/ghee-smoke-point-cooking.svg"),
    datePublished: "2026-09-05",
    dateModified: "2026-10-10",
    readingMinutes: 4,
    keyTakeaways: [
      "Ghee smokes at about 250°C, butter at about 150°C.",
      "Removing milk solids is why ghee handles high heat.",
      "Ghee's saturated fat makes it stable when heated.",
      "Use buffalo ghee for heavy frying and cow ghee for finishing.",
    ],
    sections: [
      {
        id: "what-is-smoke-point",
        heading: "What is smoke point?",
        paragraphs: [
          "Smoke point is the temperature at which a fat starts to give off visible smoke. Past it, the fat begins to break down, tastes acrid and produces irritating compounds. Choosing a fat with a smoke point above your cooking temperature keeps food tasting clean.",
        ],
      },
      {
        id: "comparison",
        heading: "Ghee compared with other cooking fats",
        table: {
          caption: "Approximate smoke points of common cooking fats",
          head: ["Fat", "Approximate smoke point", "Good for"],
          rows: [
            ["Ghee", "250°C (482°F)", "Tadka, sautéing, roasting, deep frying"],
            ["Butter", "150°C (302°F)", "Baking, low-heat cooking"],
            ["Cold-pressed mustard oil", "about 250°C", "Pickles, tadka, frying"],
            ["Refined sunflower oil", "about 230°C", "Frying"],
            ["Extra virgin olive oil", "about 190°C", "Dressings, low to medium heat"],
            ["Cold-pressed coconut oil", "about 175°C", "Medium heat, South Indian cooking"],
          ],
        },
        after: ["Smoke points vary with quality and freshness, so treat these as guides."],
      },
      {
        id: "cooking-tips",
        heading: "How to cook with ghee",
        list: {
          items: [
            "Tadka: heat ghee until it shimmers, then add cumin or mustard seeds. They should sizzle at once.",
            "Deep frying: ghee is stable and reusable a couple of times if strained and stored dry.",
            "Roasting: toss vegetables in melted ghee before roasting at 200 to 220°C.",
            "Finishing: a spoon of cow ghee over hot dal or rice adds aroma that high heat would lose.",
          ],
        },
      },
    ],
    faqs: [
      { q: "What is the smoke point of ghee?", a: "About 250°C (482°F). Removing the milk solids during cooking is what gives ghee a much higher smoke point than butter." },
      { q: "Can ghee be used for deep frying?", a: "Yes. Its high smoke point and stable saturated fats make ghee good for deep frying. Strain and store it dry to reuse once or twice." },
    ],
    sources: [USDA],
    relatedProducts: ["pure-desi-buffalo-ghee"],
    keywords: ["ghee smoke point", "is ghee good for frying", "ghee vs butter for cooking", "ghee for tadka"],
  },
  {
    slug: "how-to-store-ghee",
    title: "How to Store Ghee | Shelf Life, Refrigeration & Texture Guide",
    description:
      "Pure desi ghee keeps for 12 months without refrigeration | Best storage practices, why texture changes across seasons, and signs of spoilage.",
    quickAnswer:
      "Store ghee in a closed jar in a cool, dark cupboard. Unopened, pure ghee keeps for about 12 months; opened, it keeps for months if you always use a clean, dry spoon. Refrigeration is not needed. Ghee has gone bad if it smells sour or soapy, or shows mould.",
    category: "Storage",
    cover: asset("/images/blog/how-to-store-ghee.svg"),
    datePublished: "2026-05-18",
    dateModified: "2026-10-05",
    readingMinutes: 4,
    keyTakeaways: [
      "No fridge needed. A cool, dark cupboard is enough.",
      "Always use a dry spoon. Water is what spoils ghee.",
      "Liquid, solid and grainy are all normal textures.",
      "Sour or soapy smell means the ghee has gone rancid.",
    ],
    sections: [
      {
        id: "how-long",
        heading: "How long does ghee last?",
        paragraphs: [
          "Because almost all the water and milk solids are removed, ghee resists the bacteria that spoil butter. Unopened, pure ghee keeps for about 12 months from packing. Once opened, it lasts for months, provided nothing wet gets into the jar.",
        ],
      },
      {
        id: "how-to-store",
        heading: "How to store ghee",
        list: {
          items: [
            "Keep it in a jar with a tight lid.",
            "Store it in a cool cupboard away from the stove and sunlight.",
            "Always use a clean, completely dry spoon.",
            "Decant a small jar for daily use and keep the large pack sealed.",
            "If you live somewhere very hot and humid, the fridge is fine; let it soften before use.",
          ],
        },
      },
      {
        id: "texture",
        heading: "Why does ghee change texture?",
        paragraphs: [
          "Ghee is a mix of fats that melt at different temperatures. Above about 35°C it is fully liquid; below about 20°C it sets solid. In between, the higher-melting fats crystallise into grains while the rest stays liquid. That is why the same jar can be runny in May and firm in January.",
        ],
      },
      {
        id: "gone-bad",
        heading: "How to tell if ghee has gone bad",
        list: {
          items: [
            "Smell: a sour, soapy or paint-like smell means it has gone rancid.",
            "Look: mould spots, usually from water getting in, mean throw it away.",
            "Taste: bitter or sharp instead of nutty.",
          ],
        },
      },
    ],
    faqs: [
      { q: "Does ghee need to be refrigerated?", a: "No. Pure ghee keeps well in a cool, dark cupboard. Refrigeration is optional and only makes it harder." },
      { q: "What is the shelf life of ghee?", a: "About 12 months unopened from the date of packing. Opened ghee lasts for months if you use a dry spoon and keep the lid closed." },
      { q: "Why is my ghee grainy?", a: "Graininess forms when ghee cools slowly and its higher-melting fats crystallise. It is normal and often a sign of traditional slow cooking." },
    ],
    sources: [FSSAI, USDA],
    relatedProducts: ["pure-desi-buffalo-ghee"],
    keywords: ["how to store ghee", "ghee shelf life", "does ghee need refrigeration", "how to know if ghee is bad"],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const sortedPosts = [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
