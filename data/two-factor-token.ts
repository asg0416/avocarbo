import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken
  } catch {
    return null;
  }
};

/**
 * signin 서버액션 함수에서는 이메일로 db에서 2단계인증 토큰을 찾아서 2단게인증을 하기 위해서 사용함
 * tokens.ts 의 generateTwoFactorToken 함수에서는 새로 토큰을 발급해주려고 할때 기존에 해당 이메일로 발급된 토큰이 있다면 삭제 후 갱신해주기 위한 목적으로 사용함.
 * @param email 2단계 인증 토큰을 db에서 찾기 위한 사용자 이메일
 * @returns 
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken
  } catch {
    return null;
  }
};


