import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { mediaAssets } from "@/db/schema";
import { getAdmin } from "@/lib/admin-auth";

const listColumns = {
  id: mediaAssets.id,
  key: mediaAssets.key,
  filename: mediaAssets.filename,
  contentType: mediaAssets.contentType,
  size: mediaAssets.size,
  uploadedBy: mediaAssets.uploadedBy,
  createdAt: mediaAssets.createdAt,
};

export async function GET() {
  const user = await getAdmin();
  if (!user) return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  try {
    const assets = await getDb().select(listColumns).from(mediaAssets).orderBy(desc(mediaAssets.createdAt)).limit(100);
    return Response.json({ assets });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Medya yüklenemedi." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getAdmin();
  if (!user) return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Dosya seçilmedi." }, { status: 400 });
  if (!file.type.startsWith("image/")) return Response.json({ error: "Yalnızca görsel yükleyebilirsiniz." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return Response.json({ error: "Dosya boyutu 8 MB altında olmalıdır." }, { status: 400 });
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const key = `media/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`;
  const data = Buffer.from(await file.arrayBuffer()).toString("base64");
  const [asset] = await getDb()
    .insert(mediaAssets)
    .values({ key, filename: file.name, contentType: file.type, size: file.size, data, uploadedBy: user.email })
    .returning(listColumns);
  return Response.json({ asset: { ...asset, url: `/api/media/file?key=${encodeURIComponent(key)}` } }, { status: 201 });
}

export async function DELETE(request: Request) {
  const user = await getAdmin();
  if (!user) return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));
  if (!id) return Response.json({ error: "Geçersiz medya kaydı." }, { status: 400 });
  const [asset] = await getDb().select({ id: mediaAssets.id }).from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
  if (!asset) return Response.json({ error: "Medya bulunamadı." }, { status: 404 });
  await getDb().delete(mediaAssets).where(eq(mediaAssets.id, id));
  return Response.json({ ok: true });
}
