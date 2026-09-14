import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { inquiries } from "@/db/schema";
import { getAdmin } from "@/lib/admin-auth";

export async function GET() {
  const user = await getAdmin();
  if (!user) return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  try {
    const rows = await getDb().select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(250);
    return Response.json({ inquiries: rows });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Talepler yüklenemedi." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;
    const name = body.name?.trim();
    const message = body.message?.trim();
    if (!name || !message) return Response.json({ error: "Ad ve mesaj zorunludur." }, { status: 400 });
    const [record] = await getDb().insert(inquiries).values({
      name,
      company: body.company?.trim() ?? "",
      phone: body.phone?.trim() ?? "",
      email: body.email?.trim() ?? "",
      service: body.service?.trim() || "Diğer",
      message,
    }).returning({ id: inquiries.id });
    return Response.json({ ok: true, id: record.id }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Talep kaydedilemedi." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await getAdmin();
  if (!user) return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  const body = (await request.json()) as { id?: number; status?: string };
  if (!body.id || !["new", "contacted", "closed"].includes(body.status ?? "")) return Response.json({ error: "Geçersiz durum." }, { status: 400 });
  await getDb().update(inquiries).set({ status: body.status! }).where(eq(inquiries.id, body.id));
  return Response.json({ ok: true });
}
