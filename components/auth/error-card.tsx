"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { AUTH_ACCOUNT_ERROR_CODE } from "@/routes";
import { redirect } from "next/navigation";
import useAccountError from "@/hooks/useAccountError";

export const ErrorCard = () => {
  const { urlError } = useAccountError();

  if (urlError)
    return redirect(`/auth/signin?error=${AUTH_ACCOUNT_ERROR_CODE}`);

  return (
    <CardWrapper
      headerHeader="Error"
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/signin"
      backButtonLabel="Back to signin"
    >
      <div className="w-full flex  justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
