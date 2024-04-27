"use client";

import { AUTH_ACCOUNT_ERROR_CODE } from "@/routes";
import { useSearchParams } from "next/navigation";

const useAccountError = () => {
  const searchParams = useSearchParams();
  const errorType = searchParams.get("error");
  const urlError = errorType === AUTH_ACCOUNT_ERROR_CODE;

  return {urlError, errorType};
}
 
export default useAccountError;
