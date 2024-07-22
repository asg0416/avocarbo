"use server"

import { cookies } from "next/headers";

export async function deleteSessionCookies() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  allCookies.forEach((cookie) => {
    if (cookie.name.startsWith("ch-session")) {
      cookieStore.delete(cookie.name);
    }
  });
}
