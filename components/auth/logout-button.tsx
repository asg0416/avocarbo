"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {

  const onClickLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <span onClick={onClickLogout} className="cursor-pointer">
      {children}
    </span>
  );
};
