import path from "path";
import fs from "fs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAIL_FROM = "501taylor@501taylor.shop";
const domain = process.env.NEXT_PUBLIC_API_URL;

async function renderTemplate(
  templateName: string,
  data: Record<string, string>,
  t: any
): Promise<string> {
  const templatePath = path.join(
    process.cwd(),
    "lib",
    "email-templates",
    `${templateName}.html`
  );
  let template = fs.readFileSync(templatePath, "utf-8");

  // 번역된 텍스트 삽입
  template = template.replace(/{{([^}]+)}}/g, (match, key) => {
    return t(key) === "MISSING_MESSAGE" ? match : t(key);
  });

  // 동적 데이터 삽입
  Object.entries(data).forEach(([key, value]) => {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
  });

  return template;
}

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
  t: any
) => {
  const html = await renderTemplate("two-factor", { token }, t);
  await resend.emails.send({
    from: MAIL_FROM, //이메일 보내는 사람 이름`으로 사용됨
    to: email, // 보낼 곳. 개발주소로는 Resend 본인 계정에만 보내짐. 도메인 있어야 실제사용가능
    subject: t("subject"), // 이메일 제목
    html: html, // 본문내용
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  t: any
) => {
  // 이메일 인증을 위한 우리 서비스 페이지로 리다이렉트 시키기 위한 주소로 회원가입시 생성한 인증확인용 토큰을 가지고 있어야함.
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const html = await renderTemplate("password-reset", { resetLink }, t);

  await resend.emails.send({
    from: MAIL_FROM, //이메일 보내는 사람 이름`으로 사용됨
    to: email, // 보낼 곳. 개발주소로는 Resend 본인 계정에만 보내짐. 도메인 있어야 실제사용가능
    subject: t("subject"), // 이메일 제목
    html: html, // 본문내용
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  t: any
) => {
  // 이메일 인증을 위한 우리 서비스 페이지로 리다이렉트 시키기 위한 주소로 회원가입시 생성한 인증확인용 토큰을 가지고 있어야함.
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const html = await renderTemplate("email-verification", { confirmLink }, t);

  await resend.emails.send({
    from: MAIL_FROM, //이메일 보내는 사람 이름`으로 사용됨
    to: email, // 보낼 곳. 개발주소로는 Resend 본인 계정에만 보내짐. 도메인 있어야 실제사용가능
    subject: t("subject"), // 이메일 제목
    html: html, // 본문내용
  });
};
``;
