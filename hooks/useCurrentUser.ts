import { useSession } from "next-auth/react";

// 서버는 auth.js 의 auth 함수를 실행하는 반면
// 클라이언트 사이드에서는 useSession 훅을 사용하는 것이 다름
export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};
