export const NEW_KCAL_ALERT_DESC =
  "입력하신 내용으로 계산된 하루 필요열량이 1700kcal 이하입니다. 임신 중 케톤증 예방을 위해 하루 필요열량을 1700kcal 이상으로 설정해주세요.";

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
  ["grains", 0],
  ["protein_low_fat", 1],
  ["protein_medium_fat", 2],
  ["protein_high_fat", 3],
  ["vegetables", 4],
  ["fats", 5],
  ["milk_whole", 6],
  ["milk_low_fat", 7],
  ["fruits", 8],
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
