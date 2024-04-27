import { db } from "@/lib/db";

/**
 * auth.js callbacks에서는 인증 완료가 안됐으면 로그인 안시키려는 목적으로 사용
 * signin 서버액션 함수에서는 인증 완료가 됐으면 twoFactorConfirmation 필드를 db에서 삭제하여 초기화하려는 목적으로 사용
 * @param userId 2단계 인증을 완료했는지 db에서 찾기 위한 사용자 아이디
 * @returns 
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const getTwoFactorConfirmation = db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return getTwoFactorConfirmation;
  } catch {
    return null;
  }
};
