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
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { useAlertState } from "@/hooks/useAlertState";
import { FaArrowRight } from "react-icons/fa";
import HoverContentActiveLevel from "./hover-card/hover-content-active-level";
import HighlightTag from "./highlight-tag";
import { calcBasicInfo } from "@/actions/calc-basic-info";
import { useRouter } from "next/navigation";
import FormInfoHoverCardWrapper from "./form-info-hover-card-wrapper";
import { calcEnergyRequirement } from "@/lib/calc";
import useDialog from "@/hooks/useDialog";
import EnergyAlert from "./prompt-alert/energy-alert";
import { NEW_KCAL_ALERT_DESC } from "@/utils/constants";
import { handleFormSubmit } from "@/lib/common";

interface BasicInfoFormProps {
  basicInfo: CalcBasicInfo | null;
  verifiedMealPlanId: string;
}
export const BasicInfoForm = ({
  basicInfo,
  verifiedMealPlanId,
}: BasicInfoFormProps) => {
  const router = useRouter();

  const { success, error, setError, setClear } = useAlertState();
  const [isPending, startTransition] = useTransition();

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
      const { res } = calcEnergyRequirement(values);

      let newKcal = undefined;

      // 하루 필요열량 1700 안될때 모달 띄워서 입력값 받아서 설정하는 기능
      if (res?.energy_requirement && res.energy_requirement < 1700) {
        const _newKcal = await prompt(
          "하루필요열량 설정",
          NEW_KCAL_ALERT_DESC,
          <EnergyAlert />
        );
        if (!_newKcal) return;
        newKcal = _newKcal;
      }

      await handleFormSubmit(
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
        <div className="space-y-4 ">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>연령</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    value={field.value ?? ""}
                    placeholder="30"
                    type="number"
                    min={0}
                    max={100}
                    unit="세"
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
                <FormLabel>신장</FormLabel>
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
                <FormLabel>몸무게</FormLabel>
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
                  <HighlightTag text="임신전" /> 몸무게를 소수점 첫째자리까지
                  입력해주세요.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pregnancy_period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>임신 기간</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="임신 기간을 선택해주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={PregnancyPeriod.FIRST}>
                      초기 (1 ~ 12주차)
                    </SelectItem>
                    <SelectItem value={PregnancyPeriod.SECOND}>
                      중기 (13 ~ 27주차)
                    </SelectItem>
                    <SelectItem value={PregnancyPeriod.THIRD}>
                      후기 (28 ~ 출산전)
                    </SelectItem>
                    <SelectItem value={PregnancyPeriod.LACTATION}>
                      수유기
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
                <FormInfoHoverCardWrapper label="활동 수준">
                  <HoverContentActiveLevel />
                </FormInfoHoverCardWrapper>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="활동 수준을 선택해주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ActiveLevel.LIGHT}>
                      가벼운 활동
                    </SelectItem>
                    <SelectItem value={ActiveLevel.MODERATE}>
                      보통 활동
                    </SelectItem>
                    <SelectItem value={ActiveLevel.INTENSE}>
                      심한 활동
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription>
                  <HighlightTag text="임산부" />의 경우 일반적으로{" "}
                  <HighlightTag text="가벼운 활동" className="text-green-600" />
                  에 해당됩니다.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 space-y-4 max-w-md">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Step 2. 영양비율 설정하기 <FaArrowRight className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
