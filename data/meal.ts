"use server";

import { db } from "@/lib/db";
import { getSearchParams } from "./searchParams";

// TODO: MealPlan 페이지 처음 생성된 모든 단위수 식단 불러오는 함수 작성하기
export const getMealPlansByUserId = async (userId: string) => {
  if (!userId) return null;
  try {
    const mealPlans = await db.user.findUnique({
      where: { id: userId },
      include: {
        mealPlans: {
          include: {
            calcBasicInfo: true,
          },
          orderBy: {
            createdAt: "desc", // createdAt 기준으로 내림차순 정렬
          },
        },
      },
    });
    return mealPlans?.mealPlans;
  } catch (error) {
    console.log("getMealPlans Error::", { error });

    return null;
  }
};

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

export const getKcal = async (mealPlanId: string | null | undefined) => {
  if (!mealPlanId) return null;
  try {
    const basicInfo = await db.calcBasicInfo.findUnique({
      where: { mealPlanId },
    });
    return basicInfo?.energy_requirement;
  } catch (error) {
    console.log("getBasicInfo Error::", { error });

    return null;
  }
};

export const getNutrientRatio = async (
  mealPlanId: string | null | undefined
) => {
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

export const getDayExchangeUnit = async (
  mealPlanId: string | null | undefined
) => {
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
