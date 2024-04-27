import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

// 관리자만 사용할 수 있는 api route
export async function GET() {
  const role = await currentRole()
  if(role === UserRole.ADMIN){
    return new NextResponse(null, {status: 200})
  }
  return new NextResponse(null,{status: 403})
}