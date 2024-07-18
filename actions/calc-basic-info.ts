"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { calcEnergyRequirement } from "@/lib/calc";
import { db } from "@/lib/db";
import { BasicInfoSchema } from "@/schemas/calc-index";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcBasicInfo = async (
  values: z.infer<typeof BasicInfoSchema>,
  mealPlanId: string,
  optionalData: {id: string, newKcal: string}
) => {
  const t = await getTranslations("error")
  const user = await currentUser();
  if (!user) return { error: t("unauthorized-error") };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: t("unauthorized-error") };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: t("invalid-access-error") };

  const validatedFields = BasicInfoSchema.safeParse(values);
  if (!validatedFields.success) return { error: t("invalid-field-error") };

  const { error, res } = await calcEnergyRequirement(validatedFields.data);

  if (error) return { error };
  if (res) {
    const formData = {
      mealPlanId: mealPlan.id,
      ...validatedFields.data,
      ...res,
      energy_requirement: Number(optionalData.newKcal) || res.energy_requirement,
      created_at: new Date(),
    };

    if (optionalData.id) {
      try {
        await db.calcBasicInfo.update({
          where: { id: optionalData.id },
          data: formData,
        });
        revalidatePath("/basic-info");
        return { ok: true };
      } catch (error) {
        console.log("calcBasicInfo Error ::", { error });

        return { error: t("something-wrong-error") };
      }
    } else {
      try {
        await db.calcBasicInfo.create({
          data: formData,
        });
        revalidatePath("/basic-info");

        return { ok: true };
      } catch (error) {
        console.log("calcBasicInfo Error ::", { error });

        return { error: t("something-wrong-error") };
      }
    }
  }
};
