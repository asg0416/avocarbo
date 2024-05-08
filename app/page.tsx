import { SigninButton } from "@/components/auth/signin-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Noto_Sans_KR } from "next/font/google";
import Image from "next/image";
import bgImage from "@/public/main-bg.jpeg";
import Link from "next/link";

const font = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "600"] });
export const revalidate = 0;

export default function Home() {
  return (
    <main className="h-full relative flex items-center justify-center">
      <Image
        src={bgImage}
        alt="bg-img"
        fill
        className="-z-50 bg-custom-gradient-blue -scale-x-100 opacity-80 object-cover object-center"
      />
      <div className=" h-full w-full flex flex-col items-start justify-start space-y-6 text-center max-w-screen-xl p-8 pt-16">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md mb-5",
            font.className
          )}
        >
          식품교환표를 이용한 식단 계산기
        </h1>
        <p
          className={cn(
            "text-2xl text-zinc-900 text-left leading-relaxed",
            font.className
          )}
        >
          당뇨 임산부를 위한 맞춤 영양 정보와 <br />
          식품단위수 계산 서비스로 건강한 임신 여정을 함께합니다.
        </p>
        <Button variant="mainBtn" className="rounded-full mt-10" size="xl">
          <Link href="/meal-plan">시작하기</Link>
        </Button>
      </div>
    </main>
  );
}
