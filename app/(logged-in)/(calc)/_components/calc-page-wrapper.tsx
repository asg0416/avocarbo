import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";

interface CalcPageWrapperProps {
  children: React.ReactNode;
  title: string;
  desc: string;
}

const CalcPageWrapper = ({ children, title, desc }: CalcPageWrapperProps) => {
  return (
    <Fragment>
      <Title
        title={title}
        desc={desc}
      />
      <CardWrapper>{children}</CardWrapper>
    </Fragment>
  );
};

export default CalcPageWrapper;
