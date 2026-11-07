/*
  How Farm Dip ghee is made, in six steps. One list drives the animated journey on the home page,
  the process page, its HowTo structured data and llms-full.txt.

  PLACEHOLDER: this describes the traditional home method for buffalo-milk ghee
  (malai, dahi, makkhan, slow cooking). Confirm each step matches your own process before launch.
*/

export type ProcessStep = {
  id: string;
  /** Short Hindi name, shown in handwriting above the step. */
  hindi: string;
  name: string;
  text: string;
  /** The one fact that matters at this step, shown on the paper tag in the journey. */
  fact: string;
  factHindi: string;
  icon: "cow" | "milk" | "curd" | "churn" | "butter" | "fire" | "filter" | "jar";
};

export const processSteps: ProcessStep[] = [
  {
    id: "milk",
    hindi: "भैंस का दूध",
    name: "It starts with pure buffalo milk",
    text: "Whole, fresh buffalo milk. Buffalo milk is naturally thick and rich, which is what gives our ghee its creamy texture and white colour.",
    fact: "Pure buffalo milk, nothing mixed in",
    factHindi: "शुद्ध भैंस का दूध",
    icon: "cow",
  },
  {
    id: "malai",
    hindi: "उबाल और मलाई",
    name: "Boiled slowly, and the malai collected",
    text: "The milk is boiled slowly in open vessels and left to cool, so a thick layer of malai forms on top. The malai is gathered day after day.",
    fact: "Thick malai from rich milk",
    factHindi: "गाढ़ी मलाई",
    icon: "milk",
  },
  {
    id: "dahi",
    hindi: "दही जमाना",
    name: "Set into dahi in clay pots",
    text: "The malai is set with a spoon of dahi in clay matkas and left overnight, the way it has always been done at home.",
    fact: "Left to set overnight",
    factHindi: "पूरी रात",
    icon: "curd",
  },
  {
    id: "makkhan",
    hindi: "मथना",
    name: "Churned into makkhan",
    text: "In the morning it is churned back and forth with a wooden madhani until soft white makkhan floats up and the chhaach is left behind.",
    fact: "Churned by hand",
    factHindi: "हाथ से मथा",
    icon: "churn",
  },
  {
    id: "ghee",
    hindi: "धीमी आँच",
    name: "Slow-cooked into ghee",
    text: "The makkhan is cooked slowly in an iron kadhai, stirred until the water is gone and the ghee turns clear, with that rich smell every Indian kitchen knows.",
    fact: "Cooked slowly, never rushed",
    factHindi: "धीमी आँच पर",
    icon: "fire",
  },
  {
    id: "jar",
    hindi: "छानकर भरना",
    name: "Strained and packed, nothing added",
    text: "The ghee is strained through muslin and packed as it is: no preservatives, no additives, no colour. Pure, simple and rich.",
    fact: "No preservatives or additives",
    factHindi: "100% शुद्ध",
    icon: "jar",
  },
];
