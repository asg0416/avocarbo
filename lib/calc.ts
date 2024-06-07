import { ActiveLevel, ObesityDegree } from "@prisma/client";
import { roundToDecimal, roundToNearestTen } from "./utils";
import { BasicInfoSchema } from "@/schemas/calc-index";
import { z } from "zod";

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
