import { SigninButton } from "@/components/auth/signin-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Noto_Sans_KR } from "next/font/google";
import Image from "next/image";
import bgImage from "@/public/main-bg.jpeg";

const font = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "600"] });
export const revalidate = 0;

export default function Home() {
  
  return (
    <main className="h-full relative">
      <Image
        src={bgImage}
        alt="bg-img"
        fill
        className="-z-50 bg-custom-gradient-blue -scale-x-100 opacity-80 object-cover object-center"
      />
      <div className="flex flex-col justify-start pt-44 items-start pl-10 space-y-6 text-center h-full pb-40">
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
        <SigninButton asChild>
          <Button variant="mainBtn" className="rounded-full mt-10" size="xl">
            시작하기
          </Button>
        </SigninButton>
      </div>
    </main>
  );
}
