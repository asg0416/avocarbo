import { cn } from "@/lib/utils";
import { Noto_Sans_KR } from "next/font/google";
import Image from "next/image";
import bgImage from "@/public/main-bg.jpeg";
import CreateMealPlanButton from "./(logged-in)/meal-plan/_components/create-meal-plan-button";
import { currentUser } from "@/lib/auth";
import { deleteUnFinishedMealPlanByUserId } from "@/data/meal";
import { getTranslations } from "next-intl/server";

const font = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "600"] });
export const revalidate = 0;

// TODO: 교환단위수가 뭔지 설명해주는 메뉴 만들기
// TODO: 사용자들 피드백 받을 수 있는 기능 만들기
export default async function Home() {
  const user = await currentUser();
  const t = await getTranslations("home-page")
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
            "text-5xl font-semibold drop-shadow-md mb-5 text-start leading-normal break-keep",
            font.className
          )}
        >
          {t("title")}
        </h1>
        <p
          className={cn(
            "text-xl text-zinc-900 text-left leading-relaxed  break-keep",
            font.className
          )}
        >
          {t("desc")}
          <br />
          {t("desc-1")}
        </p>
        <CreateMealPlanButton />
      </div>
    </main>
  );
}
