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

// TODO: confirm 테스트용 컴포넌트 작성완료하기. confirm 함수 인자로 해당 컴포넌트 넘겼을 때 작동 잘하는지확인
// TODO: confirm 취소 확인 버튼 동작 구현 가능한지 확인
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
