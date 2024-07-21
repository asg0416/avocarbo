"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogoutButton } from "@/components/auth/logout-button";

import { TbReport } from "react-icons/tb";
import { RiSettingsLine } from "react-icons/ri";
import { ExitIcon } from "@radix-ui/react-icons";

import { useTranslations } from "next-intl";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
  const t = useTranslations("header");
  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none hover:rounded-full hover:shadow-md hover:shadow-slate-600/70">
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href="/meal-plan" className="flex w-full h-full justify-center items-center">
          <DropdownMenuItem className="w-full h-full">
            <TbReport className="h-4 w-4 mr-2" />
            {t("my-meal-plan")}
          </DropdownMenuItem>
        </Link>
        <Link href="/settings" className="flex w-full h-full justify-center items-center">
          <DropdownMenuItem className="w-full h-full">
            <RiSettingsLine className="h-4 w-4 mr-2" />
            {t("settings")}
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            {t("logout-button")}
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
