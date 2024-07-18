"use client";

import * as z from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmailSchema, SettingsSchema } from "@/schemas/auth-index";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
import { UserRole } from "@prisma/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAlertState } from "@/hooks/useAlertState";
import VerifyButton from "@/components/auth/verify-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SettingsPage = () => {
  const user = useCurrentUser();

  const [isAuthenticate, setAuthenticate] = useState(!!user?.emailVerified);
  const [isVerified, setVerified] = useState(true);

  const { success, error, setError, setSuccess, setClear } = useAlertState();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
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
        .catch(() => setError("Something went wrong!"));
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
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-between gap-x-2">
                            <Input
                              divClassName="w-full"
                              {...field}
                              placeholder="john.doe@example.com"
                              type="email"
                              disabled={isPending}
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
                                Invalid Email
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
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
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-rol items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Two Factor Enable</FormLabel>
                          <FormDescription>
                            Enable two factor authentication for your account
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
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
                        Change Password
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 p-2">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormDescription>
                                To change your password, enter your current
                                password for identification.
                              </FormDescription>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value ?? ""}
                                  placeholder="******"
                                  type="password"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value ?? ""}
                                  placeholder="******"
                                  type="password"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
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
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
