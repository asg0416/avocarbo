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
import {
  ActiveLevel,
  CalcBasicInfo,
  PregnancyPeriod,
} from "@prisma/client";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { useAlertState } from "@/hooks/useAlertState";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components//ui/hover-card";
import { FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import HoverContentActiveLevel from "./hover-content-active-level";
import HighlightTag from "./highlight-tag";
import { calcBasicInfo } from "@/actions/calc-basic-info";
import { useRouter } from "next/navigation";

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

  // TODO: 수정하기 기능 만들기
  const onSubmit = (values: z.infer<typeof BasicInfoSchema>) => {
    setClear();

    startTransition(() => {
      if (verifiedMealPlanId) {
        calcBasicInfo(values, verifiedMealPlanId).then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.ok) {
            return router.push(
              `/nutrient-ratio?mealPlanId=${verifiedMealPlanId}`
            );
          }
        });
      }
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
                <div className="flex gap-x-2 items-center py-2">
                  <FormLabel>활동 수준</FormLabel>
                  <HoverCard>
                    <HoverCardTrigger>
                      <FaQuestionCircle className="w-4 h-4 cursor-pointer text-orange-600 hover:text-orange-400" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <HoverContentActiveLevel />
                    </HoverCardContent>
                  </HoverCard>
                </div>
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
