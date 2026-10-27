export type ProcessStep = {
  id: string;
  name: string;
  duration: string;
  text: string;
  icon: "cow" | "milk" | "curd" | "churn" | "butter" | "fire" | "filter" | "jar";
};

/** The bilona process, in order. Also rendered as HowTo structured data. */
export const bilonaSteps: ProcessStep[] = [
  {
    id: "graze",
    name: "Gir cows graze on open pasture",
    duration: "Every day",
    text: "Our partner farmers raise purebred Gir cows on open pasture around Talala, Gujarat, with green fodder and no growth hormones. Calves drink first.",
    icon: "cow",
  },
  {
    id: "milk",
    name: "Milk is collected at dawn and boiled",
    duration: "Morning",
    text: "Fresh A2 milk is collected in the early morning, brought to the dairy within two hours and slowly boiled in open vessels.",
    icon: "milk",
  },
  {
    id: "curd",
    name: "Milk is set into curd overnight",
    duration: "8 to 10 hours",
    text: "The cooled milk is set with a spoon of yesterday's curd in clay pots and left overnight. This is the step cream-based ghee skips.",
    icon: "curd",
  },
  {
    id: "churn",
    name: "Curd is churned with a wooden bilona",
    duration: "About 1 hour",
    text: "At sunrise the curd is churned back and forth with a wooden bilona until makkhan floats to the top and separates from the buttermilk.",
    icon: "churn",
  },
  {
    id: "makkhan",
    name: "Makkhan is lifted out by hand",
    duration: "15 minutes",
    text: "The makkhan is gathered by hand and rinsed in cold water. The buttermilk goes back to the farm families.",
    icon: "butter",
  },
  {
    id: "cook",
    name: "Makkhan is slow-cooked on a wood fire",
    duration: "2 to 3 hours",
    text: "The makkhan is cooked in small iron kadhais over a low wood fire, stirred until the milk solids turn brown and the ghee runs clear and golden.",
    icon: "fire",
  },
  {
    id: "filter",
    name: "Ghee is filtered and cooled slowly",
    duration: "12 hours",
    text: "The ghee is strained through muslin and left to cool slowly, which is what forms its grainy, danedar texture.",
    icon: "filter",
  },
  {
    id: "test",
    name: "Each batch is lab tested and packed",
    duration: "2 to 3 days",
    text: "A sample from every batch goes to an independent lab. Only batches that pass are packed into glass jars and given a batch number linked to the report.",
    icon: "jar",
  },
];

export type JourneyBeat = { id: string; hindi: string; title: string; text: string; fact: string; factHindi: string };

/** The same process told in six scenes for the animated journey on the home page. */
export const journeyBeats: JourneyBeat[] = [
  {
    id: "graze",
    hindi: "चराई",
    title: "Gir cows graze on open pasture",
    text: "Purebred Gir cows on partner farms around Talala, Gujarat, graze on open pasture and green fodder. No growth hormones, and calves drink first.",
    fact: "Gir cows, Gujarat",
    factHindi: "गिर की गायें",
  },
  {
    id: "milk",
    hindi: "सुबह का दूध",
    title: "Milk is collected at dawn and boiled",
    text: "Fresh A2 milk reaches the dairy within two hours of milking and is boiled slowly in open brass vessels.",
    fact: "About 30 litres of milk for 1 litre of ghee",
    factHindi: "३० लीटर दूध",
  },
  {
    id: "curd",
    hindi: "दही जमाना",
    title: "Set into curd overnight in clay pots",
    text: "The cooled milk gets a spoon of yesterday's curd and rests overnight in clay matkas. This is the step cream ghee skips.",
    fact: "8 to 10 hours",
    factHindi: "पूरी रात",
  },
  {
    id: "churn",
    hindi: "बिलोना",
    title: "Churned both ways with a wooden bilona",
    text: "At sunrise the curd is churned back and forth with a wooden madhani until makkhan floats up and the buttermilk is left behind.",
    fact: "About an hour of churning",
    factHindi: "सूर्योदय पर",
  },
  {
    id: "cook",
    hindi: "धीमी आँच",
    title: "Makkhan is slow-cooked on a wood fire",
    text: "The makkhan simmers in iron kadhais over a low wood fire, stirred until the milk solids brown and the ghee runs clear and golden.",
    fact: "2 to 3 hours on the fire",
    factHindi: "लकड़ी की आँच",
  },
  {
    id: "jar",
    hindi: "छानकर भरना",
    title: "Strained, cooled, tested and jarred",
    text: "The ghee is strained through muslin and cooled slowly, which forms its danedar grain. A sample from every batch goes to an independent lab before jarring.",
    fact: "Lab report for every batch",
    factHindi: "हर बैच की जाँच",
  },
];
