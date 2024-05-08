import { SigninForm } from "@/components/auth/signin-form";
import { getSearchParams } from "@/data/searchParams";

const SigninPage = () => {
  const params = getSearchParams()
  return ( <SigninForm/> );
}
 
export default SigninPage;