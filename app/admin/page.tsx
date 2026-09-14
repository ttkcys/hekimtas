import { requireAdmin } from "@/lib/admin-auth";
import { getRecentRevisions, getSiteContent } from "@/lib/content-store";
import { AdminClient } from "./admin-client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireAdmin("/admin");
  const [content, revisions] = await Promise.all([getSiteContent(), getRecentRevisions()]);
  return <AdminClient initialContent={content} initialRevisions={revisions} user={{ name: user.name, email: user.email }} signOutPath="/api/admin/logout" />;
}
