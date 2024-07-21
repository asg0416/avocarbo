"use server";

import { signOut } from "@/auth";
import { deleteSessionCookies } from "./delete-session";

export const logout = async () => {
  await deleteSessionCookies();
  return signOut({ redirectTo: "/" });
};
