"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useEffect, useState, Fragment } from "react";
import { useSession } from "next-auth/react";

import { Switch } from "@/components/ui/switch";
import { EmailSchema, SettingsSchema } from "@/schemas/auth-index";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAlertState } from "@/hooks/useAlertState";
import VerifyButton from "@/components/auth/verify-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { Title } from "@/components/\bcalculator/title";

//TODO: 개인정보 수정 페이지 필요하면 수정해야함
const SettingsPage = () => {
  const t = useTranslations("settings");
  const te = useTranslations("error");
  const user = useCurrentUser();

  const [isAuthenticate, setAuthenticate] = useState(!!user?.emailVerified);
  const [isVerified, setVerified] = useState(true);

  const { success, error, setError, setSuccess, setClear } = useAlertState();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    mode: "onChange",
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      // role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            form.resetField("password");
            form.resetField("newPassword");
            setSuccess(data.success);
          }
        })
        .catch(() => setError(te("something-wrong-error")));
    });
  };

  useEffect(() => {
    return () => {
      setClear();
    };
  }, []);

  // password input 초기화
  useEffect(() => {
    const pw = form.getValues("password");
    if (pw === "") {
      form.setValue("password", undefined);
    }
  }, [form.getValues("password")]);

  useEffect(() => {
    const newPw = form.getValues("newPassword");
    if (newPw === "") {
      form.setValue("newPassword", undefined);
    }
  }, [form.getValues("newPassword")]);

  return (
    <Fragment>
      <Title title={t("title")} desc={t("desc")} />
      <CardWrapper className="flex w-full pt-0">
        <CardContent className="p-0 sm:p-2">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                          placeholder={t("name-pl")}
                          disabled={isPending}
                          minLength={1}
                          maxLength={15}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.name &&
                          te(form.formState.errors.name.message)}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("email-label")}</FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-between gap-x-2">
                              <Input
                                divClassName="w-full"
                                {...field}
                                placeholder="john.doe@example.com"
                                type="email"
                                disabled={isPending}
                                minLength={1}
                                maxLength={50}
                                onChangeCapture={(data) => {
                                  const email = data.currentTarget.value;
                                  const validatedEmail =
                                    EmailSchema.safeParse(email);

                                  if (!validatedEmail.success) {
                                    setVerified(false);
                                  } else {
                                    setVerified(true);
                                  }
                                  if (user?.email !== email) {
                                    setAuthenticate(false);
                                  } else {
                                    setAuthenticate(true);
                                  }
                                }}
                              />
                              {!isVerified && (
                                <Button type="button" disabled size="sm">
                                  {te("invalid-email-error")}
                                </Button>
                              )}
                              {isVerified && (
                                <VerifyButton
                                  isSetting={true}
                                  settingsEmail={field.value}
                                  isAuthenticate={isAuthenticate}
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.email &&
                              te(form.formState.errors.email.message)}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {/* <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-rol items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>{t("2fa-label")}</FormLabel>
                            <FormDescription>{t("2fa-desc")}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={isPending}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Accordion type="single" collapsible>
                      <AccordionItem value="password">
                        <AccordionTrigger
                          onClickCapture={() => {
                            const values = form.getValues();
                            if (values.password || values.newPassword) {
                              form.resetField("password");
                              form.resetField("newPassword");
                            }
                          }}
                          className="text-destructive"
                        >
                          {t("change-pwd-title")}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 p-2">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("change-pwd-label")}</FormLabel>
                                <FormDescription>
                                  {t("change-pwd-desc")}
                                </FormDescription>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="******"
                                    type="password"
                                    disabled={isPending}
                                    minLength={6}
                                    maxLength={15}
                                  />
                                </FormControl>
                                <FormMessage>
                                  {form.formState.errors.password &&
                                    te(form.formState.errors.password.message)}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("new-pwd-label")}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="******"
                                    type="password"
                                    disabled={isPending}
                                    minLength={6}
                                    maxLength={15}
                                  />
                                </FormControl>
                                <FormMessage>
                                  {form.formState.errors.newPassword &&
                                    te(form.formState.errors.newPassword.message)}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                )}
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isPending} type="submit">
                {t("submit-btn")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardWrapper>
    </Fragment>
  );
};

export default SettingsPage;
