"use client";

import { BasicInfoSchema } from "@/schemas/calc-index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActiveLevel, CalcBasicInfo, PregnancyPeriod } from "@prisma/client";
import { useAlertState } from "@/hooks/useAlertState";
import HoverContentActiveLevel from "./hover-card/hover-content-active-level";
import HighlightTag from "./highlight-tag";
import { calcBasicInfo } from "@/actions/calc-basic-info";
import { useRouter } from "next/navigation";
import FormInfoHoverCardWrapper from "./form-info-hover-card-wrapper";
import { calcEnergy, calcEnergyRequirement } from "@/lib/calc";
import useDialog from "@/hooks/useDialog";
import EnergyAlert from "./prompt-alert/energy-alert";
import { handleFormSubmit } from "@/lib/common";
import SubmitButton from "./submit-button";
import { usePendingStore } from "@/hooks/usePendingStore";
import { useTranslations } from "next-intl";

interface BasicInfoFormProps {
  basicInfo: CalcBasicInfo | null;
  verifiedMealPlanId: string;
}
export const BasicInfoForm = ({
  basicInfo,
  verifiedMealPlanId,
}: BasicInfoFormProps) => {
  const _t = useTranslations();
  const t = useTranslations("basic-info-page");
  const router = useRouter();

  const { success, error, setError, setClear } = useAlertState();
  const { isHrefPending } = usePendingStore();
  const [transitionPending, startTransition] = useTransition();
  const isPending = isHrefPending || transitionPending;

  const form = useForm<z.infer<typeof BasicInfoSchema>>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      age: basicInfo?.age || undefined,
      height: basicInfo?.height || undefined,
      weight: basicInfo?.weight || undefined,
      pregnancy_period: basicInfo?.pregnancy_period || PregnancyPeriod.FIRST,
      active_level: basicInfo?.active_level || ActiveLevel.LIGHT,
    },
  });

  const { prompt } = useDialog();

  const onSubmit = (values: z.infer<typeof BasicInfoSchema>) => {
    setClear();

    startTransition(async () => {
      const { res } = calcEnergy(values);

      let newKcal = undefined;

      // 하루 필요열량 1700 안될때 모달 띄워서 입력값 받아서 설정하는 기능
      if (res?.energy_requirement && res.energy_requirement < 1700) {
        const _newKcal = await prompt(
          t("new-kcal-set-prompt-title"),
          t("new-kcal-set-prompt-desc"),
          <EnergyAlert />
        );
        if (!_newKcal) return;
        newKcal = _newKcal;
      }

      await handleFormSubmit(
        _t,
        values,
        verifiedMealPlanId,
        setError,
        calcBasicInfo,
        "/nutrient-ratio",
        router.push,
        { id: basicInfo?.id, newKcal }
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("age-label")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    value={field.value ?? ""}
                    placeholder="30"
                    type="number"
                    min={0}
                    max={100}
                    unit={t("age-unit")}
                    step={1}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("height-label")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="160"
                    value={field.value ?? ""}
                    type="number"
                    min={100}
                    max={200}
                    step={1}
                    unit="cm"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("weight-label")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="60.1"
                    value={field.value ?? ""}
                    type="number"
                    min={0}
                    max={1000}
                    step={0.1}
                    required
                    unit="kg"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  <HighlightTag text={t("weight-desc-1")} />{" "}
                  {t("weight-desc-tag")}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pregnancy_period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("pg-period-label")}</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("pg-pl")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={PregnancyPeriod.FIRST}>
                      {t("pg-option-1")}
                    </SelectItem>
                    <SelectItem value={PregnancyPeriod.SECOND}>
                      {t("pg-option-2")}
                    </SelectItem>
                    <SelectItem value={PregnancyPeriod.THIRD}>
                      {t("pg-option-3")}
                    </SelectItem>
                    <SelectItem value={PregnancyPeriod.LACTATION}>
                      {t("pg-option-4")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active_level"
            render={({ field }) => (
              <FormItem>
                <FormInfoHoverCardWrapper label={t("pg-active-level-label")}>
                  <HoverContentActiveLevel />
                </FormInfoHoverCardWrapper>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("pg-active-level-pl")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ActiveLevel.LIGHT}>
                      {t("pg-al-option-1")}
                    </SelectItem>
                    <SelectItem value={ActiveLevel.MODERATE}>
                      {t("pg-al-option-2")}
                    </SelectItem>
                    <SelectItem value={ActiveLevel.INTENSE}>
                      {t("pg-al-option-3")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription>
                  <HighlightTag text={t("pg-al-desc-text-1")} />
                  {t("pg-al-desc-text-2")}{" "}
                  <HighlightTag
                    text={t("pg-al-desc-text-3")}
                    className="text-green-600"
                  />
                  {t("pg-al-desc-text-4")}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <SubmitButton
          error={error}
          success={success}
          isPending={isPending}
          label={t("submit-btn")}
        />
      </form>
    </Form>
  );
};
