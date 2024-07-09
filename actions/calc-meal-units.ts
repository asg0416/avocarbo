"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { MealUnitsSchemaType } from "@/schemas/calc-index";
import { MealUnit } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcMealUnits = async (
  values: z.infer<typeof MealUnitsSchemaType>,
  mealPlanId: string,
  mealUnitsData?: { prevData: MealUnit[] }
) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized" };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: "올바른 접근이 아닙니다." };

  const validatedFields = MealUnitsSchemaType.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const res = await Promise.all(
    validatedFields.data.mealUnits.map(async (mealUnit) => {
      const formData = { mealPlanId, ...mealUnit };
      const prevUnitId = mealUnitsData?.prevData?.find(
        (unit) => unit.sort === mealUnit.sort
      )?.id;

      if (prevUnitId) {
        try {
          await db.mealUnit.update({
            where: { id: prevUnitId },
            data: formData,
          });
          revalidatePath("/meal-unit");
          return { ok: true };
        } catch (error) {
          return { error: "Something went wrong!" };
        }
      } else {
        try {
          await db.mealUnit.create({
            data: formData,
          });
          revalidatePath("/meal-unit");

          return { ok: true };
        } catch (error) {
          return { error: "Something went wrong!" };
        }
      }
    })
  );
  
  const errorResult = res.find((result) => result.error);
  if (errorResult) {
    console.log("Error found:", errorResult);
    return errorResult;
  }

  console.log("All operations successful:", res);
  return { ok: true };
};
