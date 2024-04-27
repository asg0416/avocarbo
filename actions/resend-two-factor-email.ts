"use server"

import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/tokens";

export const resendTwoFactorEmail = async (email: string) => {
 const twoFactorToken = await generateTwoFactorToken(email);
 await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
  return { twoFactor: true };
};
