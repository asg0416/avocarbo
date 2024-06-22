"use client";

import { useAlertState } from "@/hooks/useAlertState";
import { createDayExchangeUnitSchema } from "@/schemas/calc-index";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayExchangeUnit } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import { renderGroupLabel } from "@/app/(logged-in)/(calc)/day-exchange-unit/_components/renderGroupLabel";
import DayExchangeUnitFloatingData from "./day_exchange_unit_floating_data";
import { TableData } from "@/actions/calc-day-exchange-unit-table-data";
import {
  calcFatUnit,
  calcGrainsUnit,
  calcProteinUnit,
  calcTotalNutrients,
} from "@/lib/calc";
import { handleFormSubmit } from "@/lib/common";
import { calcDayExchangeUnit } from "@/actions/calc-day-exchange-unit";

interface DayExchangeUnitFormProps {
  verifiedMealPlanId: string;
  dayExchangeUnitData: DayExchangeUnit | null;
  tableData: TableData;
}

const DayExchangeUnitForm = ({
  verifiedMealPlanId,
  dayExchangeUnitData,
  tableData,
}: DayExchangeUnitFormProps) => {
  const router = useRouter();
  const DayExchangeUnitSchema = createDayExchangeUnitSchema(tableData);
  const { success, error, setError, setClear } = useAlertState();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DayExchangeUnitSchema>>({
    resolver: zodResolver(DayExchangeUnitSchema),
    defaultValues: {
      milk_whole: dayExchangeUnitData?.milk_whole || undefined,
      milk_low_fat: dayExchangeUnitData?.milk_low_fat || undefined,
      vegetables: dayExchangeUnitData?.vegetables || undefined,
      fruits: dayExchangeUnitData?.fruits || undefined,
      grains: dayExchangeUnitData?.grains || undefined,
      protein_low_fat: dayExchangeUnitData?.protein_low_fat || undefined,
      protein_medium_fat: dayExchangeUnitData?.protein_medium_fat || undefined,
      protein_high_fat: dayExchangeUnitData?.protein_high_fat || undefined,
      fats: dayExchangeUnitData?.fats || undefined,
    },
  });

  const {
    handleSubmit,
    setFocus,
    trigger,
  } = form;

  const [
    milk_whole,
    milk_low_fat,
    vegetables,
    fruits,
    grains,
    protein_low_fat,
    protein_medium_fat,
    protein_high_fat,
    fats,
  ] = useWatch({
    control: form.control,
    name: [
      "milk_whole",
      "milk_low_fat",
      "vegetables",
      "fruits",
      "grains",
      "protein_low_fat",
      "protein_medium_fat",
      "protein_high_fat",
      "fats",
    ],
  }).map((value) => value ?? 0);

  const formValues = {
    milk_whole,
    milk_low_fat,
    vegetables,
    fruits,
    grains,
    protein_low_fat,
    protein_medium_fat,
    protein_high_fat,
    fats,
  };

  const grainsUnit = calcGrainsUnit(formValues, tableData) ?? 0;
  const proteinUnit = calcProteinUnit(formValues, tableData) ?? 0;
  const fatUnit = calcFatUnit(formValues, tableData) ?? 0;

  const totalMilkValue =
    Number(formValues.milk_whole) + Number(formValues.milk_low_fat);

  const totalProteinValue =
    Number(formValues.protein_low_fat) +
    Number(formValues.protein_medium_fat) +
    Number(formValues.protein_high_fat);

  const calcNutrient = calcTotalNutrients(formValues);

  const onSubmit = (values: z.infer<typeof DayExchangeUnitSchema>) => {
    console.log("DayExchangeUnit Form Submit Values ::", values);
    setClear();
    startTransition(async () => {
      await handleFormSubmit(
        values,
        verifiedMealPlanId,
        setError,
        calcDayExchangeUnit,
        "/meal-unit",
        router.push,
        dayExchangeUnitData ? { id: dayExchangeUnitData.id } : undefined
      );
    });
  };

  const renderData = [
    {
      label: "우유군",
      totalUnit: totalMilkValue,
      fields: [
        { name: "milk_whole", label: "일반" },
        { name: "milk_low_fat", label: "저지방" },
      ],
    },
    {
      label: "채소군",
      totalUnit: formValues.vegetables,
      fields: [{ name: "vegetables", label: "" }],
    },
    {
      label: "과일군",
      totalUnit: formValues.fruits,
      fields: [{ name: "fruits", label: "" }],
    },
    {
      label: "곡류군",
      totalUnit: formValues.grains,
      fields: [{ name: "grains", label: "" }],
      option: { targetUnit: grainsUnit },
    },
    {
      label: "어육류군",
      totalUnit: totalProteinValue,
      fields: [
        { name: "protein_low_fat", label: "저지방" },
        { name: "protein_medium_fat", label: "중지방" },
        { name: "protein_high_fat", label: "고지방" },
      ],
      option: { targetUnit: proteinUnit },
    },
    {
      label: "지방군",
      totalUnit: formValues.fats,
      fields: [{ name: "fats", label: "" }],
      option: { targetUnit: fatUnit },
    },
  ];

  const onError = (errors: any) => {
    const firstError = Object.keys(errors)[0] as keyof z.infer<
      typeof DayExchangeUnitSchema
    >;
    if (firstError) {
      setFocus(firstError);
      const element = document.getElementById(`${firstError}_input`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  useEffect(() => {
    trigger(["protein_low_fat", "protein_medium_fat", "protein_high_fat"]);
  }, [totalProteinValue]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="space-y-4 ">
          {renderData.map(({ label, totalUnit, fields, option }) => {
            return renderGroupLabel(
              form,
              isPending,
              label,
              totalUnit,
              fields,
              option
            );
          })}
        </div>

        <DayExchangeUnitFloatingData
          calcNutrient={calcNutrient}
          tableData={tableData}
        />

        <div className="mt-8 space-y-4 max-w-md">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            Step 4. 끼니별 식품교환 단위수 설정하기{" "}
            <FaArrowRight className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DayExchangeUnitForm;
