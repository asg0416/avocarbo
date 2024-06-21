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