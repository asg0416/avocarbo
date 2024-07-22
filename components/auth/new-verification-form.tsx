"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useTranslations } from "next-intl";

export const NewVerificationForm = () => {
  const t = useTranslations("auth-verification-form")
  const te = useTranslations("error")

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const user = useCurrentUser();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError(te("missing-token-error"));
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError(te("something-wrong-error"));
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerHeader={t("header")}
      headerLabel={t("header-desc")}
      backButtonLabel={user ? t("back-to-home") : t("back-to-login")}
      backButtonHref={user ? "/" : "/auth/signin"}
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
