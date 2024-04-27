"use server"

import { cookies } from "next/headers";

export const getCookie = async () => {
  const isSessionToken = cookies().get("authjs.session-token");
  return isSessionToken
}