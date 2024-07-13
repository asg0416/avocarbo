import { cn } from "@/lib/utils";
import { Noto_Sans_KR } from "next/font/google";
import Image from "next/image";
import bgImage from "@/public/main-bg.jpeg";
import CreateMealPlanButton from "./(logged-in)/meal-plan/_components/create-meal-plan-button";
import { currentUser } from "@/lib/auth";
import { deleteUnFinishedMealPlanByUserId } from "@/data/meal";
import { toast } from "sonner";

const font = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "600"] });
export const revalidate = 0;

// TODO: 모바일 화면 레이아웃 최적화 하기 (여백, 폰트 사이즈 정도만 수정하고 플레이스 홀더 정리하면 될듯)
// TODO: 다크모드 설정 추가하기
// TODO: 다국어 기능 구현하기
// 현재 페이지 설정 완료안하고 페이지 벗어나는 경우 해당 mealPlan 삭제하기 - 이전 데이터 수정을 위해 뒤로가기하는 경우는 제외해야함. url로 판단하는게 나을듯
export default async function Home() {
  const user = await currentUser();
  if (user?.id) {
    const res = await deleteUnFinishedMealPlanByUserId(user.id);
  }
  
  return (
    <main className="grow relative flex items-center justify-center">
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
        <CreateMealPlanButton />
      </div>
    </main>
  );
}
