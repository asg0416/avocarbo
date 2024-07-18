"use client";

import { FaArrowLeft } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePendingStore } from "@/hooks/usePendingStore";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface BackButtonProps {
  href: string;
  isPending: boolean;
  responsiveCss: string;
}
const BackButton = ({ isPending, href, responsiveCss }: BackButtonProps) => {
  const t = useTranslations("btn")
  const { setIsHrefPending } = usePendingStore();

  useEffect(() => {
    return () => {
      setIsHrefPending(false);
    };
  }, []);

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={() => {
        setIsHrefPending(true);
      }}
      className={`w-full bg-white border border-slate-800 text-slate-800 hover:bg-slate-100 hover:border-slate-400 ${responsiveCss}`}
    >
      <Link href={href}>
        <div className="flex items-center justify-center gap-x-2">
          <FaArrowLeft className="w-3 h-3" />
          {t("calc-edit-back-btn")}
        </div>
      </Link>
    </Button>
  );
};

export default BackButton;
