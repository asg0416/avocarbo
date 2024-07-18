"use client";

import { NutrientRatioSchema } from "@/schemas/calc-index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useAlertState } from "@/hooks/useAlertState";
import { calcNutrientRatio } from "@/actions/calc-nutrient-ratio";
import { NutrientRatio } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  HoverCarboRatio,
  HoverFatRatio,
  HoverProteinRatio,
} from "./hover-card/hover-ratio";
import { handleFormSubmit } from "@/lib/common";
import SubmitButton from "./submit-button";
import renderFormField from "@/app/[locale]/(logged-in)/(check-user)/(calc)/nutrient-ratio/_components/render-form-field";
import { usePendingStore } from "@/hooks/usePendingStore";
import { useTranslations } from "next-intl";

interface NutrientRatioFormProps {
  kcal: number;
  verifiedMealPlanId: string;
  nutrientRatioData: NutrientRatio | null;
}

const NutrientRatioForm = ({
  verifiedMealPlanId,
  nutrientRatioData,
}: NutrientRatioFormProps) => {
  const _t = useTranslations();
  const t = useTranslations("nutrient-ratio-page");
  const te = useTranslations("error");
  const router = useRouter();

  const { success, error, setError, setClear } = useAlertState();
  const { isHrefPending } = usePendingStore();
  const [transitionPending, startTransition] = useTransition();
  const isPending = isHrefPending || transitionPending;

  const fields = [
    {
      name: "carbo_ratio",
      label: t("fields-label-carbo"),
      hoverComponent: <HoverCarboRatio/>,
      placeholder: "45 ~ 65",
    },
    {
      name: "protein_ratio",
      label: t("fields-label-protein"),
      hoverComponent: <HoverProteinRatio/>,
      placeholder: "10 ~ 35",
    },
    {
      name: "fat_ratio",
      label: t("fields-label-fat"),
      hoverComponent: <HoverFatRatio />,
      placeholder: "20 ~ 35",
    },
  ];

  const form = useForm<z.infer<typeof NutrientRatioSchema>>({
    mode: "onChange",
    resolver: zodResolver(NutrientRatioSchema),
    defaultValues: {
      carbo_ratio: nutrientRatioData?.carbo_ratio || undefined,
      protein_ratio: nutrientRatioData?.protein_ratio || undefined,
      fat_ratio: nutrientRatioData?.fat_ratio || undefined,
    },
  });

  const ratios = useWatch({
    control: form.control,
    name: ["carbo_ratio", "protein_ratio", "fat_ratio"],
  });

  const total = (ratios ?? []).reduce(
    (acc, ratio) => acc + (Number(ratio) || 0),
    0
  );

  const onSubmit = async (values: z.infer<typeof NutrientRatioSchema>) => {
    setClear();

    startTransition(async () => {
      await handleFormSubmit(
        _t,
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

  const { isDirty, errors } = form.formState;
  const isError = Object.keys(errors).length !== 0;

  // 에러 메세지 설정
  useEffect(() => {
    if (isError || (!isDirty && total !== 0) || (isDirty && total !== 100)) {
      setError(te("nutrient-ratio-total-sum-error", { total }));
    } else {
      setClear();
      form.clearErrors();
    }
    if (total === 100) {
      setClear();
      form.clearErrors();
    }
    return () => {
      setClear();
    };
  }, [total, isDirty, isError]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fields.map(({ name, label, hoverComponent, placeholder }) =>
            renderFormField({
              control: form.control,
              name,
              label,
              hoverComponent,
              placeholder,
              isPending,
            })
          )}
        </div>
        <SubmitButton
          error={error}
          success={success}
          isPending={isPending}
          href={`/basic-info?mealPlanId=${verifiedMealPlanId}`}
          label={t("submit-btn")}
        />
      </form>
    </Form>
  );
};

export default NutrientRatioForm;
