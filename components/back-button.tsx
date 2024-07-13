"use client";

import { FaArrowLeft } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePendingStore } from "@/hooks/usePendingStore";
import { useEffect } from "react";

interface BackButtonProps {
  href: string;
  isPending: boolean;
  responsiveCss: string;
}
const BackButton = ({ isPending, href, responsiveCss }: BackButtonProps) => {
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
          이전 수정하기
        </div>
      </Link>
    </Button>
  );
};

export default BackButton;
