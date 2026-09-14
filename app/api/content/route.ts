import { getAdmin } from "@/lib/admin-auth";
import { getRecentRevisions, getSiteContent, saveSiteContent } from "@/lib/content-store";
import type { SiteContent } from "@/lib/site-content";

export async function GET() {
  const user = await getAdmin();
  if (!user) return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  return Response.json({ content: await getSiteContent(), revisions: await getRecentRevisions() });
}

export async function PUT(request: Request) {
  const user = await getAdmin();
  if (!user) return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  try {
    const content = (await request.json()) as SiteContent;
    if (!content?.brand?.name || !content?.hero?.title || !Array.isArray(content.services) || !Array.isArray(content.sectors)) {
      return Response.json({ error: "İçerik yapısı eksik veya geçersiz." }, { status: 400 });
    }
    await saveSiteContent(content, user.email);
    return Response.json({ ok: true, savedAt: new Date().toISOString() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "İçerik kaydedilemedi.";
    return Response.json({ error: message }, { status: 500 });
  }
}
