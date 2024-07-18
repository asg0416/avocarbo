"use client";

import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useDialog from "@/hooks/useDialog";
import { MealPlanTitleSchema } from "@/schemas/calc-index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditMealPlanTitleAlert = () => {
  const t = useTranslations("calc-alert")
  const { onInteractionEnd } = useDialog();

  const form = useForm<z.infer<typeof MealPlanTitleSchema>>({
    resolver: zodResolver(MealPlanTitleSchema),
    defaultValues: {
      title: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof MealPlanTitleSchema>) => {
    if (!values.title) return onInteractionEnd(false);
    onInteractionEnd(String(values.title) || false);
  };

  const handleCancelClick = () => {
    onInteractionEnd(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 ">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder={t("edit-meal-title-pl")}
                    max={30}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={handleCancelClick}>
            {t("close")}
          </AlertDialogCancel>
          <Button>{t("confirm")}</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default EditMealPlanTitleAlert;
