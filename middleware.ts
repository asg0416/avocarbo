// middleware은 Edge에서 작동되므로 여기서는 prisma가 작동하지 않음
// 따라서 auth.config.ts 파일로 분리해서 작성하면 해결됨.
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_SIGNIN_REDIRECT,
} from "@/routes";
import createIntlMiddleware from "next-intl/middleware";

import { NextRequest } from "next/server";
import { defaultLocale, locales } from "./i18n";

const { auth } = NextAuth(authConfig);

// 다국어 미들웨어 생성
const intlMiddleware = createIntlMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: "as-needed",
});

const authMiddleware = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isLoggedIn) {
    return intlMiddleware(req); // Apply internationalization for logged-in users
  }

  // Handle different route scenarios
  if (isApiAuthRoute) return; // Don't modify API authentication routes

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect logged-in users from auth routes
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    }
    return; // Don't modify behavior for auth routes
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Redirect unauthorized users to login for non-public routes
    // return Response.redirect(new URL("/auth/login", nextUrl));

    // 로그인이 필요한 주소에 접근하려했던 이력을 남겨서 로그인 후에 해당 페이지로 보내는 작업
    // pathname은 /admin, /settings 같은 경로
    // search는 쿼리 문자열 가져오는 것
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
});

const publicPath = [...publicRoutes, ...authRoutes];
export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPath
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req); // Apply internationalization for public pages
  } else {
    return (authMiddleware as any)(req); // Apply authentication logic for non-public pages
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
