import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const rawReturnTo = String(form.get("return_to") ?? "/admin");
  const safeReturnTo =
    rawReturnTo.startsWith("/") && !rawReturnTo.startsWith("//") ? rawReturnTo : "/admin";

  if (!verifyAdminPassword(password)) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("return_to", safeReturnTo);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, { status: 303 });
  }

  await createAdminSession();
  return NextResponse.redirect(new URL(safeReturnTo, request.url), { status: 303 });
}
