import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/admin-auth";

export async function GET(request: Request) {
  await destroyAdminSession();
  return NextResponse.redirect(new URL("/", request.url));
}
