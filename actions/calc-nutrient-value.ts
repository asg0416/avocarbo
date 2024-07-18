"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DayExchangeUnitSchema, NutritionData } from "@/schemas/calc-index";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcNutrientValue = async (
  values: z.infer<typeof NutritionData>,
  mealPlanId: string
) => {
  const t = await getTranslations("error");

  const user = await currentUser();
  if (!user) return { error: t("unauthorized-error") };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: t("unauthorized-error") };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: t("invalid-access-error") };

  const validatedNutrientFields = NutritionData.safeParse(values);
  if (!validatedNutrientFields.success) return { error: t("invalid-field-error") };

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
      return { error: t("something-wrong-error") };
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

      return { error: t("something-wrong-error") };
    }
  }
};
