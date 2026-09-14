import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { mediaAssets } from "@/db/schema";

export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  if (!key || !key.startsWith("media/")) return new Response("Not found", { status: 404 });

  const [asset] = await getDb().select().from(mediaAssets).where(eq(mediaAssets.key, key)).limit(1);
  if (!asset) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(Buffer.from(asset.data, "base64")), {
    headers: {
      "content-type": asset.contentType,
      "content-length": String(asset.size),
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
