import { db } from "@/lib/db";

/**
 * 아이디를 가지고 db에 사용자 Account 정보 가져오기 (로그인 여부가 아니라 db에 있는 사용자 Account를 불러오는 것)
 * @param userId 사용자 정보를 가져오기 위한 사용자 아이디
 * @returns 
 */
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({ where: { userId: userId } });

    return account;
  } catch {
    return null;
  }
};
