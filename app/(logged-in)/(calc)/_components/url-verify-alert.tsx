"use client";

import useDialog from "@/hooks/useDialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UrlVerifyAlert = () => {
  const { alert } = useDialog();

  const router = useRouter();

  useEffect(() => {
    const fn = async () => {
      const checked = await alert("Error", "올바르지 않은 접근입니다.");
      if (checked) return router.replace("/meal-plan");
    };
    fn();
  }, []);

  return null;
};

export default UrlVerifyAlert;
