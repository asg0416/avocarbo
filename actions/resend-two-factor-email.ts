"use server"

import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/tokens";
import { getTranslations } from "next-intl/server";

export const resendTwoFactorEmail = async (email: string) => {
  const t = await getTranslations("send-two-factor-email");
 const twoFactorToken = await generateTwoFactorToken(email);
 await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token, t);
  return { twoFactor: true };
};
