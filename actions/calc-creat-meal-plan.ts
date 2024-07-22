"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export const calcCreateMealPlan = async () => {
  const t = await getTranslations("error");
  const user = await currentUser();
  if (!user) return { error: t("need-login-error") };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: t("unauthorized-error") };

  try {
    const mealPlan = await db.mealPlan.create({
      data: {
        userId: dbUser.id,
      },
    });
    return { ok: true, mealPlanId: mealPlan.id };
  } catch (error) {
    console.log("calcCreateMealPlan Error ::", { error });

    return { error: t("something-wrong-error") };
  }
};
