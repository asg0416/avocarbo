"use client";

import { useAlertState } from "@/hooks/useAlertState";
import { DayExchangeUnitSchema } from "@/schemas/calc-index";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayExchangeUnit } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Fragment, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";

interface DayExchangeUnitForm {
  verifiedMealPlanId: string;
  dayExchangeUnitData: DayExchangeUnit | null;
}

// TODO: 입력받은 값으로 곡류, 어육류, 지방 단위수 계산하는 로직작성
const DayExchangeUnitForm = ({
  verifiedMealPlanId,
  dayExchangeUnitData,
}: DayExchangeUnitForm) => {
  const router = useRouter();
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

  const [
    milkWholeValue,
    milkLowFatValue,
    vegetablesValue,
    fruitsValue,
    grainsValue,
    proteinLowFatValue,
    proteinMediumFatValue,
    proteinHighFatValue,
    fatsValue,
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
  });

  const totalMilkValue =
    Number(milkWholeValue ?? 0) + Number(milkLowFatValue ?? 0);

  const totalProteinValue =
    Number(proteinLowFatValue ?? 0) +
    Number(proteinMediumFatValue ?? 0) +
    Number(proteinHighFatValue ?? 0);

  const onSubmit = (values: z.infer<typeof DayExchangeUnitSchema>) => {
    setClear();

    startTransition(() => {});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 ">
          <GroupLabel label="우유군" totalUnit={totalMilkValue}>
            <div className="pl-4 flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="milk_whole"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center gap-x-2">
                    <FormLabel className="w-[10%]">일반</FormLabel>
                    <FormControl>
                      <Input
                        divClassName="grow"
                        divStyle={{ marginTop: 0 }}
                        {...field}
                        disabled={isPending}
                        value={field.value ?? ""}
                        placeholder="2"
                        type="number"
                        min={0}
                        max={50}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="milk_low_fat"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center gap-x-2">
                    <FormLabel className="w-[10%]">저지방</FormLabel>
                    <FormControl>
                      <Input
                        divClassName="grow"
                        divStyle={{ marginTop: 0 }}
                        {...field}
                        disabled={isPending}
                        value={field.value ?? ""}
                        placeholder="0"
                        type="number"
                        min={0}
                        max={50}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </GroupLabel>
          <GroupLabel label="채소군" totalUnit={vegetablesValue ?? 0}>
            <FormField
              control={form.control}
              name="vegetables"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-x-2">
                  <FormControl>
                    <Input
                      divClassName="grow"
                      divStyle={{ marginTop: 0 }}
                      {...field}
                      disabled={isPending}
                      value={field.value ?? ""}
                      placeholder="2"
                      type="number"
                      min={0}
                      max={50}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GroupLabel>
          <GroupLabel label="과일군" totalUnit={fruitsValue ?? 0}>
            <FormField
              control={form.control}
              name="fruits"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-x-2">
                  <FormControl>
                    <Input
                      divClassName="grow"
                      divStyle={{ marginTop: 0 }}
                      {...field}
                      disabled={isPending}
                      value={field.value ?? ""}
                      placeholder="2"
                      type="number"
                      min={0}
                      max={50}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GroupLabel>
          <GroupLabel label="곡류군" totalUnit={grainsValue ?? 0}>
            <FormField
              control={form.control}
              name="grains"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-x-2">
                  <FormControl>
                    <Input
                      divClassName="grow"
                      divStyle={{ marginTop: 0 }}
                      {...field}
                      disabled={isPending}
                      value={field.value ?? ""}
                      placeholder="2"
                      type="number"
                      min={0}
                      max={50}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GroupLabel>
          <GroupLabel label="어육류군" totalUnit={totalProteinValue}>
            <div className="pl-4 flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="protein_low_fat"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center gap-x-2">
                    <FormLabel className="w-[10%]">저지방</FormLabel>
                    <FormControl>
                      <Input
                        divClassName="grow"
                        divStyle={{ marginTop: 0 }}
                        {...field}
                        disabled={isPending}
                        value={field.value ?? ""}
                        placeholder="2"
                        type="number"
                        min={0}
                        max={50}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="protein_medium_fat"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center gap-x-2">
                    <FormLabel className="w-[10%]">중지방</FormLabel>
                    <FormControl>
                      <Input
                        divClassName="grow"
                        divStyle={{ marginTop: 0 }}
                        {...field}
                        disabled={isPending}
                        value={field.value ?? ""}
                        placeholder="2"
                        type="number"
                        min={0}
                        max={50}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="protein_high_fat"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center gap-x-2">
                    <FormLabel className="w-[10%]">고지방</FormLabel>
                    <FormControl>
                      <Input
                        divClassName="grow"
                        divStyle={{ marginTop: 0 }}
                        {...field}
                        disabled={isPending}
                        value={field.value ?? ""}
                        placeholder="2"
                        type="number"
                        min={0}
                        max={50}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </GroupLabel>
          <GroupLabel label="지방군" totalUnit={fatsValue ?? 0}>
            <FormField
              control={form.control}
              name="fats"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-x-2">
                  <FormControl>
                    <Input
                      divClassName="grow"
                      divStyle={{ marginTop: 0 }}
                      {...field}
                      disabled={isPending}
                      value={field.value ?? ""}
                      placeholder="2"
                      type="number"
                      min={0}
                      max={50}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GroupLabel>
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

interface GroupLabelProps {
  label: string;
  totalUnit: number;
  children: React.ReactNode;
}
const GroupLabel = ({ label, totalUnit, children }: GroupLabelProps) => {
  return (
    <Fragment>
      <p className="text-base font-semibold pt-4">{`${label} (${totalUnit})`}</p>
      <FormDescription
        className="text-red-500 "
        style={{ marginTop: "0.5rem" }}
      >
        {/* TODO: 어육류군 계산된 단위수랑 입력 받은 값이랑 일치하는지 확인 후 에러 알럿 띄우기 */}
        {totalUnit > 5 ? "" : "5이상 이어야함"}
      </FormDescription>
      <div className=" flex flex-col gap-y-4 ">{children}</div>
    </Fragment>
  );
};
