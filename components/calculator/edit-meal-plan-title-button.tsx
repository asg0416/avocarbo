"use client";

import { RiPencilLine } from "react-icons/ri";
import { Button } from "../ui/button";
import useDialog from "@/hooks/useDialog";
import EditMealPlanTitleAlert from "./prompt-alert/edit-meal-plan-title-alert";
import { editMealPlanTitle } from "@/actions/edit-meal-plan-title";
import { toast } from "sonner";

interface EditMealPlanTitleButtonProps {
  mealPlanId: string;
}
const EditMealPlanTitleButton = ({
  mealPlanId,
}: EditMealPlanTitleButtonProps) => {
  const { prompt } = useDialog();

  const onClick = async () => {
    const title = await prompt(
      "이름 수정",
      "식단 계획의 이름을 수정해주세요. (30자 이내)",
      <EditMealPlanTitleAlert />
    );
    try {
      const data = await editMealPlanTitle(mealPlanId, title);

      if (data?.error) {
        toast(data?.error);
      }

      if (data?.ok) {
        toast("제목 수정 성공 🎉");
      }
    } catch (error) {
      toast("An unexpected error occurred");
    }
  };
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="rounded-full"
    >
      <RiPencilLine className="w-4 h-4" />
    </Button>
  );
};

export default EditMealPlanTitleButton;
