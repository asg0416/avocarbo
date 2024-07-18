import { TableData } from "@/actions/calc-day-exchange-unit-table-data";
import { calcFatUnit, calcGrainsUnit, calcProteinUnit } from "@/lib/calc";
import { foodGroupsLabelMap, mealTimes } from "@/utils/constants";
import { ActiveLevel, DayExchangeUnit, PregnancyPeriod } from "@prisma/client";
import { z } from "zod";

//TODO: 로케일 작업해야함

export const NutritionData = z.object({
  totalKcal: z.number(),
  totalCarbo: z.number(),
  totalProtein: z.number(),
  totalFat: z.number(),
});
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
  title: z.string().max(30),
});

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
      .lte(100)
      .default(0),
    protein_ratio: z.coerce
      .number({
        required_error: "Protein ratio is required",
        invalid_type_error: "Protein ratio must be a number",
      })
      .int()
      .gte(0)
      .lte(100)
      .default(0),
    fat_ratio: z.coerce
      .number({
        required_error: "Fat ratio is required",
        invalid_type_error: "Fat ratio must be a number",
      })
      .int()
      .gte(0)
      .lte(100)
      .default(0),
  })
  .superRefine(({ carbo_ratio, protein_ratio, fat_ratio }, ctx) => {
    const sum = carbo_ratio + protein_ratio + fat_ratio;
    if (sum !== 100) {
      ["carbo_ratio", "protein_ratio", "fat_ratio"].map((path) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ``,
          path: [path],
        });
      });
    }
  });

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

const MealUnitSchema = z.object({
  sort: z.number(),
  morning: z.coerce.number().min(0).default(0),
  morningSnack: z.coerce.number().min(0).default(0),
  lunch: z.coerce.number().min(0).default(0),
  afternoonSnack: z.coerce.number().min(0).default(0),
  dinner: z.coerce.number().min(0).default(0),
});

export const MealUnitsSchemaType = z.object({
  mealUnits: z.array(MealUnitSchema),
});

export const createMealUnitsSchema = (dayExchangeUnit: DayExchangeUnit) => {
  return z.object({
    mealUnits: z.array(MealUnitSchema).superRefine((mealUnit, ctx) => {
      mealUnit.map((unit, idx) => {
        const res = validateGroup(unit.sort, unit, dayExchangeUnit);
        if (res?.errorMessage) {
          mealTimes.forEach((meal) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: res.errorMessage,
              path: [idx, meal],
            });
          });
        }
      });
    }),
  });
};

export const validateGroup = (
  sort: number,
  groupFormValues: z.infer<typeof MealUnitSchema>,
  dayExchangeUnit: DayExchangeUnit
) => {
  const group = foodGroupsLabelMap.get(sort);

  if (!groupFormValues || !sort || !group) return;
  const key = group.name;

  const dayTotal = dayExchangeUnit[key as keyof DayExchangeUnit] as number;
  const mealTotal = mealTimes.reduce(
    (sum, meal) =>
      sum +
      Number(groupFormValues[meal as keyof typeof groupFormValues] as number),
    0
  );

  const errorMessage =
    mealTotal !== dayTotal
      ? `${group?.upperGroup || ""} ${
          group?.label
        }의 총합은 ${dayTotal}이어야 합니다. 현재 총합: ${mealTotal}`
      : undefined;

  return { mealTotal, dayTotal, errorMessage };
};

export type MealUnitsSchema = z.infer<ReturnType<typeof createMealUnitsSchema>>;
