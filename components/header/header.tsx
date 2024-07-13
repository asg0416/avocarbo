"use client";

import { SigninButton } from "@/components/auth/signin-button";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import NavMenu from "./nav-menu";
import { UserButton } from "../auth/user-button";
import { useSession } from "next-auth/react";
import ArchiveButton from "./archive-button";
import { DarkModeButton } from "./dark-mode-button";

//TODO: 임시저장 기능 만들기
//TODO: 메뉴별 기능, 페이지 만들기
const Header = () => {
  const pathname = usePathname();
  const isSignInPage = pathname.startsWith(`/auth/signin`);
  const { status } = useSession();
  const isLogIn = status === "authenticated";

  return (
    <nav className="z-50 border-b border-gray-200 drop-shadow-sm h-20 sticky top-0 bg-white flex items-center justify-center dark:bg-slate-950 dark:border-gray-700">
      <div className="max-w-screen-xl w-full h-full flex items-center justify-between p-8">
        <div className="flex gap-x-6 items-center">
          <Logo />
        </div>
        <div className="flex gap-x-4 items-center justify-end">
          <DarkModeButton />
          {!isLogIn && !isSignInPage && (
            <SigninButton asChild>
              <Button variant="mainBtn" size="lg">
                Login
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
