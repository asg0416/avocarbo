"use server";

import { db } from "@/lib/db";

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
