import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <h1>끼니별 식품 교환단위수</h1>
      <Button variant="default" asChild>
        <Link href="/basic-info">계산하기</Link>
      </Button>
    </div>
  );
};

export default Navbar;
