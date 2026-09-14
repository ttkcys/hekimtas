import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sektörler | Hekimtaş Yatırım Danışmanlık",
  description: "İlaç, gıda, medikal, kimya, inşaat, tarım, ticaret ve dış ticaret sektörlerine özel danışmanlık yaklaşımımız.",
};

export default async function CategoriesPage() {
  const content = await getSiteContent();
  return <CatalogPage content={content} variant="categories" />;
}
