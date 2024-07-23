"use client";

import { SigninButton } from "@/components/auth/signin-button";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { UserButton } from "../auth/user-button";
import { useSession } from "next-auth/react";
import { DarkModeButton } from "./dark-mode-button";
import LanguageSwitcher from "../language-switcher";
import { useTranslations } from "next-intl";

//TODO: 메뉴별 기능, 페이지 만들기
const Header = () => {
  const t = useTranslations("header")
  const pathname = usePathname();
  const isSignInPage = pathname.startsWith(`/auth/signin`);
  const { status } = useSession();
  const isLogIn = status === "authenticated";

  return (
    <nav className="z-50 border-b border-gray-200 drop-shadow-sm h-16 sm:h-20 sticky top-0 bg-white flex items-center justify-center dark:bg-slate-950 dark:border-gray-700">
      <div className="max-w-screen-xl w-full h-full flex items-center justify-between px-3 sm:p-8">
        <div className="flex gap-x-6 items-center">
          <Logo />
        </div>
        <div className="flex gap-x-2 sm:gap-x-4 items-center justify-end">
          <LanguageSwitcher />
          <DarkModeButton />
          {!isLogIn && !isSignInPage && (
            <SigninButton asChild>
              <Button
                variant="mainBtn"
                className="h-8 rounded-md px-3 text-xs sm:h-10 sm:px-8 sm:text-base"
              >
                {t("login-button")}
              </Button>
            </SigninButton>
          )}
          {isLogIn && (
            <div className="flex items-center justify-center gap-x-6">
              <UserButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
