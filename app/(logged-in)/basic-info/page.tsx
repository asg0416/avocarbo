import { BasicInfoForm } from "@/components/\bcalculator/basic-info-form";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";

const BasicInfoPage = () => {
  return (
    <Fragment>
      <Title
        title="기본 정보 입력하기"
        desc="Step 1. 하루 필요 열량 및 비만도 계산을 위해 필요한 기본 정보 입력"
      />
      <CardWrapper>
        <BasicInfoForm/>
      </CardWrapper>
    </Fragment>
  );
};

export default BasicInfoPage;
