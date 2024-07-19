// 유효성 검사 타입 설정 파일

import { z } from "zod";

export const EmailSchema = z.string().email();

export const SettingsSchema = z
  .object({
    name: z.optional(
      z
        .string({
          required_error: "name-require-error",
          invalid_type_error: "name-invalid-error",
        })
        .min(1, { message: "name-min-error" })
        .max(15, { message: "pwd-max-error" })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(
      z
        .string()
        .min(1, { message: "email-require-error" })
        .email({ message: "email-invalid-error" })
    ),
    password: z.optional(
      z
        .string()
        .min(6, { message: "pwd-min-error" })
        .max(15, { message: "pwd-max-error" })
    ),
    newPassword: z.optional(
      z
        .string()
        .min(6, { message: "pwd-min-error" })
        .max(15, { message: "pwd-max-error" })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    { message: "new-pwd-require-error", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    { message: "pwd-require-error", path: ["password"] }
  );

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "pwd-min-error" })
    .max(15, { message: "pwd-max-error" }),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email-require-error" })
    .email({ message: "email-invalid-error" }),
});

export const SigninSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email-require-error" })
    .email({ message: "email-invalid-error" }),
  password: z.string().min(1, { message: "pwd-require-error" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email-require-error" })
    .email({ message: "email-invalid-error" }),
  password: z.string().min(6, { message: "pwd-min-error" }),
  name: z.string().min(1, { message: "name-require-error" }),
});
