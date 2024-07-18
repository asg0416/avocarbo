"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = (provider: "google" | "kakao") => {
    signIn(provider, {
      callbackUrl:callbackUrl || DEFAULT_SIGNIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full flex items-center justify-center gap-x-1"
        variant="outline"
        onClick={() => {onClick("google")}}
      >
        <FcGoogle className="h-5 w-5" />
        <p className="text-sm">Google</p>
      </Button>
      <Button
        size="lg"
        className="w-full bg-yellow-300 hover:bg-yellow-400 flex items-center justify-center gap-x-1 dark:bg-yellow-600 hover:dark:bg-yellow-500"
        variant="outline"
        onClick={() => {onClick("kakao")}}
      >
        <RiKakaoTalkFill className="h-5 w-5" />
        Kakao
      </Button>
    </div>
  );
};
