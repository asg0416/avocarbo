import { headers } from "next/headers";

export const getSearchParams = () => {
  const headersList = headers();
  const searchParams = new URL(headersList.get("x-url") || "").searchParams;
  return searchParams
}