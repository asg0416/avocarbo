// 유효성 검사 타입 설정 파일

import { UserRole } from "@prisma/client";
import { z } from "zod";

export const EmailSchema = z.string().email();

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    { message: "New password is required!", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    { message: "Password is required!", path: ["password"] }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "최소 6글자 이상으로 작성해주세요." }),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "이메일 형식을 확인해주세요." }),
});

export const SigninSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "이메일 형식을 확인해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "이메일 형식을 확인해주세요." }),
  password: z.string().min(6, { message: "최소 6글자 이상으로 작성해주세요." }),
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
});
