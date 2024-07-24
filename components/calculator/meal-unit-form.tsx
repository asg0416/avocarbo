"use client";

import { useState, useTransition } from "react";
import {
  useForm,
  useFieldArray,
  useWatch,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Switch } from "../ui/switch";
import { createMealUnitsSchema } from "@/schemas/calc-index";
import { groupMap } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useAlertState } from "@/hooks/useAlertState";
import { DayExchangeUnit, MealUnit } from "@prisma/client";
import SubmitButton from "./submit-button";
import renderTableRows from "@/app/[locale]/(logged-in)/(check-user)/(calc)/meal-unit/_components/meal-unit-table-row";
import renderTableHeader from "@/app/[locale]/(logged-in)/(check-user)/(calc)/meal-unit/_components/meal-unit-table-header";
import { handleFormSubmit } from "@/lib/common";
import { calcMealUnits } from "@/actions/calc-meal-units";
import { usePendingStore } from "@/hooks/usePendingStore";
import { useTranslations } from "next-intl";

interface MealUnitFormProps {
  verifiedMealPlanId: string;
  dayExchangeUnitData: DayExchangeUnit;
  mealUnitsData: MealUnit[] | null;
}

const MealUnitForm = ({
  verifiedMealPlanId,
  dayExchangeUnitData,
  mealUnitsData,
}: MealUnitFormProps) => {
  const _t = useTranslations();
  const t = useTranslations("meal-unit-page");
  const router = useRouter();
  const MealUnitsSchema = createMealUnitsSchema(
    dayExchangeUnitData as DayExchangeUnit
  );

  const { success, error, setError, setClear } = useAlertState();
  const { isHrefPending } = usePendingStore();
  const [transitionPending, startTransition] = useTransition();
  const isPending = isHrefPending || transitionPending;
  const [isSticky, setIsSticky] = useState(false);

  const stickyClass = isSticky ? "sticky" : "";

  const form = useForm<z.infer<typeof MealUnitsSchema>>({
    mode: "onChange",
    resolver: zodResolver(MealUnitsSchema),
    defaultValues: {
      mealUnits: Array.from(groupMap.entries()).map(([key, sort]) => {
        const targetMealUnit = mealUnitsData?.find(
          (unit) => unit.sort === sort
        );
        return {
          sort,
          morning: targetMealUnit?.morning || undefined,
          morningSnack: targetMealUnit?.morningSnack || undefined,
          lunch: targetMealUnit?.lunch || undefined,
          afternoonSnack: targetMealUnit?.afternoonSnack || undefined,
          dinner: targetMealUnit?.dinner || undefined,
        };
      }),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const watchData = useWatch({ control: form.control, name: ["mealUnits"] });
  const { fields } = useFieldArray({ name: "mealUnits", control });

  const onSubmit = (values: z.infer<typeof MealUnitsSchema>) => {
    console.log(values);
    setClear();
    startTransition(async () => {
      await handleFormSubmit(
        _t,
        values,
        verifiedMealPlanId,
        setError,
        calcMealUnits,
        "/meal-detail",
        router.push,
        mealUnitsData ? { prevData: mealUnitsData } : undefined
      );
    });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-start space-x-2 mealUnit:hidden">
        <span>{t("switcher-label")}</span>
        <Switch checked={isSticky} onCheckedChange={setIsSticky} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
          <Table className="w-full min-w-[640px] border">
            <TableHeader>{renderTableHeader(stickyClass)}</TableHeader>
            <TableBody>
              {renderTableRows({
                fields,
                watchData,
                errors,
                control,
                isPending,
                stickyClass,
                dayExchangeUnitData,
              })}
            </TableBody>
          </Table>
          <SubmitButton
            error={error}
            success={success}
            isPending={isPending}
            label={t("submit-btn")}
            href={`/day-exchange-unit?mealPlanId=${verifiedMealPlanId}`}
            className="mealUnit:w-fit"
          />
        </form>
      </FormProvider>
    </>
  );
};

export default MealUnitForm;
