export type DietTag = "pescatarian" | "vegetarian" | "contains-dairy" | "contains-nuts";

export type Dish = {
  name: string;
  ingredients: string[];
  aside?: string;
  tags?: DietTag[];
  source?: { label: string; href: string };
};

export type Course = {
  index: string;
  label: string;
  title: string;
  note?: string;
  dishes: Dish[];
  footnote?: string;
};

export const event = {
  brand: "BK on Hudson",
  tagline: "Chophouse & Skyline Room",
  address: "389 Washington Street · Jersey City",
  view: "Table for eight, facing Manhattan",
  dateLine: "Friday, September 18",
  timeLine: "Doors 6:00 PM",
  establishedLine: "Est. the moment you walk in",
  proprietors: "B. & K., proprietors",
};

export const courses: Course[] = [
  {
    index: "I",
    label: "First",
    title: "The Tarts",
    note: "Served together. There is no choosing. This is not that kind of establishment.",
    dishes: [
      {
        name: "Zucchini & Whipped Ricotta Tart",
        ingredients: [
          "shaved summer zucchini",
          "whipped ricotta",
          "basil pesto",
          "all-butter puff pastry",
          "lemon zest",
          "flaked salt",
        ],
        aside: "Ribbons cut thin enough to qualify as a personality trait.",
        tags: ["vegetarian", "contains-dairy", "contains-nuts"],
        source: {
          label: "after Half Baked Harvest",
          href: "https://www.halfbakedharvest.com/zucchini-ricotta-pesto-tart/",
        },
      },
      {
        name: "Roasted Tomato Tart",
        ingredients: [
          "slow-roasted heirloom tomato",
          "ricotta",
          "pesto",
          "blistered garlic",
          "cracked black pepper",
        ],
        aside: "The tomatoes were in the oven longer than most of us were at the gym this week.",
        tags: ["vegetarian", "contains-dairy", "contains-nuts"],
        source: {
          label: "after NYT Cooking",
          href: "https://cooking.nytimes.com/recipes/1020373-roasted-tomato-tart-with-ricotta-and-pesto",
        },
      },
    ],
    footnote: "Quietly modified plates exist. The kitchen keeps notes. The kitchen says nothing.",
  },
  {
    index: "II",
    label: "Second",
    title: "From the Broiler",
    note: "Choose your cut. Commit to it. Doneness is recorded and shown to the group.",
    dishes: [
      {
        name: "New York Strip",
        ingredients: [
          "dry-aged strip loin",
          "garlic cowboy compound butter",
          "cast iron char",
          "rosemary",
          "coarse sea salt",
        ],
        aside: "Named after the city across the water. Eaten in the state with the better view of it.",
      },
      {
        name: "Ribeye",
        ingredients: [
          "bone-adjacent ribeye",
          "garlic cowboy compound butter",
          "rendered fat cap",
          "thyme",
          "black pepper",
        ],
        aside: "The marbling is not a flaw. The marbling is the whole argument.",
      },
      {
        name: "Hudson Salmon Filet",
        ingredients: [
          "faroe island salmon",
          "pesto compound butter",
          "crisped skin",
          "lemon",
        ],
        aside: "Sourced responsibly, which is to say: not from the Hudson.",
        tags: ["pescatarian", "contains-dairy", "contains-nuts"],
      },
    ],
    footnote: "Compound butter is not a side. Compound butter is a load-bearing element.",
  },
  {
    index: "II½",
    label: "Alongside",
    title: "The Sides",
    note: "Family style, because plating eight of anything twice is a hostage situation.",
    dishes: [
      {
        name: "Parmesan Smashed Potatoes",
        ingredients: [
          "yukon gold",
          "aged parmesan",
          "garlic",
          "butter",
          "chive",
        ],
        aside: "Smashed by hand. Firmly. With feeling.",
        tags: ["vegetarian", "contains-dairy"],
      },
      {
        name: "Kale Caesar",
        ingredients: [
          "lacinato kale",
          "caesar dressing",
          "parmesan snow",
          "garlic crouton",
          "lemon",
        ],
        aside: "Present so everyone can say they had a vegetable.",
        tags: ["vegetarian", "contains-dairy"],
      },
    ],
  },
  {
    index: "III",
    label: "Third",
    title: "The Finish",
    note: "Both. Obviously both.",
    dishes: [
      {
        name: "Flourless Chocolate Torte",
        ingredients: [
          "dark chocolate",
          "butter",
          "egg",
          "sea salt",
          "whipped cream",
        ],
        aside: "Structurally a brick. Emotionally a hug.",
        tags: ["vegetarian", "contains-dairy"],
      },
      {
        name: "Cheesecake Bars",
        ingredients: [
          "cream cheese",
          "graham crust",
          "vanilla bean",
          "sour cream top",
        ],
        aside: "Cut into squares so nobody can be accused of taking a slice.",
        tags: ["vegetarian", "contains-dairy"],
      },
    ],
    footnote: "Coffee available. Judgment for ordering decaf: complimentary.",
  },
];

export const dietKey: Record<DietTag, { mark: string; label: string }> = {
  pescatarian: { mark: "◇", label: "Pescatarian" },
  vegetarian: { mark: "✦", label: "Vegetarian" },
  "contains-dairy": { mark: "•", label: "Contains dairy" },
  "contains-nuts": { mark: "▵", label: "Contains nuts (pine)" },
};

export type Cut = "strip" | "ribeye" | "salmon";

export const cuts: { id: Cut; name: string; blurb: string }[] = [
  { id: "strip", name: "New York Strip", blurb: "Lean, confident, slightly east-coast." },
  { id: "ribeye", name: "Ribeye", blurb: "Fat cap included. No notes." },
  { id: "salmon", name: "Salmon Filet", blurb: "Pesto butter. Crisped skin. Fully respected." },
];

export const doneness: { id: string; name: string; blurb: string }[] = [
  { id: "rare", name: "Rare", blurb: "Bold. The kitchen salutes you." },
  { id: "medium-rare", name: "Medium Rare", blurb: "Correct. Say nothing further." },
  { id: "medium", name: "Medium", blurb: "A reasonable citizen." },
  { id: "medium-well", name: "Medium Well", blurb: "We will allow it. Quietly." },
  { id: "well", name: "Well Done", blurb: "Bold in an entirely different direction." },
];

export const pairings: { course: string; drink: string; detail: string; note: string }[] = [
  {
    course: "First",
    drink: "The Powerhouse Spritz",
    detail: "prosecco · aperol · grapefruit peel",
    note: "Named for the arts district, mixed for the tarts.",
  },
  {
    course: "First",
    drink: "Dirty Martini, Very",
    detail: "gin · brine · three olives",
    note: "Three olives is a snack. Three olives is dinner. Three olives is a warning.",
  },
  {
    course: "Second",
    drink: "Napa Cabernet",
    detail: "cassis · cedar · grip",
    note: "Built for compound butter. Tannin cuts fat. Science.",
  },
  {
    course: "Second",
    drink: "The Hoboken Manhattan",
    detail: "rye · sweet vermouth · bitters",
    note: "A Manhattan made one state over, which we maintain is an improvement.",
  },
  {
    course: "Third",
    drink: "Tawny Port",
    detail: "fig · toffee · walnut",
    note: "For the torte. For the pause. For pretending the night is not ending.",
  },
  {
    course: "Third",
    drink: "Espresso, Neat",
    detail: "one ounce · no sugar · no conversation",
    note: "The 6:00 PM start was generous. This is the enforcement mechanism.",
  },
];

export const houseRules: string[] = [
  "Shoes off. The floors are new and Katie will notice.",
  "The skyline is behind you. It will still be there. Look at it later.",
  "Anyone who says \"I'm not really a steak person\" pays for the Uber.",
  "Phones face down during the first course. Phones out for the second. We want the photos.",
  "There is no bill. There is only the expectation of reciprocity.",
];

export const secretMenu = {
  codeWord: "COWBOY BUTTER",
  headline: "The Fourth Course",
  lede: "Not printed. Not advertised. Available only to those who ask correctly.",
  items: [
    {
      name: "The Extra Cut",
      ingredients: ["one additional slab of ribeye", "a knowing nod"],
      aside: "Say the code word to the chef. Out loud. With full commitment. Half-mumbling it gets you salad.",
    },
    {
      name: "Butter Flight",
      ingredients: ["cowboy butter", "pesto butter", "a spoon", "zero shame"],
      aside: "Yes, just the butters. We are not going to stop you.",
    },
    {
      name: "The 11 PM Situation",
      ingredients: ["leftover steak", "griddled bread", "whatever is in the fridge"],
      aside: "Materializes only if you are still here. Cannot be requested. Can only be earned.",
    },
  ],
};
