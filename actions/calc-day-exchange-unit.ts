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
  mealPlanId: string,
  dayExchangeUnitId?: {id: string}
) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized" };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: "올바른 접근이 아닙니다." };

  const validatedFields = DayExchangeUnitSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const formData = {
    mealPlanId,
    ...validatedFields.data,
  };

  if (dayExchangeUnitId) {
    try {
      await db.dayExchangeUnit.update({
        where: { id: dayExchangeUnitId.id },
        data: formData,
      });
      revalidatePath("/day-exchange-unit");
      return { ok: true };
    } catch (error) {
      return { error: "Something went wrong!" };
    }
  } else {
    try {
      await db.dayExchangeUnit.create({
        data: formData,
      });
      revalidatePath("/day-exchange-unit");

      return { ok: true };
    } catch (error) {
      return { error: "Something went wrong!" };
    }
  }
};
