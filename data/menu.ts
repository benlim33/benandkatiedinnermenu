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
  tagline: "welcome to",
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
    title: "The Appetizers",
    note: "Served together. There is no choosing. Sorry bout dat.",
    dishes: [
      {
        name: "Zucchini & Whipped Ricotta Tart",
        ingredients: [
          "shaved summer zucchini",
          "ricotta",
          "nutless pesto (lmao)",
          "lemon zest",
          "flaked salt",
        ],
        aside: "some basic white people shit. perfect for JR",
        tags: ["vegetarian", "contains-dairy"],
      },
      {
        name: "Stuffed Mushrooms",
        ingredients: [
          "baby bellas",
          "toasted bread crumbs",
          "sweet italian sausage",
          "whatever else katie felt like putting in them",
        ],
        aside: "these are so good. P.S. katie made a few veggie ones for nita",
        tags: ["contains-dairy"],
      },
    ],
    footnote: "Quietly modified plates exist.",
  },
  {
    index: "II",
    label: "Second",
    title: "From the Grill",
    note: "Choose your cut. Doneness will be judged.",
    dishes: [
      {
        name: "New York Strip",
        ingredients: [
          "48-hour aged strip loin",
          "garlic cowboy compound butter",
          "sexy ahh grill marks",
          "rosemary",
          "coarse sea salt",
        ],
        aside: "if u want it cooked well done ur retarded on god",
      },
      {
        name: "Ribeye",
        ingredients: [
          "juicy ribeye like katie's butt",
          "garlic cowboy compound butter",
          "rendered fat cap",
          "thyme",
          "black pepper",
        ],
        aside: "ben's fav cut of steak",
      },
      {
        name: "Hudson Salmon Filet",
        ingredients: [
          "faroe island salmon",
          "pesto compound butter (HAS NUTS)",
          "crisped skin",
          "lemon",
        ],
        aside: "had to buy this stupid bullshit literally just for nita",
        tags: ["pescatarian", "contains-dairy", "contains-nuts"],
      },
    ],
    footnote: "fat can be removed upon request",
  },
  {
    index: "II½",
    label: "Alongside",
    title: "The Sides",
    note: "Family style, because y'all are our family",
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
        aside: "we smashed on top of the potatoes",
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
        aside: "homemade caesar. i bet yall aint ever had real caesar before",
        tags: ["vegetarian", "contains-dairy"],
      },
    ],
  },
  {
    index: "III",
    label: "Third",
    title: "The Finish",
    note: "i just finished on you -partynextdoor",
    dishes: [
      {
        name: "Flourless Chocolate Torte",
        ingredients: [
          "dark chocolate",
          "whipped cream",
        ],
        aside: "dont worry alexis theres no tomatoes in this one",
        tags: ["vegetarian", "contains-dairy"],
      },
      {
        name: "Lemon Blueberry Cheesecake Bars",
        ingredients: [
          "graham cracker crust",
          "dingleberries"
        ],
        aside: "Cut into squares so nobody can be accused of taking a slice.",
        tags: ["vegetarian", "contains-dairy"],
      },
    ],
    footnote: "sorry kai thats it. No surprise dommys",
  },
];

export const dietKey: Record<DietTag, { mark: string; label: string }> = {
  pescatarian: { mark: "◇", label: "Fish" },
  vegetarian: { mark: "✦", label: "Vegetarian" },
  "contains-dairy": { mark: "•", label: "Contains dairy" },
  "contains-nuts": { mark: "▵", label: "Pine nuts (salmon butter only)" },
};

export const houseRules: string[] = [
  "dylan has to drink every time he says claude, chat, or AI",
  "we're getting isabel fucked up",
  "everyone tell katie shes hot because she is",
  "if you came and ur not hungry literally kill yourself",
  "take hella photos",
];

export const secretMenu = {
  codeWord: "fuck my chungus life",
  headline: "YOUV'E WON!",
  lede: "The secret easter egg of the night...",
  items: [
    {
      name: "Special Secret Menu Item",
      ingredients: ["there is only one of these and you've won it"],
      aside: "CONGRATULATIONS!",
    }
  ],
};
