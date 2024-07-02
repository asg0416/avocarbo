// MealUnitForm.tsx
"use client";

import React, { Fragment, useEffect, useState, useTransition } from "react";
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "../ui/switch";
import { MealUnitsSchema, createMealUnitsSchema } from "@/schemas/calc-index";
import {
  foodGroups,
  groupMap,
  mealTimes,
  mealTimesMap,
} from "@/utils/constants";
import { Form } from "../ui/form";
import { useRouter } from "next/navigation";
import { useAlertState } from "@/hooks/useAlertState";
import { DayExchangeUnit, MealUnit } from "@prisma/client";
import { renderFoodGroup } from "@/app/(logged-in)/(calc)/meal-unit/_components/food-group";
import SubmitButton from "./submit-button";

interface MealUnitFormProps {
  verifiedMealPlanId: string;
  dayExchangeUnitData: DayExchangeUnit | null;
  mealUnitsData: MealUnit[];
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
    resolver: zodResolver(MealUnitsSchema),
    defaultValues: Array.from(groupMap.entries()).map(([key, sort]) => {
      const targetMealUnit = mealUnitsData.find((unit) => unit.sort === sort);
      return {
        sort,
        morning: targetMealUnit?.morning || undefined,
        morningSnack: targetMealUnit?.morningSnack || undefined,
        lunch: targetMealUnit?.lunch || undefined,
        afternoonSnack: targetMealUnit?.afternoonSnack || undefined,
        dinner: targetMealUnit?.dinner || undefined,
      };
    }),
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof MealUnitsSchema>) => {
    console.log("Saving meal units:", values);
  };

  if (!dayExchangeUnitData) return null;
  return (
    <>
      <div className="mb-4 flex items-center justify-end space-x-2 mealUnit:hidden">
        <span>Sticky 모드</span>
        <Switch checked={isSticky} onCheckedChange={setIsSticky} />
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
          <Table className="w-full min-w-[640px] border">
            <TableHeader>
              <TableRow className="bg-primary hover:bg-primary divide-x">
                <TableHead
                  className={`w-1/12 text-center p-0 ${stickyClass} left-0 z-20 bg-primary text-white`}
                >
                  <div className="flex items-center justify-center h-full border-r border-white">
                    식품군
                  </div>
                </TableHead>
                <TableHead
                  className={`w-1/12 p-0 text-center ${stickyClass} left-[92px] z-20 bg-primary text-white`}
                >
                  <div className="flex items-center justify-center h-full border-r border-white">
                    1일
                  </div>
                </TableHead>
                {mealTimes.map((meal) => (
                  <TableHead
                    key={meal}
                    className="w-1/12 text-center text-white"
                  >
                    {mealTimesMap.get(meal)}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodGroups.map((group) => (
                <Fragment key={group.key}>
                  {renderFoodGroup(
                    group,
                    stickyClass,
                    dayExchangeUnitData,
                    mealUnitsData
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
          <div className="w-full flex mt-4 justify-end">
            <SubmitButton
              error={error}
              success={success}
              isPending={isPending}
              label="저장하기"
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default MealUnitForm;
