"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas/auth-index";
import { getTranslations } from "next-intl/server";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  const t = await getTranslations("error");
  const ts = await getTranslations("success");

  if (!token) return { error: t("missing-token-error") };

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: t("invalid-field-error") };

  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: t("invalid-token-error") };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: t("expired-token-error") };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: t("non-existent-email-error") };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: {id: existingToken.id}
  })

  return {success: ts("pwd-update")}
};
