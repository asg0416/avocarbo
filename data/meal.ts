"use server";

import { db } from "@/lib/db";
import { getSearchParams } from "./searchParams";

export const getMealPlan = async (mealPlanId: string | null) => {
  if (!mealPlanId) return null;
  try {
    const mealPlan = await db.mealPlan.findUnique({
      where: { id: mealPlanId },
    });
    return mealPlan;
  } catch (error) {
    console.log("getMealPlan Error::", { error });

    return null;
  }
};

export const getMealPlanIdWithUrl = async () => {
  const searchParams = getSearchParams();
  const mealPlanId = searchParams.get("mealPlanId");

  const existingMealPlan = await getMealPlan(mealPlanId);
  if (existingMealPlan?.id) {
    return existingMealPlan.id;
  } else return null;
};

export const getBasicInfo = async (mealPlanId: string | null | undefined) => {
  if (!mealPlanId) return null;
  try {
    const basicInfo = await db.calcBasicInfo.findUnique({
      where: { mealPlanId },
    });
    return basicInfo;
  } catch (error) {
    console.log("getBasicInfo Error::", { error });

    return null;
  }
};

export const getNutrientRatio = async (mealPlanId: string | null | undefined) => {
  if (!mealPlanId) return null;
  try {
    const nutrientRatio = await db.nutrientRatio.findUnique({
      where: { mealPlanId },
    });
    return nutrientRatio;
  } catch (error) {
    console.log("getNutrientRatio Error::", { error });

    return null;
  }
};

export const getDayExchangeUnit = async (mealPlanId: string | null | undefined) => {
  if (!mealPlanId) return null;
  try {
    const dayExchangeUnit = await db.dayExchangeUnit.findUnique({
      where: { mealPlanId },
    });
    return dayExchangeUnit;
  } catch (error) {
    console.log("getDayExchangeUnit Error::", { error });

    return null;
  }
};
