import { db } from "@/lib/db";

/**
 * email로 db에서 사용자 있는지 찾는 함수
 * @param email db에서 사용자 정보 찾기 위한 email
 * @returns 사용자 정보
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};


/**
 * id로 db에서 사용자 있는지 찾는 함수
 * @param id db에서 사용자 정보 찾기 위한 id
 * @returns 사용자 정보
 */
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
};
