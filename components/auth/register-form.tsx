"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas/auth-index";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { useTransition } from "react";
import { useAlertState } from "@/hooks/useAlertState";
import { useTranslations } from "next-intl";

export const RegisterForm = () => {
  const te = useTranslations("error");
  const t = useTranslations("auth-register-form");
  const { success, error, setError, setClear, setSuccess, setEmail } =
    useAlertState();

  /**
   * 서버액션 중 pending 상태 처리
   * startTransition으로 서버 액션 감싼 뒤 로딩 처리 필요한곳에 isPending 상태 값 사용
   */
  const [isPending, startTransition] = useTransition();

  // form
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  // form 제출 함수
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setClear();

    startTransition(() => {
      register(values).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setEmail(values.email);
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerHeader={t("header")}
      headerLabel={t("header-desc")}
      backButtonLabel={t("back-to-login")}
      backButtonHref="/auth/signin"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name-label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={t("name-pl")}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name &&
                      te(form.formState.errors.name.message)}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email-label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="sample@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email &&
                      te(form.formState.errors.email.message)}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("pwd-label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password &&
                      te(form.formState.errors.password.message)}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            {t("submit-btn")}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
