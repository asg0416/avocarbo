"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { AUTH_ACCOUNT_ERROR_CODE } from "@/routes";
import { redirect } from "next/navigation";
import useAccountError from "@/hooks/useAccountError";
import { useTranslations } from "next-intl";

export const ErrorCard = () => {
  const t = useTranslations("auth-error-card")
  const { urlError } = useAccountError();

  if (urlError)
    return redirect(`/auth/signin?error=${AUTH_ACCOUNT_ERROR_CODE}`);

  return (
    <CardWrapper
      headerHeader={t("header")}
      headerLabel={t("header-desc")}
      backButtonHref="/auth/signin"
      backButtonLabel={t("back-button-label")}
    >
      <div />
    </CardWrapper>
  );
};
