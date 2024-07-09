"use server";

import { getBasicInfo, getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NutrientRatioSchema } from "@/schemas/calc-index";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcNutrientRatio = async (
  values: z.infer<typeof NutrientRatioSchema>,
  mealPlanId: string,
  nutrientRatioId?: { id: string }
) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized" };

  const mealPlan = await getMealPlan(mealPlanId);
  const basicInfo = await getBasicInfo(mealPlanId);
  if (!mealPlan || !basicInfo) return { error: "올바른 접근이 아닙니다." };

  const validatedFields = NutrientRatioSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { carbo_ratio, protein_ratio, fat_ratio } = validatedFields.data;
  const totalRatio = carbo_ratio + protein_ratio + fat_ratio;
  if (totalRatio !== 100)
    return { error: "열량 구성비의 총합은 100이 되어야 합니다." };

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
      
      return { error: "Something went wrong!11" };
    }
  } else {
    try {
      await db.nutrientRatio.create({
        data: formData,
      });
      revalidatePath("/nutrient-ratio");

      return { ok: true };
    } catch (error) {
      return { error: "Something went wrong!" };
    }
  }
};
