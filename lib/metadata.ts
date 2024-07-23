export async function fetchBaseMetadata({ locale }: { locale: string }) {
  // API 호출이나 설정 파일에서 기본 메타데이터를 가져오는 로직
  // 예시 반환값:
  return {
    title: "Zero Sugar | Home",
    description: "당뇨 임산부를 위한 맞춤 영양 정보와 식품 단위 수 계산 서비스",
    ogTitle: "Zero Sugar | 식품교환 식단 계산기",
    ogDescription:
      "당뇨 임산부를 위한 맞춤 영양 정보와 식품 단위 수 계산 서비스로 건강한 임신 여정을 함께합니다.",
    siteName: "Zero Sugar",
  };
}

export async function fetchPageData({ locale }: { locale: string }) {
  // 언어별 페이지 데이터를 가져오는 로직
  // 예시 반환값:
  return {
    title: "홈페이지",
    description: "Zero Sugar 홈페이지입니다.",
    ogTitle: "Zero Sugar 홈 | 식품교환 식단 계산기",
    ogDescription:
      "당뇨 임산부를 위한 맞춤 영양 정보와 식품 단위 수 계산 서비스를 제공합니다.",
  };
}
