"use client";

import { RiPencilLine } from "react-icons/ri";
import { Button } from "../ui/button";
import useDialog from "@/hooks/useDialog";
import EditMealPlanTitleAlert from "./prompt-alert/edit-meal-plan-title-alert";
import { editMealPlanTitle } from "@/actions/edit-meal-plan-title";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";
import { useTranslations } from "next-intl";

interface EditMealPlanTitleButtonProps {
  mealPlanId: string;
}
const EditMealPlanTitleButton = ({
  mealPlanId,
}: EditMealPlanTitleButtonProps) => {

  const ts = useTranslations("success") 
  const te = useTranslations("error") 
  const t = useTranslations("meal-plan-page") 
  
  const { prompt } = useDialog();

  const onClick = async () => {
    const title = await prompt(
      t("update-title-alert-label"),
      t("update-title-alert-desc"),
      <EditMealPlanTitleAlert />
    );

    if (!title) return false;
    try {
      const data = await editMealPlanTitle(mealPlanId, title);

      if (data?.error) {
        toast(data?.error);
      }

      if (data?.ok) {
        toast(ts("meal-plan-title-update"));
      }
    } catch (error) {
      toast(te("something-wrong-error"));
    }
  };
  return (
    <DropdownMenuItem onClick={onClick}>
      {t("update-title-alert-trigger-btn")}
      <DropdownMenuShortcut>
        <RiPencilLine className="w-4 h-4" />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};

export default EditMealPlanTitleButton;
