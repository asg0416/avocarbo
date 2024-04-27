import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAIL_FROM = "501taylor@501taylor.shop";
const domain = process.env.NEXT_PUBLIC_API_URL;

export const sendTwoFactorTokenEmail = async (email:string, token: string) => {
  await resend.emails.send({
    from: MAIL_FROM, //이메일 보내는 사람 이름`으로 사용됨
    to: email, // 보낼 곳. 개발주소로는 Resend 본인 계정에만 보내짐. 도메인 있어야 실제사용가능
    subject: "2FA Code", // 이메일 제목
    html: `<p>Your 2FA code: ${token}</p>`, // 본문내용
  });
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  // 이메일 인증을 위한 우리 서비스 페이지로 리다이렉트 시키기 위한 주소로 회원가입시 생성한 인증확인용 토큰을 가지고 있어야함.
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: MAIL_FROM, //이메일 보내는 사람 이름`으로 사용됨
    to: email, // 보낼 곳. 개발주소로는 Resend 본인 계정에만 보내짐. 도메인 있어야 실제사용가능
    subject: "Reset your password", // 이메일 제목
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`, // 본문내용
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  // 이메일 인증을 위한 우리 서비스 페이지로 리다이렉트 시키기 위한 주소로 회원가입시 생성한 인증확인용 토큰을 가지고 있어야함.
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: MAIL_FROM, //이메일 보내는 사람 이름`으로 사용됨
    to: email, // 보낼 곳. 개발주소로는 Resend 본인 계정에만 보내짐. 도메인 있어야 실제사용가능
    subject: "Confirm your email", // 이메일 제목
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`, // 본문내용
  });
};
``