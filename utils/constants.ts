
interface Nutrient {
  kcal: number;
  carbo: number;
  protein: number;
  fat: number;
}

export const nutrientValues: { [key: string]: Nutrient } = {
  grains: { kcal: 100, carbo: 23, protein: 2, fat: 0 },
  protein_low_fat: { kcal: 50, carbo: 0, protein: 8, fat: 2 },
  protein_medium_fat: { kcal: 75, carbo: 0, protein: 8, fat: 5 },
  protein_high_fat: { kcal: 100, carbo: 0, protein: 8, fat: 8 },
  fats: { kcal: 45, carbo: 0, protein: 0, fat: 5 },
  milk_whole: { kcal: 125, carbo: 10, protein: 6, fat: 7 },
  milk_low_fat: { kcal: 80, carbo: 10, protein: 6, fat: 2 },
  vegetables: { kcal: 20, carbo: 3, protein: 2, fat: 0 },
  fruits: { kcal: 50, carbo: 12, protein: 0, fat: 0 },
};

export const groupMap = new Map<string, number>([
  ["grains", 1],
  ["vegetables", 2],
  ["fats", 3],
  ["fruits", 4],
  ["protein_low_fat", 5],
  ["protein_medium_fat", 6],
  ["protein_high_fat", 7],
  ["milk_whole", 8],
  ["milk_low_fat", 9],
]);

export const foodGroupsLabelMap = new Map<
  number,
  { label: string; name: string; upperGroup: string | null }
>([
  [1, { label: "곡류군", name: "grains", upperGroup: null }],
  [2, { label: "채소군", name: "vegetables", upperGroup: null }],
  [3, { label: "지방군", name: "fats", upperGroup: null }],
  [4, { label: "과일군", name: "fruits", upperGroup: null }],
  [5, { label: "저지방", name: "protein_low_fat", upperGroup: "어육류군" }],
  [6, { label: "중지방", name: "protein_medium_fat", upperGroup: "어육류군" }],
  [7, { label: "고지방", name: "protein_high_fat", upperGroup: "어육류군" }],
  [8, { label: "일반", name: "milk_whole", upperGroup: "우유군" }],
  [9, { label: "저지방", name: "milk_low_fat", upperGroup: "우유군" }],
]);

export const foodGroups = [
  { name: "곡류군", key: "grains", subgroups: null },
  { name: "채소군", key: "vegetables", subgroups: null },
  { name: "지방군", key: "fats", subgroups: null },
  { name: "과일군", key: "fruits", subgroups: null },
  {
    name: "어육류군",
    key: "protein",
    subgroups: [
      { name: "저지방", key: "protein_low_fat" },
      { name: "중지방", key: "protein_medium_fat" },
      { name: "고지방", key: "protein_high_fat" },
    ],
  },
  {
    name: "우유군",
    key: "milk",
    subgroups: [
      { name: "일반", key: "milk_whole" },
      { name: "저지방", key: "milk_low_fat" },
    ],
  },
];

export const mealTimes = [
  "morning",
  "morningSnack",
  "lunch",
  "afternoonSnack",
  "dinner",
] as const;

export const mealTimesMap = new Map<string, string>([
  ["morning", "아침"],
  ["morningSnack", "오전 간식"],
  ["lunch", "점심"],
  ["afternoonSnack", "오후 간식"],
  ["dinner", "저녁"],
]);
