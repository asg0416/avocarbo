"use client";
import { Poppins } from "next/font/google";
import { SigninButton } from "@/components/auth/signin-button";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import NavMenu from "./nav-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserButton } from "../auth/user-button";
import { useEffect, useState } from "react";
import { cookies, headers } from "next/headers";
import { getCookie } from "@/actions/getCookie";
import { useTriggerState } from "@/hooks/useSessionToken";
import { useSession } from "next-auth/react";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });
export const revalidate = 0;

const Header = () => {
  const pathname = usePathname();
  const isSignInPage = pathname.startsWith(`/auth/signin`);
  const {data, status, update} = useSession()
  const isLogIn = status === "authenticated"

  useEffect(()=>{
    console.log("Header useSession Log :::", { data, status, update });
    
  },[data, status, update])

  return (
    <nav className="z-50 border-b border-gray-200 drop-shadow-sm h-20 sticky top-0 bg-white flex items-center justify-center">
      <div className="max-w-screen-xl w-full h-full flex items-center justify-between p-8">
        <div className="flex gap-x-6 items-center">
          <Logo />
          <NavMenu />
        </div>
        {!isLogIn && !isSignInPage && (
          <SigninButton asChild>
            <Button variant="mainBtn" size="lg">
              Login
            </Button>
          </SigninButton>
        )}
        {isLogIn && <UserButton />}
      </div>
    </nav>
  );
};

export default Header;
