/*
  How Farm Dip ghee is made, in the brand's own eight steps (from the Farm Dip team, 2026-11-08).
  One list drives the animated journey on the home page, the process page, its HowTo structured
  data and llms-full.txt.
*/

export type ProcessStep = {
  id: string;
  name: string;
  text: string;
  /** The one fact that matters at this step, shown as a chip on the journey stage. */
  fact: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "milk",
    name: "We start with full-fat buffalo milk",
    text: "Fresh, full-fat milk from our buffaloes. Buffalo milk is naturally thick and rich, which is what makes the ghee creamy and white.",
    fact: "Full-fat buffalo milk",
  },
  {
    id: "boil",
    name: "Heated slowly to a gentle boil",
    text: "The milk goes into a large pan and is heated slowly to a gentle, rolling boil, stirred now and then so nothing catches at the bottom.",
    fact: "Slow heat, stirred now and then",
  },
  {
    id: "set",
    name: "Covered and left to set",
    text: "We cover the milk and leave it in a warm, cosy spot for 8 to 12 hours, until it sets into thick dahi.",
    fact: "8 to 12 hours",
  },
  {
    id: "churn",
    name: "Churned the bilona way",
    text: "The dahi is churned with a wooden madhani, back and forth in the bilona method, until the butter separates.",
    fact: "Bilona method",
  },
  {
    id: "collect",
    name: "The butter, collected by hand",
    text: "The fresh butter is lifted out carefully with a spoon, or gathered in muslin.",
    fact: "With a spoon or muslin",
  },
  {
    id: "wash",
    name: "Washed in cold water",
    text: "The butter goes into a bowl and is washed with cold water.",
    fact: "Cold water wash",
  },
  {
    id: "clarify",
    name: "Clarified into ghee",
    text: "The washed butter is cooked gently until it clarifies into golden ghee, with the rich aroma every Indian kitchen knows.",
    fact: "Nothing added",
  },
  {
    id: "strain",
    name: "Cooled, then strained through muslin",
    text: "Finally the ghee cools for 10 to 15 minutes and is strained through muslin into the jar. No preservatives, no additives.",
    fact: "Cooled for 10 to 15 minutes",
  },
];
