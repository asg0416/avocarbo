"use server";

import { z } from "zod";
import { SigninSchema } from "@/schemas/auth-index";
import { getUserByEmail } from "@/data/user";
import { generateTwoFactorToken } from "@/lib/tokens";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTranslations } from "next-intl/server";

/**
 * auth.js callbacks의 signIn 함수보다 먼저 실행되는 signin-form 컴포넌트의 서버 액션 함수
 * @param values 사용자가 로그인을 위해 입력한 이메일, 비밀번호 객체
 * @param callbackUrl 로그인후 이동할 주소
 * @returns
 */
export const validateSignIn = async (
  values: z.infer<typeof SigninSchema>
  // callbackUrl?: string | null
) => {
  const t = await getTranslations("send-two-factor-email");
  const te = await getTranslations("error");

  // 백엔드에서 유효성 검사 실행
  const validatedFields = SigninSchema.safeParse(values);

  if (!validatedFields.success) return { error: te("invalid-field-error") };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: te("non-existent-email-error") };
  }

  if (!existingUser.emailVerified) {
    return { error: te("need-authentication-email-error") };
  }

  // 2FA 인증
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      // 2FA 인증 토큰 있는지 확인
      if (!twoFactorToken) {
        return { error: te("invalid-code-error") };
      }

      // 2FA 인증 토큰이 입력받은 코드와 일치 하는지 확인
      if (twoFactorToken.token !== code) {
        return { error: te("invalid-code-error") };
      }

      // 2FA 인증 토큰 만료됐는지 확인
      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: te("expired-code-error") };
      }

      // 토큰과 입력받은 코드가 일치하면 DB의 토큰은 삭제함
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      // 2FA 인증 확인 했던 이력이 있으면 삭제하고 갱신해줌
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      // 2FA 인증 갱신
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token,
        t
      );

      return { twoFactor: true };
    }
  }

  return { success: true, formData: { email, password } };
};
