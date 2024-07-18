"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export const newVerification = async (token: string) => {
  const t = await getTranslations("error");

  const existingToken = await getVerificationTokenByToken(token);
  // db에 해당 토큰이 없는 경우
  if (!existingToken) {
    return { error: t("missing-token-error") };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  // db에 있는 토큰이 만료된 경우
  if (hasExpired) {
    return { error: t("expired-token-error") };
  }

  const loginUser = await currentUser()

  const existingUser = await getUserByEmail(existingToken.email);
  // db에 토큰을 찾을 수는 있었지만 그 토큰의 이메일로 사용자를 찾을 수 없는 경우
  // 즉, 그 사이에 사용자가 이메일을 변경한 경우
  if (!loginUser && !existingUser) {

    return { error: t("non-existent-email-error") };
  }



  await db.user.update({
    where: { id: loginUser?.id || existingUser?.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email, //일반적인 회원가입시에는 필요없지만, 인증한 사용자가 이메일 수정하는 경우 필요.
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
