import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { contentRevisions, siteContent } from "@/db/schema";
import { cloneDefaultContent, type SiteContent } from "@/lib/site-content";

const CONTENT_KEY = "site";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const db = getDb();
    const row = await db.query.siteContent.findFirst({ where: eq(siteContent.key, CONTENT_KEY) });
    if (!row) return cloneDefaultContent();
    return JSON.parse(row.value) as SiteContent;
  } catch {
    return cloneDefaultContent();
  }
}

export async function saveSiteContent(content: SiteContent, author: string) {
  const db = getDb();
  const value = JSON.stringify(content);
  await db.transaction(async (tx) => {
    await tx.insert(siteContent).values({ key: CONTENT_KEY, value, updatedBy: author }).onConflictDoUpdate({
      target: siteContent.key,
      set: { value, updatedBy: author, updatedAt: new Date().toISOString() },
    });
    await tx.insert(contentRevisions).values({ key: CONTENT_KEY, value, author });
  });
}

export async function getRecentRevisions(limit = 10) {
  try {
    const db = getDb();
    return await db.select({ id: contentRevisions.id, author: contentRevisions.author, createdAt: contentRevisions.createdAt })
      .from(contentRevisions)
      .where(eq(contentRevisions.key, CONTENT_KEY))
      .orderBy(desc(contentRevisions.createdAt))
      .limit(limit);
  } catch {
    return [];
  }
}
