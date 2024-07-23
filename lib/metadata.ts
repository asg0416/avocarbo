import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export async function fetchBaseMetadata({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  // API 호출이나 설정 파일에서 기본 메타데이터를 가져오는 로직
  // 예시 반환값:
  return {
    title: t("home-title"),
    description: t("desc"),
    ogTitle: `Avocarbo | ${t('calc-label')}`,
    ogDescription:
      t("desc"),
    siteName: "Avocarbo",
    keywords: [
      "아보카보",
      "avocarbo",
      "임신성 당뇨",
      "gestational diabetes",
      "당뇨 식단",
      "diabetic diet",
      "혈당 관리",
      "blood glucose management",
      "식품교환 식단",
      "diabetes food exchange",
      "임신 영양",
      "pregnancy nutrition",
      "당뇨 계산기",
      "diabetes calculator",
      "임산부 건강",
      "maternal health",
      "carb counting",
      "GDM",
      "healthy pregnancy diet",
      "당뇨병 관리",
      "diabetes management",
      "임신 중 혈당 조절",
      "blood sugar control during pregnancy",
      "아보카보 당뇨 계산기",
      "avocarbo diabetes calculator",
    ],
  };
}


type PageData = {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  // 추가 필드...
};

export async function generatePageMetadata(
  pageData: PageData | (() => Promise<PageData>),
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;
  const resolvedPageData =
    typeof pageData === "function" ? await pageData() : pageData;

  const openGraph: OpenGraph = {
    ...(parentMetadata.openGraph as OpenGraph),
    title: resolvedPageData.ogTitle || `${resolvedPageData.title} | Zero Sugar`,
    description:
      resolvedPageData.ogDescription || parentMetadata.openGraph?.description,
    url: parentMetadata.openGraph?.url || undefined,
  };

  return {
    title: resolvedPageData.title,
    description: resolvedPageData.description || parentMetadata.description,
    openGraph,
  };
}

export async function fetchPageData({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  // 언어별 페이지 데이터를 가져오는 로직
  // 예시 반환값:
  return {
    title: `${t('learn-more')}`,
    description: t("desc"),
    ogTitle: `${t('learn-more')}`,
    ogDescription: t("desc"),
  };
}
