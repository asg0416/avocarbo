"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas/auth-index";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const t = await getTranslations("error")
  const ts = await getTranslations("success")

  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: t("invalid-email-error") };

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: t("non-existent-email-error") };

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: ts("sent-reset-email") };
};
