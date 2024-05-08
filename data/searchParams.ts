import { headers } from "next/headers";

export const getSearchParams = () => {
  const headersList = headers();

  const searchParams = new URL(
    headersList.get("x-url") || "http://localhost:3000"
  ).searchParams;
  
  return searchParams;
};
