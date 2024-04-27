"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SigninForm } from "@/components/auth/signin-form";

interface SigninButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const SigninButton = ({
  children,
  mode = "redirect",
  asChild,
}: SigninButtonProps) => {
  const router = useRouter();
  const onClick = () => router.push("/auth/signin")

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <SigninForm/>
        </DialogContent>
      </Dialog>
    )
  }
  
  return <span onClick={onClick} className="cursor-pointer">{children}</span>;
};
