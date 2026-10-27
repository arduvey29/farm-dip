import type { Post } from "./types";
import { asset } from "@/lib/assets";

const FSSAI = { label: "Food Safety and Standards Authority of India (FSSAI): standards for ghee and the DART home-testing guide", href: "https://www.fssai.gov.in/" };
const USDA = { label: "USDA FoodData Central: nutrient profile of ghee (anhydrous butter oil)", href: "https://fdc.nal.usda.gov/" };
const EFSA = { label: "European Food Safety Authority (2009): review of the health impact of β-casomorphins and related peptides", href: "https://www.efsa.europa.eu/" };
const NDDB = { label: "National Dairy Development Board: indigenous cattle breeds of India", href: "https://www.nddb.coop/" };

export const posts: Post[] = [
  {
    slug: "a2-vs-a1-ghee",
    title: "A2 vs A1 ghee: what the difference actually is",
    description:
      "A2 and A1 describe a protein in milk, not fat. Here is what the label means on ghee, which breeds give A2 milk, and what the science does and does not say.",
    quickAnswer:
      "A1 and A2 are two forms of beta-casein, a protein in cow's milk. Native Indian breeds such as Gir and Sahiwal give A2 milk; many European breeds give A1 or a mix. Ghee is about 99.5% fat with only traces of protein, so on ghee the A2 label mainly tells you which cows the milk came from.",
    category: "Buying guide",
    cover: asset("/images/blog/a2-vs-a1-ghee.svg"),
    datePublished: "2026-08-12",
    dateModified: "2026-10-20",
    readingMinutes: 6,
    keyTakeaways: [
      "A1 and A2 are variants of beta-casein, a milk protein. They differ by one amino acid.",
      "Gir, Sahiwal, Red Sindhi and Tharparkar cows naturally give A2 milk.",
      "Ghee is almost pure fat, so the A1/A2 difference in the finished ghee is very small.",
      "The label is most useful as a sign of native-breed milk, not as a health claim.",
    ],
    sections: [
      {
        id: "what-is-a1-a2",
        heading: "What do A1 and A2 mean?",
        paragraphs: [
          "Cow's milk contains several proteins. About a third of the protein is beta-casein, which comes in a few genetic variants. The two most common are called A1 and A2. They differ by a single amino acid at one position in the protein chain.",
          "When A1 beta-casein is digested, it can release a small peptide called beta-casomorphin-7 (BCM-7). A2 beta-casein releases much less of it. That difference is the basis for most A2 marketing.",
        ],
      },
      {
        id: "which-breeds",
        heading: "Which cows give A2 milk?",
        paragraphs: [
          "The original beta-casein in cattle was A2. The A1 variant appeared later in some European herds. Native Indian breeds (Bos indicus), such as Gir, Sahiwal, Red Sindhi and Tharparkar, largely carry the A2 form. Holstein Friesian and many crossbred cows common in Indian dairies carry A1, A2 or both.",
        ],
        table: {
          caption: "Common cattle breeds in India and their beta-casein type",
          head: ["Breed", "Origin", "Typical beta-casein"],
          rows: [
            ["Gir", "Gujarat, India", "A2"],
            ["Sahiwal", "Punjab region", "A2"],
            ["Red Sindhi", "Sindh region", "A2"],
            ["Tharparkar", "Rajasthan, India", "A2"],
            ["Holstein Friesian", "Netherlands, Germany", "A1 and A2 mixed"],
            ["Jersey", "Jersey, Channel Islands", "Mostly A2, some A1"],
            ["Crossbred dairy cows", "Various", "A1 and A2 mixed"],
          ],
        },
      },
      {
        id: "does-it-matter-for-ghee",
        heading: "Does A1 or A2 matter in ghee?",
        paragraphs: [
          "Less than in milk. Ghee is made by cooking butter until the water evaporates and the milk solids, which contain the protein, separate and are strained out. What is left is about 99.5% fat. Only traces of beta-casein remain.",
          "So, on a jar of ghee, the A2 label is mostly a guarantee about the source: the milk came from native-breed cows. That still matters to many buyers, because native-breed milk usually comes from smaller herds, often grass-fed, and is commonly made into ghee by traditional methods.",
        ],
      },
      {
        id: "what-science-says",
        heading: "What does the science say about A2 milk?",
        paragraphs: [
          "Some small studies suggest that people who feel discomfort after drinking regular milk may tolerate A2 milk better. A 2009 review by the European Food Safety Authority found no established cause-and-effect link between A1 beta-casein and chronic disease. Research is ongoing.",
          "We do not make health claims for our ghee. We make it from A2 milk because Gir cows are what our farmers raise, and because we think the taste is better.",
        ],
      },
      {
        id: "how-to-check",
        heading: "How to check an A2 claim",
        list: {
          ordered: true,
          items: [
            "Ask which breed the milk comes from. \"A2\" without a breed name is a weak claim.",
            "Ask whether the herd has been genotyped for A2A2 beta-casein.",
            "Look for a batch lab report that tests for adulteration with vanaspati and vegetable fat. Purity matters more than the A2 label.",
            "Check the price. Native-breed bilona ghee needs about 28 to 30 litres of milk per litre, so very cheap \"A2 bilona ghee\" deserves questions.",
          ],
        },
      },
    ],
    faqs: [
      { q: "Is A2 ghee better than A1 ghee?", a: "Ghee contains only traces of protein, so the A1 versus A2 difference in ghee is very small. A2 ghee is a reliable sign the milk came from native-breed cows, which many buyers prefer for taste and tradition." },
      { q: "Is all desi cow ghee A2?", a: "No. Desi ghee is a general term for traditionally made Indian ghee. Only ghee from native breeds with A2 milk, such as Gir or Sahiwal, is A2 ghee." },
      { q: "Is buffalo ghee A1 or A2?", a: "Neither label applies. A1 and A2 describe variants of cattle beta-casein. Buffalo milk has its own protein profile." },
    ],
    sources: [EFSA, NDDB, USDA],
    relatedProducts: ["a2-gir-cow-bilona-ghee", "a2-sahiwal-cow-bilona-ghee"],
    keywords: ["a2 vs a1 ghee", "what is a2 ghee", "a2 ghee benefits", "gir cow a2 milk"],
  },
  {
    slug: "bilona-vs-cream-ghee",
    title: "Bilona ghee vs cream ghee: how they are made and how they differ",
    description:
      "Bilona ghee is made from curd; most ghee is made from cream. We compare the two methods step by step, with milk used, texture, taste and price.",
    quickAnswer:
      "Bilona ghee is made by setting whole milk into curd, churning the curd with a wooden bilona to get makkhan, and slow-cooking the makkhan. Cream ghee skips the curd: cream is separated from milk by machine and boiled directly. Bilona uses about twice the milk and gives a grainier, more aromatic ghee.",
    category: "Process",
    cover: asset("/images/blog/bilona-vs-cream-ghee.svg"),
    datePublished: "2026-07-28",
    dateModified: "2026-10-18",
    readingMinutes: 5,
    keyTakeaways: [
      "Bilona ghee starts from curd; cream ghee starts from separated cream.",
      "Bilona needs roughly 25 to 30 litres of milk per litre of ghee; cream ghee needs about half.",
      "Cultured makkhan gives bilona ghee a nuttier aroma and grainy texture.",
      "The method is why bilona ghee costs two to three times more.",
    ],
    sections: [
      {
        id: "two-methods",
        heading: "Two ways to make ghee",
        paragraphs: [
          "All ghee is butterfat cooked until the water evaporates and the milk solids brown and separate. The difference is how you get the butterfat in the first place.",
        ],
        table: {
          caption: "Bilona method compared with the cream method",
          head: ["", "Bilona method", "Cream method"],
          rows: [
            ["Starting point", "Whole milk set into curd", "Cream separated from milk by machine"],
            ["Fat collected by", "Churning curd with a wooden bilona", "Centrifugal separator"],
            ["Cultured (fermented)?", "Yes, overnight", "Usually not"],
            ["Milk per litre of ghee", "About 25 to 30 litres", "About 12 to 15 litres"],
            ["Cooking", "Small batches, often on a wood fire", "Large steel vats, often steam-heated"],
            ["Texture", "Grainy (danedar)", "Smooth, sometimes waxy"],
            ["Aroma", "Nutty, slightly tangy, caramel", "Milder, buttery"],
            ["Typical price per litre", "₹2,000 to ₹3,500", "₹600 to ₹1,000"],
          ],
        },
      },
      {
        id: "bilona-steps",
        heading: "How bilona ghee is made, step by step",
        list: {
          ordered: true,
          items: [
            "Whole milk is boiled and cooled to lukewarm.",
            "A spoon of curd is stirred in and the milk is left overnight to set.",
            "The curd is churned back and forth with a wooden bilona until makkhan rises.",
            "The makkhan is lifted out and rinsed in cold water.",
            "The makkhan is slow-cooked until the milk solids brown and the ghee runs clear.",
            "The ghee is filtered through muslin and cooled slowly.",
          ],
        },
        after: ["See our full eight-step process, with timings, on the bilona process page."],
      },
      {
        id: "why-taste-differs",
        heading: "Why does bilona ghee taste different?",
        paragraphs: [
          "Fermenting milk into curd creates aroma compounds such as diacetyl, the same compound that gives cultured butter its flavour. Those carry through into the ghee. Slow cooling after filtering lets fat crystals grow larger, which is where the grainy texture comes from.",
        ],
      },
      {
        id: "is-it-worth-it",
        heading: "Is bilona ghee worth the price?",
        paragraphs: [
          "If you use ghee mainly for its flavour, on rotis, dal and sweets, many people find a little bilona ghee goes further. If you deep fry in large quantities every day, a good cream-method ghee or buffalo ghee may be more practical. Either way, buy from a brand that publishes batch lab reports, because adulteration is a bigger risk than the method.",
        ],
      },
    ],
    faqs: [
      { q: "Is bilona ghee healthier than normal ghee?", a: "Both are almost entirely fat with similar nutrition. The main differences are taste, texture and method. Bilona ghee is made from cultured curd, which gives it a nuttier aroma." },
      { q: "Why is bilona ghee grainy?", a: "Slow cooking and slow cooling let fat crystals grow larger, giving the grainy danedar texture. It is a sign of the process, not a defect." },
      { q: "How much milk does bilona ghee need?", a: "Roughly 25 to 30 litres of cow milk for one litre of bilona ghee, depending on the milk's fat content and the season." },
    ],
    sources: [FSSAI, USDA],
    relatedProducts: ["a2-gir-cow-bilona-ghee", "desi-buffalo-bilona-ghee"],
    keywords: ["bilona ghee vs normal ghee", "bilona method", "what is bilona ghee", "hand churned ghee"],
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
            "Fridge test: melt ghee in a glass jar and refrigerate. Separate layers can indicate other fats were mixed in.",
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
    relatedProducts: ["a2-gir-cow-bilona-ghee"],
    keywords: ["how to check ghee purity", "ghee purity test at home", "adulterated ghee test", "ghee lab test"],
  },
  {
    slug: "ghee-smoke-point-cooking",
    title: "Ghee smoke point: is ghee good for tadka and deep frying?",
    description:
      "Ghee's smoke point is around 250°C, higher than butter and many oils. What that means for tadka, roasting and deep frying, with a comparison table.",
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
    relatedProducts: ["desi-buffalo-bilona-ghee", "a2-gir-cow-bilona-ghee"],
    keywords: ["ghee smoke point", "is ghee good for frying", "ghee vs butter for cooking", "ghee for tadka"],
  },
  {
    slug: "how-to-store-ghee",
    title: "How to store ghee: shelf life, the fridge, and why texture changes",
    description:
      "Pure ghee keeps for about 12 months unopened without a fridge. How to store it, why it turns grainy or solid, and how to tell if it has gone bad.",
    quickAnswer:
      "Store ghee in a closed glass or steel container in a cool, dark cupboard. Unopened, pure ghee keeps for about 12 months; opened, it keeps for months if you always use a clean, dry spoon. Refrigeration is not needed. Ghee has gone bad if it smells sour or soapy, or shows mould.",
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
            "Keep it in a glass or steel container with a tight lid.",
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
    relatedProducts: ["a2-gir-cow-bilona-ghee", "family-saver-2x1l"],
    keywords: ["how to store ghee", "ghee shelf life", "does ghee need refrigeration", "how to know if ghee is bad"],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const sortedPosts = [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
