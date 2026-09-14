import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content-store";
import { SiteClient } from "./site-client";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords.split(",").map((item) => item.trim()).filter(Boolean),
  };
}

export default async function Home() {
  const content = await getSiteContent();
  return <SiteClient content={content} />;
}
