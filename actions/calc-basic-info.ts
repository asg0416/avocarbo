"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { calcEnergyRequirement } from "@/lib/calc";
import { db } from "@/lib/db";
import { BasicInfoSchema } from "@/schemas/calc-index";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcBasicInfo = async (
  values: z.infer<typeof BasicInfoSchema>,
  mealPlanId: string,
  basicInfoId?: string,
  newKcal?: string,
) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized" };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: "올바른 접근이 아닙니다." };

  const validatedFields = BasicInfoSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { error, res } = calcEnergyRequirement(validatedFields.data);

  if (error) return { error };
  if (res) {
    const formData = {
      mealPlanId: mealPlan.id,
      ...validatedFields.data,
      ...res,
      energy_requirement: Number(newKcal) || res.energy_requirement,
      created_at: new Date(),
    };

    if (basicInfoId) {
      try {
        await db.calcBasicInfo.update({
          where: { id: basicInfoId },
          data: formData,
        });
        revalidatePath("/basic-info");
        return { ok: true };
      } catch (error) {
        console.log("calcBasicInfo Error ::", { error });

        return { error: "Something went wrong!" };
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

        return { error: "Something went wrong!" };
      }
    }
  }
};
