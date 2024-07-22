"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import useDialog from "../hooks/useDialog";
import { useDialogStore } from "@/hooks/useDialogStore";
import { useTranslations } from "next-intl";

/**
 * alert, confirm, prompt 알림창 UI
 * prompt의 경우 별도 form 컴포넌트 작성해야하며, 해당 컴포넌트에서 닫기, 확인 버튼 구현해야함.
 * @returns alert, confirm, prompt 알림창 UI
 */
export default function Dialog() {
  const t = useTranslations("custom-dialog")
  const { revealed, title, description, type, setRevealed, children } =
    useDialogStore();
  const { onInteractionEnd } = useDialog();

  const handleConfirmClick = () => {
    onInteractionEnd(true);
  };

  const handleCancelClick = () => {
    onInteractionEnd(false);
  };

  return (
    <AlertDialog open={revealed} onOpenChange={setRevealed}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children && children}
        {type !== "prompt" && (
          <AlertDialogFooter>
            {type === "confirm" && (
              <AlertDialogCancel onClick={handleCancelClick}>
                {t("close")}
              </AlertDialogCancel>
            )}
            <AlertDialogAction onClick={handleConfirmClick}>
              {t("allow")}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
