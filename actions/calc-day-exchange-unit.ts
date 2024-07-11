"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DayExchangeUnitSchema } from "@/schemas/calc-index";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcDayExchangeUnit = async (
  values: z.infer<typeof DayExchangeUnitSchema>,
  mealPlanId: string
) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized" };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: "올바른 접근이 아닙니다." };

  const validatedUnitFields = DayExchangeUnitSchema.safeParse(values);
  if (!validatedUnitFields.success) return { error: "Invalid fields!" };

  const unitFormData = {
    mealPlanId,
    ...validatedUnitFields.data,
  };

  const existingUnit = await db.dayExchangeUnit.findUnique({
    where: { mealPlanId },
  });

  if (existingUnit) {
    try {
      await db.dayExchangeUnit.update({
        where: { mealPlanId },
        data: unitFormData,
      });
      revalidatePath("/day-exchange-unit");
      return { ok: true };
    } catch (error) {
      return { error: "Something went wrong!" };
    }
  } else {
    try {
      await db.dayExchangeUnit.create({
        data: unitFormData,
      });
      revalidatePath("/day-exchange-unit");

      return { ok: true };
    } catch (error) {
      return { error: "Something went wrong!" };
    }
  }
};
