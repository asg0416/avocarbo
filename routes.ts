// Middleware auth에서 사용될 경로 설정

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * 로그인 O, X 사용자 모두 접근 가능
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/auth/new-verification", // 로그인한 사용자도 이메일을 바꿀 수 있어서 로그인 상태에서도 이메일 인증 페이지에 접근가능해야함
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * 로그인 X 사용자만 접근 가능, 로그인 O 사용자는 /settings 페이지로 리다이렉션
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/signin",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT = "/settings";

/**
 * Auth.js의 이메일 중복인 oAuth 로그인 에러 코드 판별 상수
 * @type {string}
 */
export const AUTH_ACCOUNT_ERROR_CODE = "OAuthAccountNotLinked";
