import { ActiveLevel, ObesityDegree } from "@prisma/client";
import { roundToDecimal, roundToNearestTen } from "./utils";
import { BasicInfoSchema } from "@/schemas/calc-index";
import { z } from "zod";
import { DayExchangeFormValue } from "@/components/\bcalculator/day_exchange_unit_floating_data";
import { groupMap, mealTimes, nutrientValues } from "@/utils/constants";
import {
  NutritionData,
  TableData,
} from "@/actions/calc-day-exchange-unit-table-data";
import { MealUnit } from "@/utils/interfaces";

const adjustValue = (al: ActiveLevel) => {
  if (al === ActiveLevel.LIGHT) return { low: 35, normal: 30, fat: 25 };
  if (al === ActiveLevel.MODERATE) return { low: 40, normal: 35, fat: 30 };
  if (al === ActiveLevel.INTENSE) return { low: 45, normal: 40, fat: 35 };
};

export const classifyActiveLevelWithBMI = (bmi: number, al: ActiveLevel) => {
  const activeValue = adjustValue(al);
  if (!activeValue) return { adjustValue: null, obesity_degree: null };
  if (bmi < 18.5) {
    return {
      adjustValue: activeValue.low,
      obesity_degree: ObesityDegree.UNDER,
    };
  } else if (bmi >= 18.5 && bmi < 23) {
    return {
      adjustValue: activeValue.normal,
      obesity_degree: ObesityDegree.NORMAL,
    };
  } else {
    return { adjustValue: activeValue.fat, obesity_degree: ObesityDegree.OVER };
  }
};

export const pregnancyPeriodRequiredEnergy = {
  FIRST: 0,
  SECOND: 340,
  THIRD: 450,
  LACTATION: 340,
};

export const pregnancyPeriodLabel = {
  FIRST: "초기",
  SECOND: "중기",
  THIRD: "후기",
  LACTATION: "수유부",
};

export const calcEnergyRequirement = (
  values: z.infer<typeof BasicInfoSchema>
) => {
  const { height, weight, pregnancy_period, active_level } = values;

  const standard_weight = roundToDecimal(Math.pow(height / 100, 2) * 21, 1);
  const bmi = roundToDecimal(weight / Math.pow(height / 100, 2), 1);
  const { adjustValue, obesity_degree } = classifyActiveLevelWithBMI(
    bmi,
    active_level
  );

  if (!adjustValue) return { error: "값이 유효하지 않습니다.", res: null };

  // 임신 아닌 사람 하루 필요 열량
  const energy_requirement = roundToNearestTen(standard_weight * adjustValue);
  if (!pregnancy_period) return { error: "임신 기간을 설정해주세요." };
  const pregnancy_energy_requirement =
    energy_requirement + pregnancyPeriodRequiredEnergy[pregnancy_period];

  return {
    error: null,
    res: {
      standard_weight,
      bmi,
      obesity_degree,
      energy_requirement: pregnancy_energy_requirement,
    },
  };
};

// 입력받은 하루 식품 단위수 값들의 칼로리, 탄단지 값들의 합
export const calcTotalNutrients = (
  formValues: Partial<DayExchangeFormValue>
) => {
  let totalKcal = 0;
  let totalCarbo = 0;
  let totalProtein = 0;
  let totalFat = 0;

  for (const key in formValues) {
    if (formValues.hasOwnProperty(key)) {
      const quantity = formValues[key as keyof DayExchangeFormValue] as number;
      const nutrient = nutrientValues[key];

      totalKcal += nutrient.kcal * quantity;
      totalCarbo += nutrient.carbo * quantity;
      totalProtein += nutrient.protein * quantity;
      totalFat += nutrient.fat * quantity;
    }
  }

  return {
    totalKcal,
    totalCarbo,
    totalProtein,
    totalFat,
  };
};

// 칼로리, 탄단지 설정값이 에러 없이 불러졌는지 확인하는 것
const isNutritionData = (data: TableData): data is NutritionData => {
  return (data as NutritionData).kcal !== undefined;
};

// 곡류군 단위수 계산 함수
export const calcGrainsUnit = (
  formValues: DayExchangeFormValue,
  tableData: TableData
) => {
  if (isNutritionData(tableData)) {
    const { totalCarbo } = calcTotalNutrients({
      milk_whole: formValues.milk_whole,
      milk_low_fat: formValues.milk_low_fat,
      vegetables: formValues.vegetables,
      fruits: formValues.fruits,
    });

    return Math.round((tableData.carbo - totalCarbo) / 23);
  }
};

// 어육류군 단위수 계산 함수
export const calcProteinUnit = (
  formValues: DayExchangeFormValue,
  tableData: TableData
) => {
  if (isNutritionData(tableData)) {
    const { totalProtein } = calcTotalNutrients({
      milk_whole: formValues.milk_whole,
      milk_low_fat: formValues.milk_low_fat,
      vegetables: formValues.vegetables,
      fruits: formValues.fruits,
      grains: formValues.grains,
    });

    return Math.round((tableData.protein - totalProtein) / 8);
  }
};

// 지방군 단위수 계산 함수
export const calcFatUnit = (
  formValues: DayExchangeFormValue,
  tableData: TableData
) => {
  if (isNutritionData(tableData)) {
    const { totalFat } = calcTotalNutrients({
      milk_whole: formValues.milk_whole,
      milk_low_fat: formValues.milk_low_fat,
      vegetables: formValues.vegetables,
      fruits: formValues.fruits,
      grains: formValues.grains,
      protein_low_fat: formValues.protein_low_fat,
      protein_medium_fat: formValues.protein_medium_fat,
      protein_high_fat: formValues.protein_high_fat,
    });

    return Math.round((tableData.fat - totalFat) / 5);
  }
};

export const calculateUnitTotal = (mealUnits: MealUnit[], groupKey: string) => {
  return mealTimes.reduce(
    (sum, time) =>
      sum +
      ((mealUnits.find((u) => u.sort === groupMap.get(groupKey))?.[
        time
      ] as number) || 0),
    0
  );
};