"use client";

import React, { Fragment, useEffect, useState, useTransition } from "react";
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
  useFieldArray,
  FieldError,
  useWatch,
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
import {
  MealUnitsSchema,
  createMealUnitsSchema,
  validateGroup,
} from "@/schemas/calc-index";
import {
  foodGroups,
  foodGroupsLabelMap,
  groupMap,
  mealTimes,
  mealTimesMap,
} from "@/utils/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useRouter } from "next/navigation";
import { useAlertState } from "@/hooks/useAlertState";
import { DayExchangeUnit, MealUnit } from "@prisma/client";
import { renderFoodGroup } from "@/app/(logged-in)/(calc)/meal-unit/_components/food-group";
import SubmitButton from "./submit-button";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { calculateUnitTotalForMealUnit } from "@/lib/calc";

interface MealUnitFormProps {
  verifiedMealPlanId: string;
  dayExchangeUnitData: DayExchangeUnit | null;
  mealUnitsData: MealUnit[];
}
type MealUnitField =
  | "sort"
  | "morning"
  | "morningSnack"
  | "lunch"
  | "afternoonSnack"
  | "dinner";

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
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const watchData = useWatch({
    control: form.control,
    name: ["mealUnits"],
  });

  const { fields } = useFieldArray({
    name: "mealUnits",
    control,
  });
  const sortedFields = fields.sort((a, b) => a.sort - b.sort);

  const onSubmit = (data: z.infer<typeof MealUnitsSchema>) => {
    console.log(data);
  };

  if (!dayExchangeUnitData) return null;
  return (
    <>
      <div className="mb-4 flex items-center justify-start space-x-2 mealUnit:hidden">
        <span>제목열 고정</span>
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
              {sortedFields.map((field, index) => {
                const item = foodGroupsLabelMap.get(field.sort);
                const target = watchData[0][index];
                const totalUnit = calculateUnitTotalForMealUnit(target);
                const dayTotal = Number(
                  dayExchangeUnitData[item?.name as keyof DayExchangeUnit]
                );
                const errorMessage = `${item?.upperGroup || ""} ${
                  item?.label
                }의 총합은 ${dayTotal}이어야합니다. 현재 총합: ${totalUnit}`;
                const isError = dayTotal !== totalUnit;

                if (field.sort > 4) {
                  return (
                    <Fragment key={field.id}>
                      {(field.sort === 5 || field.sort === 8) && (
                        <TableRow className="bg-gray-100 hover:bg-gray-100">
                          <TableCell colSpan={7} className="p-0">
                            <div
                              className={`p-2 pr-0 font-bold w-max ${stickyClass} left-0 z-20 bg-gray-100 md:static`}
                            >
                              {field.sort === 5 ? "어육류군" : "우유군"}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell
                          className={`flex p-0 ${stickyClass} left-0 z-20 bg-green-50 md:static`}
                        >
                          <div className="flex p-4 pl-6 w-full items-center justify-start h-full border-r">
                            {item?.label}
                          </div>
                        </TableCell>
                        <TableCell
                          className={`${stickyClass} p-0 left-[92px] z-20 text-center bg-white md:static`}
                        >
                          <div className="border-r py-4">
                            {
                              dayExchangeUnitData[
                                item?.name as keyof DayExchangeUnit
                              ]
                            }
                          </div>
                        </TableCell>
                        {Array.from(mealTimesMap.entries()).map(([key]) => {
                          return (
                            <TableCell key={`${field.id}-${key}`}>
                              <FormField
                                control={form.control}
                                name={
                                  `mealUnits.${index}.${key}` as `mealUnits.${number}.${MealUnitField}`
                                }
                                render={({ field: formField }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...formField}
                                        disabled={isPending}
                                        type="number"
                                        value={formField.value ?? 0}
                                        required
                                        min={0}
                                        max={50}
                                        step={0.5}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      {Object.keys(errors.mealUnits?.[index] || {}).length >
                        0 &&
                        isError && (
                          <TableRow className="bg-red-50 hover:bg-red-50">
                            <TableCell colSpan={7} className="p-0">
                              <div
                                className={`p-2 pr-0 w-max ${stickyClass} left-0 z-20 text-red-600`}
                              >
                                {errorMessage}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                    </Fragment>
                  );
                }
                return (
                  <Fragment key={field.id}>
                    <TableRow>
                      <TableCell
                        className={`font-bold p-0 ${stickyClass} left-0 z-20 md:static`}
                      >
                        <div className="flex items-center pl-2 py-4 border-r bg-green-50">
                          {item?.label}
                        </div>
                      </TableCell>
                      <TableCell
                        className={`text-center p-0 ${stickyClass} left-[92px] z-20 md:static`}
                      >
                        <div className="flex items-center justify-center py-4 border-r bg-white">
                          {
                            dayExchangeUnitData[
                              item?.name as keyof DayExchangeUnit
                            ]
                          }
                        </div>
                      </TableCell>
                      {Array.from(mealTimesMap.entries()).map(([key]) => {
                        return (
                          <TableCell key={`${field.id}-${key}`}>
                            <FormField
                              control={form.control}
                              name={
                                `mealUnits.${index}.${key}` as `mealUnits.${number}.${MealUnitField}`
                              }
                              render={({ field: formField }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...formField}
                                      disabled={isPending}
                                      required
                                      value={formField.value ?? 0}
                                      type="number"
                                      min={0}
                                      max={50}
                                      step={0.5}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>

                    {Object.keys(errors.mealUnits?.[index] || {}).length > 0 &&
                      isError && (
                        <TableRow className="bg-red-50 hover:bg-red-50">
                          <TableCell colSpan={7} className="p-0">
                            <div
                              className={`p-2 pr-0 w-max ${stickyClass} left-0 z-20 text-red-600`}
                            >
                              {errorMessage}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                  </Fragment>
                );
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
      </Form>
    </>
  );
};

export default MealUnitForm;
