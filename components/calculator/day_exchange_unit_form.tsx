"use client";

import { useAlertState } from "@/hooks/useAlertState";
import { DayExchangeUnitSchema } from "@/schemas/calc-index";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayExchangeUnit } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import { useExchangeUnitFormValuesStore } from "@/hooks/useExchangeUnitFormValuesStore";
import { renderGroupLabel } from "@/app/(logged-in)/(calc)/day-exchange-unit/_components/renderGroupLabel";

interface DayExchangeUnitFormProps {
  verifiedMealPlanId: string;
  dayExchangeUnitData: DayExchangeUnit | null;
}

const DayExchangeUnitForm = ({
  verifiedMealPlanId,
  dayExchangeUnitData,
}: DayExchangeUnitFormProps) => {
  const router = useRouter();
  const { success, error, setError, setClear } = useAlertState();
  const [isPending, startTransition] = useTransition();
  const setValues = useExchangeUnitFormValuesStore((state) => state.setValues);

  const form = useForm<z.infer<typeof DayExchangeUnitSchema>>({
    resolver: zodResolver(DayExchangeUnitSchema),
    defaultValues: {
      milk_whole: dayExchangeUnitData?.milk_whole || 0,
      milk_low_fat: dayExchangeUnitData?.milk_low_fat || 0,
      vegetables: dayExchangeUnitData?.vegetables || 0,
      fruits: dayExchangeUnitData?.fruits || 0,
      grains: dayExchangeUnitData?.grains || 0,
      protein_low_fat: dayExchangeUnitData?.protein_low_fat || 0,
      protein_medium_fat: dayExchangeUnitData?.protein_medium_fat || 0,
      protein_high_fat: dayExchangeUnitData?.protein_high_fat || 0,
      fats: dayExchangeUnitData?.fats || 0,
    },
  });

  const watchedValues = useWatch({
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

  const formValues = useMemo(() => {
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
    ] = watchedValues;

    return {
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
  }, [watchedValues]);

  useEffect(() => {
    setValues(formValues);
  }, [formValues, setValues]);

  const totalMilkValue =
    Number(formValues.milk_whole) + Number(formValues.milk_low_fat);
  const totalProteinValue =
    Number(formValues.protein_low_fat) +
    Number(formValues.protein_medium_fat) +
    Number(formValues.protein_high_fat);

  const onSubmit = (values: z.infer<typeof DayExchangeUnitSchema>) => {
    setClear();
    startTransition(() => {});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 ">
          {renderGroupLabel(form, isPending, "우유군", totalMilkValue, [
            { name: "milk_whole", label: "일반" },
            { name: "milk_low_fat", label: "저지방" },
          ])}
          {renderGroupLabel(form, isPending, "채소군", formValues.vegetables, [
            { name: "vegetables", label: "" },
          ])}
          {renderGroupLabel(form, isPending, "과일군", formValues.fruits, [
            { name: "fruits", label: "" },
          ])}
          {renderGroupLabel(form, isPending, "곡류군", formValues.grains, [
            { name: "grains", label: "" },
          ])}
          {renderGroupLabel(form, isPending, "어육류군", totalProteinValue, [
            { name: "protein_low_fat", label: "저지방" },
            { name: "protein_medium_fat", label: "중지방" },
            { name: "protein_high_fat", label: "고지방" },
          ])}
          {renderGroupLabel(form, isPending, "지방군", formValues.fats, [
            { name: "fats", label: "" },
          ])}
        </div>
        <div className="mt-8 space-y-4 max-w-md">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Step 4. 끼니별 식품교환 단위수 설정하기{" "}
            <FaArrowRight className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DayExchangeUnitForm;
