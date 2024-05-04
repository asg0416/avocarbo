"use client";

import AlertWrapper from "@/components/alert-wrapper";
import { useConfirmAlertState } from "@/hooks/useConfirmAlertState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Alert = () => {
  const router = useRouter();
  const { onOpenChangeHandler } = useConfirmAlertState();

  useEffect(() => {
    onOpenChangeHandler(true);
  }, []);

  const onActionHandler = () => {
    return router.replace("/meal-plan");
  };
  return (
    <AlertWrapper
      title="Error"
      desc="올바르지 않은 접근입니다."
      onActionHandler={onActionHandler}
    />
  );
};

export default Alert;
