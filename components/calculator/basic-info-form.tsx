"use client";

import { BasicInfoSchema } from "@/schemas/calc-index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
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
import { ActiveLevel, PregnancyPeriod } from "@prisma/client";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { useAlertState } from "@/hooks/useAlertState";

export const BasicInfoForm = () => {
  const { success, error, setError, setClear, setEmail } = useAlertState();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BasicInfoSchema>>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      age: 0,
      height: 0,
      weight: 0,
      pregnancy_period: "FIRST",
      active_level: "LIGHT",
    },
  });

  const onSubmit = (values: z.infer<typeof BasicInfoSchema>) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 max-w-60">
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
                    placeholder=""
                    type="number"
                    min={0}
                    max={100}
                    unit="세"
                  />
                </FormControl>
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
                    placeholder=""
                    type="number"
                    min={100}
                    max={200}
                    unit="cm"
                  />
                </FormControl>
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
                    placeholder="임신전 몸무게를 입력해주세요."
                    type="number"
                    min={0}
                    max={1000}
                    step={0.1}
                    unit="kg"
                  />
                </FormControl>
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
                <FormLabel>활동 수준</FormLabel>
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
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 space-y-4 max-w-60">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            영양비율 설정하기
          </Button>
        </div>
      </form>
    </Form>
  );
};
