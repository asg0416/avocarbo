"use client";

import useDialog from "@/hooks/useDialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UrlVerifyAlertProps {
  msg?: string;
}
const UrlVerifyAlert = ({ msg }: UrlVerifyAlertProps) => {
  const { alert } = useDialog();

  const router = useRouter();

  useEffect(() => {
    const fn = async () => {
      const checked = await alert("Error", msg || "올바르지 않은 접근입니다.");
      if (checked) return router.replace("/");
    };
    fn();
  }, []);

  return null;
};

export default UrlVerifyAlert;
