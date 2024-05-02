import { ActiveLevel, ObesityDegree, PregnancyPeriod } from "@prisma/client";

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
