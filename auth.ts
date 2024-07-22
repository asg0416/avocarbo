import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
import { deleteSessionCookies } from "./actions/delete-session";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }, //단순 boolean이 아니라 인증날자를 기록해서 오래된 사용자를 판별할 수 있음.
      });
    },
    async signOut() {
      await deleteSessionCookies();
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification. (OAuth 로그인은 이메일 인증없음)
      if (account?.provider !== "credentials") return true;

      if (user.id) {
        const existingUser = await getUserById(user.id);

        // 이메일 인증을 안한 사용자는 로그인 못하게 함.
        if (!existingUser?.emailVerified) return false;

        // 2FA check
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id
          );

          if (!twoFactorConfirmation) return false;

          // 다음 로그인 때도 2FA 인증을 받기 위해 twoFactorConfirmation 삭제함.
          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id },
          });
        }
      }

      return true; // 로그인을 허용하겠다는 의미
    },
    async session({ token, session, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.emailVerified = token.emailVerified as Date;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser?.id);

      token.isOAuth = !!existingAccount; //!!는 boolean 값 만들기위한 트릭
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.emailVerified = existingUser.emailVerified;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" }, //prisma의 db session 전략을 사용하지 않는것은 Edge에서 작동하지 않기때문.
  ...authConfig,
});
