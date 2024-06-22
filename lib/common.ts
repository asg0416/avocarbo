interface CalcFunction {
  (values: any, mealPlanId: string, id?: string, newKcal?: string): Promise<
    | {
        error?: string;
        ok?: boolean;
      }
    | undefined
  >;
}

/**
 * 폼 제출을 처리하고, 계산을 수행하며 성공 시 새로운 페이지로 이동합니다.
 *
 * @param values - 제출할 폼 값들.
 * @param verifiedMealPlanId - 검증된 식단 계획 ID.
 * @param setError - 에러 메시지를 설정하는 함수.
 * @param calcFunction - 실행할 계산 함수. 예: calcBasicInfo 또는 calcNutrientRatio.
 * @param redirectUrl - 제출 성공 후 이동할 URL.
 * @param push - 네비게이션을 위한 라우터 푸시 함수.
 * @param optionalData - calcFunction에 필요한 추가 데이터, 예를 들어 id와 newKcal.
 */
export const handleFormSubmit = async (
  values: any,
  verifiedMealPlanId: string,
  setError: (error: string) => void,
  calcFunction: CalcFunction,
  redirectUrl: string,
  push: (url: string) => void,
  optionalData?: { id?: string; newKcal?: string }
) => {
  const { id, newKcal } = optionalData || {};

  try {
    const data = await calcFunction(values, verifiedMealPlanId, id, newKcal);

    if (data?.error) {
      setError(data?.error);
    }

    if (data?.ok) {
      push(`${redirectUrl}?mealPlanId=${verifiedMealPlanId}`);
    }
  } catch (error) {
    setError("An unexpected error occurred");
  }
};
