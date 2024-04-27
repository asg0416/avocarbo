import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

/**
 * 이메일을 통해 2단계 인증 토큰을 db에 생성
 * @param email 2단계인증 토큰 생성을 위한 이메일
 * @returns twoFactorToken 객체
 */
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  // 이미 토큰 생성한적 있으면 기존 토큰 없애고 새로 생성하기위한 로직
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

/**
 * 비밀번호 재설정을 하기 위해서 인증을 위한 토큰 생성
 * @param email 비밀번호 재설정을 위한 이메일
 * @returns 
 */
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

/**
 * 이메일 인증을 위한 토큰 생성
 * @param email 인증할 이메일
 * @returns 
 */
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  // 이미 이전에 생성한 토큰이 있는 경우 삭제하고 새로 만든 토큰으로 저장하는 과정
  // 이메일당 한개의 토큰만 가지도록하는 과정
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
