import { TableData } from "@/actions/calc-day-exchange-unit-table-data";
import { calcFatUnit, calcGrainsUnit, calcProteinUnit } from "@/lib/calc";
import { foodGroups, groupMap } from "@/utils/constants";
import { ActiveLevel, DayExchangeUnit, PregnancyPeriod } from "@prisma/client";
import { z } from "zod";

export const ResetKcalSchema = z.object({
  kcal: z.coerce
    .number({
      required_error: "kcal is required",
      invalid_type_error: "kcal must be a number",
    })
    .int()
    .gte(1700)
    .lte(10000),
});

export const MealPlanTitleSchema = z.object({
  title: z.string().max(30)
})

export const BasicInfoSchema = z.object({
  age: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .int()
    .gte(0)
    .lte(100),
  height: z.coerce
    .number({
      required_error: "Height is required",
      invalid_type_error: "Height must be a number",
    })
    .int()
    .gte(100)
    .lte(200),
  weight: z.coerce
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .gte(0)
    .lte(1000)
    .step(0.1)
    .transform((val) => parseFloat(val.toFixed(1))),
  pregnancy_period: z.enum([
    PregnancyPeriod.FIRST,
    PregnancyPeriod.SECOND,
    PregnancyPeriod.THIRD,
    PregnancyPeriod.LACTATION,
  ]),
  active_level: z.enum([
    ActiveLevel.LIGHT,
    ActiveLevel.MODERATE,
    ActiveLevel.INTENSE,
  ]),
});

export const NutrientRatioSchema = z
  .object({
    carbo_ratio: z.coerce
      .number({
        required_error: "Carbohydrate ratio is required",
        invalid_type_error: "Carbohydrate ratio must be a number",
      })
      .int()
      .gte(0)
      .lte(100),
    protein_ratio: z.coerce
      .number({
        required_error: "Protein ratio is required",
        invalid_type_error: "Protein ratio must be a number",
      })
      .int()
      .gte(0)
      .lte(100),
    fat_ratio: z.coerce
      .number({
        required_error: "Fat ratio is required",
        invalid_type_error: "Fat ratio must be a number",
      })
      .int()
      .gte(0)
      .lte(100),
  })
  .refine(
    (data) => {
      const { carbo_ratio, protein_ratio, fat_ratio } = data;
      return carbo_ratio + protein_ratio + fat_ratio === 100;
    },
    {
      message: "열량 구성비의 총합은 100이 되어야 합니다.",
      path: ["carbo_ratio"],
    }
  )
  .refine(
    (data) => {
      const { carbo_ratio, protein_ratio, fat_ratio } = data;
      return carbo_ratio + protein_ratio + fat_ratio === 100;
    },
    {
      message: "열량 구성비의 총합은 100이 되어야 합니다.",
      path: ["protein_ratio"],
    }
  )
  .refine(
    (data) => {
      const { carbo_ratio, protein_ratio, fat_ratio } = data;
      return carbo_ratio + protein_ratio + fat_ratio === 100;
    },
    {
      message: "열량 구성비의 총합은 100이 되어야 합니다.",
      path: ["fat_ratio"],
    }
  );

export const DayExchangeUnitSchema = z.object({
  milk_whole: z.coerce.number().int().min(0).max(50).default(0),
  milk_low_fat: z.coerce.number().int().min(0).max(50).default(0),
  vegetables: z.coerce.number().int().min(0).max(50).default(0),
  fruits: z.coerce.number().int().min(0).max(50).default(0),
  grains: z.coerce.number().int().min(0).max(50).default(0),
  protein_low_fat: z.coerce.number().int().min(0).max(50).default(0),
  protein_medium_fat: z.coerce.number().int().min(0).max(50).default(0),
  protein_high_fat: z.coerce.number().int().min(0).max(50).default(0),
  fats: z.coerce.number().int().min(0).max(50).default(0),
});

// DayExchangeUnit 입력폼에 사용되는 스키마
export const createDayExchangeUnitSchema = (tableData: TableData) => {
  return DayExchangeUnitSchema.refine(
    (formValues) => {
      const grainsUnit = calcGrainsUnit(formValues, tableData) ?? 0;
      return formValues.grains === grainsUnit;
    },
    { message: " ", path: ["grains"] }
  )
    .refine(
      (formValues) => {
        const proteinUnit = calcProteinUnit(formValues, tableData) ?? 0;
        const { protein_high_fat, protein_low_fat, protein_medium_fat } =
          formValues;
        return (
          protein_high_fat + protein_low_fat + protein_medium_fat ===
          proteinUnit
        );
      },
      { message: " ", path: ["protein_low_fat"] }
    )
    .refine(
      (formValues) => {
        const proteinUnit = calcProteinUnit(formValues, tableData) ?? 0;
        const { protein_high_fat, protein_low_fat, protein_medium_fat } =
          formValues;
        return (
          protein_high_fat + protein_low_fat + protein_medium_fat ===
          proteinUnit
        );
      },
      { message: " ", path: ["protein_medium_fat"] }
    )
    .refine(
      (formValues) => {
        const proteinUnit = calcProteinUnit(formValues, tableData) ?? 0;
        const { protein_high_fat, protein_low_fat, protein_medium_fat } =
          formValues;
        return (
          protein_high_fat + protein_low_fat + protein_medium_fat ===
          proteinUnit
        );
      },
      { message: " ", path: ["protein_high_fat"] }
    )
    .refine(
      (formValues) => {
        const fatUnit = calcFatUnit(formValues, tableData) ?? 0;
        return formValues.fats === fatUnit;
      },
      { message: " ", path: ["fats"] }
    );
};

// export const mealUnitsSchema = z.array(
//   z.object({
//     sort: z.number(),
//     morning: z.number().min(0, "Value must be 0 or more"),
//     morningSnack: z.number().min(0, "Value must be 0 or more"),
//     lunch: z.number().min(0, "Value must be 0 or more"),
//     afternoonSnack: z.number().min(0, "Value must be 0 or more"),
//     dinner: z.number().min(0, "Value must be 0 or more"),
//   })
// );

// export const createMealUnitsSchema = (dayExchangeUnit: DayExchangeUnit) => {
//   return mealUnitsSchema.refine((formValues)=>{
//     formValues.map(({sort, morning, morningSnack, lunch, afternoonSnack, dinner})=>{
      
//     })
//     return false
//   },{message:"test", path:['']});
// };

// export type MealUnitsSchema = z.infer<ReturnType<typeof createMealUnitsSchema>>;

export const createMealUnitsSchema = (dayExchangeUnit: DayExchangeUnit) => {
  const schema = z.array(
    z.object({
      sort: z.number(),
      morning: z.number().min(0),
      morningSnack: z.number().min(0),
      lunch: z.number().min(0),
      afternoonSnack: z.number().min(0),
      dinner: z.number().min(0),
    })
  );

  return schema.superRefine((formValues, ctx) => {
    const mealTimes = [
      "morning",
      "morningSnack",
      "lunch",
      "afternoonSnack",
      "dinner",
    ];

    foodGroups.forEach((group) => {
      if (group.subgroups) {
        group.subgroups.forEach((subgroup) => {
          validateGroup(subgroup.key, formValues, dayExchangeUnit, ctx);
        });
      } else {
        validateGroup(group.key, formValues, dayExchangeUnit, ctx);
      }
    });
  });
};

const validateGroup = (
  key: string,
  formValues: z.infer<ReturnType<typeof createMealUnitsSchema>>,
  dayExchangeUnit: DayExchangeUnit,
  ctx: z.RefinementCtx
) => {
  const mealTimes = [
    "morning",
    "morningSnack",
    "lunch",
    "afternoonSnack",
    "dinner",
  ];
  const sort = groupMap.get(key);
  const groupFormValues = formValues.find((v) => v.sort === sort);

  if (!groupFormValues || !sort) return;

  const dayTotal = dayExchangeUnit[key as keyof DayExchangeUnit] as number;
  const mealTotal = mealTimes.reduce(
    (sum, meal) =>
      sum + (groupFormValues[meal as keyof typeof groupFormValues] as number),
    0
  );

  if (mealTotal !== dayTotal) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${key}의 총합은 ${dayTotal}이어야 합니다. 현재 총합: ${mealTotal}`,
      path: [sort, "morning"], // 에러를 첫 번째 필드에 연결
    });
  }
};

export type MealUnitsSchema = z.infer<ReturnType<typeof createMealUnitsSchema>>;
