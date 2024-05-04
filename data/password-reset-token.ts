import { db } from "@/lib/db";

/**
 * 비밀번호 재설정을 하는 newPassword 함수에서 주소로 가져온 토큰으로 db의 비밀번호재설정토큰 필드에서 해당 토큰을 찾는 함수
 * @param token 주소로 가져온 token
 * @returns 비밀번호 재설정 토큰
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 * 비밀번호 재설정 토큰 생성하는 generatePasswordResetToken에서 기존에 발급된 토큰이 있는지 받아온 이메일로 확인해보기 위해 필요한 함수
 * @param email 비밀번호 재설정 토큰을 찾기 위한 이메일
 * @returns 비밀번호 재설정 토큰
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};
