"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { MealPlanTitleSchema } from "@/schemas/calc-index";
import { revalidatePath } from "next/cache";

export const editMealPlanTitle = async (mealPlanId: string, title: string) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized" };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: "올바른 접근이 아닙니다." };

  if (mealPlan.userId !== dbUser.id) return { error: "권한이 없습니다." };

  const validatedFields = MealPlanTitleSchema.safeParse({title});
  if (!validatedFields.success) return { error: "Invalid fields!" };

  try {
    await db.mealPlan.update({
      where: { id: mealPlanId },
      data: { title },
    });
    revalidatePath("/meal-plan");
    return { ok: true };
  } catch (error) {
    console.log("editMealPlanTitle Error ::", { error });

    return { error: "Something went wrong! 22" };
  }
};
