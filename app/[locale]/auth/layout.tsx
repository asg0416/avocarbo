import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const AuthLayout = async({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  console.log("사용자 정보 ::", user);

  if(user){
    return redirect("/")
  }
  
  return (
    <div className="h-auto w-full flex items-center justify-center bg-custom-gradient-blue">{children}</div>
  );
};

export default AuthLayout;
