"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";

import { z } from "zod";
import { useForm } from "react-hook-form";

import useAccountError from "@/hooks/useAccountError";
import { useAlertState } from "@/hooks/useAlertState";
import { zodResolver } from "@hookform/resolvers/zod";

import { resendTwoFactorEmail } from "@/actions/resend-two-factor-email";

import { SigninSchema } from "@/schemas/auth-index";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";
import { validateSignIn } from "@/actions/validateSignIn";
import { signIn } from "next-auth/react";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import { useTranslations } from "next-intl";

export const SigninForm = () => {
  const t = useTranslations("signin-page")
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { success, error, setError, setClear, setEmail } = useAlertState();

  const { urlError } = useAccountError();

  useEffect(() => {
    urlError
      ? setError(t("exist-email-with-different-provider-error-msg"))
      : setError("");
  }, [urlError]);

  /**
   * 서버액션 중 pending 상태 처리
   * startTransition으로 서버 액션 감싼 뒤 로딩 처리 필요한곳에 isPending 상태 값 사용
   */
  const [isPending, startTransition] = useTransition();
  const [isResending, startResending] = useTransition();

  // form
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const resendCode = (email: string) => {
    startResending(async () => {
      resendTwoFactorEmail(email);
    });
  };
  
  const onSubmit = (values: z.infer<typeof SigninSchema>) => {
    setClear();

    startTransition(async () => {
      try {
        const data = await validateSignIn(values);
        if (data?.error) {
          setError(data.error);
          setEmail(values.email);
        }
        if (data?.twoFactor) {
          setShowTwoFactor(true);
        }
        if (data.success) {
          const res = await signIn("credentials", {
            ...data.formData,
            callbackUrl: callbackUrl || DEFAULT_SIGNIN_REDIRECT,
          });
          if (res?.error) {
            if (res.error === "CredentialsSignin") {
              setError(t("invalid-credential-error-msg"));
            } else {
              setError(t("something-wrong-error-msg"));
            }
            setEmail(values.email);
            if (showTwoFactor) {
              form.reset();
              setShowTwoFactor(false);
            }
          }
        }
      } catch (error) {
        return setError(t("something-wrong-error-msg"));
      }
    });
  };

  useEffect(() => {
    return () => {
      setClear();
    };
  }, []);

  return (
    <CardWrapper
      headerHeader={t("login-title")}
      headerLabel={t("login-title-label")}
      backButtonLabel={t("back-button-label")}
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 ">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("2fa-code-label")}</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field} disabled={isPending}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <Button
                      size="sm"
                      variant="link"
                      className="px-0 font-normal"
                      disabled={isResending}
                      onClick={() => {
                        resendCode(form.getValues().email);
                      }}
                    >
                      {isResending ? t("resending") : t("resend-code")}
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email-input-label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="sample@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("pwd-input-label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">
                          {t("pwd-forgot-button-label")}
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            {showTwoFactor ? t("show-2fa-label") : t("login-title")}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
