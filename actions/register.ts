"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // 백엔드에서 유효성 검사 실행
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "이미 존재하는 이메일입니다." };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // 회원가입시 생성한 토큰을 가지고 이메일인증 리다이렉트 페이지에서 토큰을 확인해야하기 때문에
  // 이 시점에서 인증 토큰을 생성하는 것
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)
  
  return { success: "Verification email sent!" };
};
