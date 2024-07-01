"use client";

import { NutrientRatioSchema } from "@/schemas/calc-index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAlertState } from "@/hooks/useAlertState";
import { calcNutrientRatio } from "@/actions/calc-nutrient-ratio";
import { NutrientRatio } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import FormInfoHoverCardWrapper from "./form-info-hover-card-wrapper";
import {
  HoverCarboRatio,
  HoverFatRatio,
  HoverProteinRatio,
} from "./hover-card/hover-ratio";
import { handleFormSubmit } from "@/lib/common";
import SubmitButton from "./submit-button";

interface NutrientRatioFormProps {
  kcal: number;
  verifiedMealPlanId: string;
  nutrientRatioData: NutrientRatio | null;
}

type InputName = "carbo_ratio" | "protein_ratio" | "fat_ratio";

const NutrientRatioForm = ({
  verifiedMealPlanId,
  nutrientRatioData,
}: NutrientRatioFormProps) => {
  const router = useRouter();
  const { success, error, setError, setClear } = useAlertState();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NutrientRatioSchema>>({
    resolver: zodResolver(NutrientRatioSchema),
    defaultValues: {
      carbo_ratio: nutrientRatioData?.carbo_ratio || undefined,
      protein_ratio: nutrientRatioData?.protein_ratio || undefined,
      fat_ratio: nutrientRatioData?.fat_ratio || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof NutrientRatioSchema>) => {
    setClear();

    startTransition(async () => {
      await handleFormSubmit(
        values,
        verifiedMealPlanId,
        setError,
        calcNutrientRatio,
        "/day-exchange-unit",
        router.push,
        nutrientRatioData ? { id: nutrientRatioData.id } : undefined
      );
    });
  };

  const onChange = (
    target: number,
    firstTarget: InputName,
    secondTarget: InputName,
    thirdTarget: InputName
  ) => {
    const sum =
      target +
      Number(form.getValues(secondTarget)) +
      Number(form.getValues(thirdTarget));
    if (sum !== 100) {
      form.setError(firstTarget, {
        message: "비율의 총합이 100이 되어야합니다.",
      });
    } else {
      form.clearErrors([firstTarget, secondTarget, thirdTarget]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="carbo_ratio"
            render={({ field }) => (
              <FormItem>
                <FormInfoHoverCardWrapper label="탄수화물 비율">
                  <HoverCarboRatio />
                </FormInfoHoverCardWrapper>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    value={field.value ?? ""}
                    placeholder="45 ~ 65"
                    type="number"
                    min={0}
                    max={100}
                    unit="%"
                    step={1}
                    required
                    onChangeCapture={(data) => {
                      onChange(
                        Number(data.currentTarget.value),
                        "carbo_ratio",
                        "protein_ratio",
                        "fat_ratio"
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="protein_ratio"
            render={({ field }) => (
              <FormItem>
                <FormInfoHoverCardWrapper label="단백질 비율">
                  <HoverProteinRatio />
                </FormInfoHoverCardWrapper>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    value={field.value ?? ""}
                    placeholder="10 ~ 35"
                    type="number"
                    min={0}
                    max={100}
                    unit="%"
                    step={1}
                    required
                    onChangeCapture={(data) => {
                      onChange(
                        Number(data.currentTarget.value),
                        "protein_ratio",
                        "carbo_ratio",
                        "fat_ratio"
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fat_ratio"
            render={({ field }) => (
              <FormItem>
                <FormInfoHoverCardWrapper label="지방 비율">
                  <HoverFatRatio />
                </FormInfoHoverCardWrapper>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    value={field.value ?? ""}
                    placeholder="20 ~ 35"
                    type="number"
                    min={0}
                    max={100}
                    unit="%"
                    step={1}
                    required
                    onChangeCapture={(data) => {
                      onChange(
                        Number(data.currentTarget.value),
                        "fat_ratio",
                        "carbo_ratio",
                        "protein_ratio"
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton
          error={error}
          success={success}
          isPending={isPending}
          label="Step 3. 식품교환 단위수 설정하기"
        />
      </form>
    </Form>
  );
};

export default NutrientRatioForm;
