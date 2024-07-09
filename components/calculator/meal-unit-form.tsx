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
import renderTableRows from "@/app/(logged-in)/(calc)/meal-unit/_components/meal-unit-table-row";
import renderTableHeader from "@/app/(logged-in)/(calc)/meal-unit/_components/meal-unit-table-header";
import { handleFormSubmit } from "@/lib/common";
import { calcMealUnits } from "@/actions/calc-meal-units";

interface MealUnitFormProps {
  verifiedMealPlanId: string;
  dayExchangeUnitData: DayExchangeUnit | null;
  mealUnitsData: MealUnit[] | null;
}

const MealUnitForm = ({
  verifiedMealPlanId,
  dayExchangeUnitData,
  mealUnitsData,
}: MealUnitFormProps) => {
  const router = useRouter();
  const MealUnitsSchema = createMealUnitsSchema(
    dayExchangeUnitData as DayExchangeUnit
  );

  const { success, error, setError, setClear } = useAlertState();
  const [isPending, startTransition] = useTransition();
  const [isSticky, setIsSticky] = useState(true);

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

  // TODO: meal-detail 페이지 만들기
  const onSubmit = (values: z.infer<typeof MealUnitsSchema>) => {
    console.log(values);
    setClear();
    startTransition(async () => {
      await handleFormSubmit(
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

  if (!dayExchangeUnitData) return null;

  return (
    <>
      <div className="mb-4 flex items-center justify-start space-x-2 mealUnit:hidden">
        <span>제목열 고정</span>
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
            label="저장하기"
            className="mealUnit:w-fit"
          />
        </form>
      </FormProvider>
    </>
  );
};

export default MealUnitForm;
