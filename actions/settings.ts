"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas/auth-index";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getTranslations } from "next-intl/server";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const t = await getTranslations("error");
  const ts = await getTranslations("success");

  const user = await currentUser();
  if (!user) return { error: t("unauthorized-error") };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: t("unauthorized-error") };

  // 정보 수정할때 유효성 확인 및 OAuth 여부에 따라 처리
  // OAuth 로그인 사용자는 아래 필드를 수정할 수 없음.
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // 이메일이 db에 인증되어 있지 않은 경우 인증 먼저 하라고 해야함.
  // 이메일 인증할때 db의 이메일은 해당 이메일로 수정됨 - newVerification 서버액션 참고

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    // 다른 사람이 쓰고 있는 이메일의 경우 에러
    if (existingUser && existingUser.id !== user.id) {
      return { error: t("already-used-email-error") };
    }

    const isVerified = !!existingUser?.emailVerified;

    if (!isVerified) return { error: t("need-authentication-email-error") };
  }

  if (values.password && values.newPassword && dbUser.password) {
    // 사용자가 입력한 변경전 비번이 db에 있는 비번과 다른 경우 에러 반환
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) return { error: t("incorrect-pwd-error") };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined; // db에는 newPassword 라는 필드가 없기 때문에
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: ts("setting-update") };
};
