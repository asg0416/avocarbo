import { db } from "@/lib/db";

/**
 * 인증 페이지 주소에서 받아온 토큰으로 db에 일치하는 토큰이 있는지 확인 하는 함수
 * @param token 인증 페이지에서 가져온 토큰
 * @returns 
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

/**
 * 토큰 발급을 위한 generateVerificationToken 함수에서 이메일로 발급된 토큰이 있는지 확인해서 기존에 생성한 토큰을 삭제하고 갱신하기 위해 사용함
 * @param email 이메일 인증을 하기위한 이메일
 * @returns 
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
