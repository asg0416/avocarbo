"use server";

import { getBasicInfo, getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NutrientRatioSchema } from "@/schemas/calc-index";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcNutrientRatio = async (
  values: z.infer<typeof NutrientRatioSchema>,
  mealPlanId: string,
  nutrientRatioId?: { id: string }
) => {
  const t = await getTranslations("error");

  const user = await currentUser();
  if (!user) return { error: t("unauthorized-error") };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: t("unauthorized-error") };

  const mealPlan = await getMealPlan(mealPlanId);
  const basicInfo = await getBasicInfo(mealPlanId);
  if (!mealPlan || !basicInfo) return { error: t("invalid-access-error") };

  const validatedFields = NutrientRatioSchema.safeParse(values);
  if (!validatedFields.success) return { error: t("invalid-field-error") };

  const { carbo_ratio, protein_ratio, fat_ratio } = validatedFields.data;
  const totalRatio = carbo_ratio + protein_ratio + fat_ratio;
  if (totalRatio !== 100)
    return { error: t("calc-nutrient-ratio-total-error") };

  const formData = {
    mealPlanId,
    ...validatedFields.data,
  };

  if (nutrientRatioId?.id) {
    try {
      await db.nutrientRatio.update({
        where: { id: nutrientRatioId.id },
        data: formData,
      });
      revalidatePath("/nutrient-ratio");
      return { ok: true };
    } catch (error) {
      return { error: t("something-wrong-error") };
    }
  } else {
    try {
      await db.nutrientRatio.create({
        data: formData,
      });
      revalidatePath("/nutrient-ratio");

      return { ok: true };
    } catch (error) {
      return { error: t("something-wrong-error") };
    }
  }
};
