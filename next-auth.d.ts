// 사용자 속성 중에 커스텀으로 추가한 속성 타입 지정을 위한 파일

import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

// user 필드의 커스텀 속성 타입을 지정할 수 있음.
export type ExtendedUser = DefaultSession["user"] & {
  isTwoFactorEnabled: boolean;
  role: UserRole;
  isOAuth: boolean; // settings에서 사용자의 로그인 방법에 따라 다른 화면을 보여주기 위해 필요함
  emailVerified: Date;
};

// next auth 의 세션 interface의 user 타입을 새로 지정하기 위한 코드
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
