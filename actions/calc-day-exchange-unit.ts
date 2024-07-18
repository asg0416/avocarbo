"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DayExchangeUnitSchema } from "@/schemas/calc-index";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcDayExchangeUnit = async (
  values: z.infer<typeof DayExchangeUnitSchema>,
  mealPlanId: string
) => {
  const t = await getTranslations("error");

  const user = await currentUser();
  if (!user) return { error: t("unauthorized-error") };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: t("unauthorized-error") };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: t("invalid-access-error") };

  const validatedUnitFields = DayExchangeUnitSchema.safeParse(values);
  if (!validatedUnitFields.success) return { error: t("invalid-field-error") };

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
      return { error: t("something-wrong-error") };
    }
  } else {
    try {
      await db.dayExchangeUnit.create({
        data: unitFormData,
      });
      revalidatePath("/day-exchange-unit");

      return { ok: true };
    } catch (error) {
      return { error: t("something-wrong-error") };
    }
  }
};
