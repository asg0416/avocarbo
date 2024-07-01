"use client";

import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import MealUnitForm from "@/components/\bcalculator/meal-unit-form";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";

// TODO: 끼니별 식품교환 단위수 설정 페이지 만들기
// TODO: 이 페이지가 처음 mealPlan 페이지에서 단위수 식단 카드 눌렀을 때 들어오는 상세페이지가 될지 아니면 그 상세페이지는 새로 만들기 생각하기.
const MealUnitPage = () => {
  return (
    <Fragment>
      <Title
        title="Step 4. 끼니별 식품군 단위수 설정하기"
        desc="하루 식품 교환 단위수를 설정합니다."
      />
      <CardWrapper className="flex w-full">
        <MealUnitForm />
      </CardWrapper>
    </Fragment>
  );
};

export default MealUnitPage;
