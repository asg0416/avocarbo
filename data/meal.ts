import { db } from "@/lib/db";

export const getMealPlan = async (mealPlanId: string) => {
  try {
    const mealPlan = await db.mealPlan.findUnique({
      where: { id: mealPlanId },
    });
  } catch {}
};
