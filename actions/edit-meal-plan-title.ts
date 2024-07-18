"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { MealPlanTitleSchema } from "@/schemas/calc-index";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const editMealPlanTitle = async (mealPlanId: string, title: string) => {
  const t = await getTranslations("error");

  const user = await currentUser();
  if (!user) return { error: t("unauthorized-error") };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: t("unauthorized-error") };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: t("invalid-access-error") };

  if (mealPlan.userId !== dbUser.id) return { error: t("unauthorized-access-error") };

  const validatedFields = MealPlanTitleSchema.safeParse({title});
  if (!validatedFields.success) return { error: t("invalid-field-error") };

  try {
    await db.mealPlan.update({
      where: { id: mealPlanId },
      data: { title },
    });
    revalidatePath("/meal-plan");
    return { ok: true };
  } catch (error) {
    console.log("editMealPlanTitle Error ::", { error });

    return { error: t("something-wrong-error") };
  }
};
