// 서버 사이드에서 사용자 정보가저오기 lib

import { auth } from "@/auth";

// auth 세션에 사용자 정보 들어있음.
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
export const currentRole = async () => {
  const session = await auth();
  return session?.user.role;
};
