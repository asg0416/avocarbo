import { useConfirmAlertState } from "@/hooks/useConfirmAlertState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface AlertWrapperProps {
  triggerBtnLabel?: string;
  title: string;
  desc: string;
  cancelLabel?: string;
  onCancelHandler?: () => void;
  actionLabel?: string;
  onActionHandler: () => void;
}

const AlertWrapper = ({
  triggerBtnLabel,
  title,
  desc,
  cancelLabel = "취소",
  onCancelHandler,
  actionLabel = "확인",
  onActionHandler,
}: AlertWrapperProps) => {
  const { open, onOpenChangeHandler } = useConfirmAlertState();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChangeHandler}>
      {triggerBtnLabel && (
        <AlertDialogTrigger asChild>
          <Button variant="outline">{triggerBtnLabel}</Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {onCancelHandler && (
            <AlertDialogCancel
              onClick={() => {
                onCancelHandler();
                onOpenChangeHandler(false);
              }}
            >
              {cancelLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={() => {
              onActionHandler();
              onOpenChangeHandler(false);
            }}
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertWrapper;
