"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DayExchangeUnitSchema, NutritionData } from "@/schemas/calc-index";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcNutrientValue = async (
  values: z.infer<typeof NutritionData>,
  mealPlanId: string
) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized" };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: "올바른 접근이 아닙니다." };

  const validatedNutrientFields = NutritionData.safeParse(values);
  if (!validatedNutrientFields.success) return { error: "Invalid fields!" };

  const nutrientFormData = {
    mealPlanId,
    ...validatedNutrientFields.data,
  };

  const existingUnit = await db.setNutrientValue.findUnique({
    where: { mealPlanId },
  });

  if (existingUnit) {
    try {
      await db.setNutrientValue.update({
        where: { mealPlanId },
        data: nutrientFormData,
      });
      revalidatePath("/meal-detail");
      return { ok: true };
    } catch (error) {
      return { error: "Something went wrong!" };
    }
  } else {
    try {
      await db.setNutrientValue.create({
        data: nutrientFormData,
      });
      revalidatePath("/meal-detail");

      return { ok: true };
    } catch (error) {
      console.log("영양설정 에러 ::", error);

      return { error: "Something went wrong!" };
    }
  }
};
