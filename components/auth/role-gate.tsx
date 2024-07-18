"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";
import { useTranslations } from "next-intl";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const t = useTranslations("error")
  const role = useCurrentRole()
  if(role !== allowedRole){
    return <FormError message={t("unauthorized-error")} />;
  }
  return <>{children}</>
};
