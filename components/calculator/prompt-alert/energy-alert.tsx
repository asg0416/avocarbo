"use client";

import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useDialog from "@/hooks/useDialog";
import { ResetKcalSchema } from "@/schemas/calc-index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

/**
 * 하루 필요 열량이 1700kcal가 안되는 경우 사용자로 부터 설정할 값을 받는 form 컴포넌트
 * @returns form 및 제출 버튼
 */
const EnergyAlert = () => {
  const { onInteractionEnd } = useDialog();

  const form = useForm<z.infer<typeof ResetKcalSchema>>({
    resolver: zodResolver(ResetKcalSchema),
    defaultValues: {
      kcal: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ResetKcalSchema>) => {
    if (!values.kcal) return onInteractionEnd(false);
    onInteractionEnd(String(values.kcal) || false);
  };

  const handleCancelClick = () => {
    onInteractionEnd(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 ">
          <FormField
            control={form.control}
            name="kcal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="30"
                    type="number"
                    min={1700}
                    max={10000}
                    unit="kcal"
                    step={1}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={handleCancelClick}>
            닫기
          </AlertDialogCancel>
          <Button>확인</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default EnergyAlert;
