import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "hekimtas_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

export type AdminUser = { name: string; email: string };

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET ortam değişkeni tanımlı değil.");
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function buildSessionToken(): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  return `${expiresAt}.${sign(String(expiresAt))}`;
}

function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expiresAtRaw, signature] = token.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expected = Buffer.from(sign(expiresAtRaw), "hex");
  const received = Buffer.from(signature, "hex");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return false;
  }

  return Number(expiresAtRaw) > Date.now();
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD ortam değişkeni tanımlı değil.");
  }
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(password);
  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function createAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, buildSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getAdmin(): Promise<AdminUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!isValidSessionToken(token)) return null;

  return {
    name: process.env.ADMIN_NAME || "Yönetici",
    email: process.env.ADMIN_EMAIL || "admin@hekimtas.com",
  };
}

export async function requireAdmin(returnTo: string): Promise<AdminUser> {
  const user = await getAdmin();
  if (user) return user;
  redirect(`/admin/login?return_to=${encodeURIComponent(returnTo)}`);
}
