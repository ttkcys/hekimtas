import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hizmetler | Hekimtaş Yatırım Danışmanlık",
  description: "Kredi ve fon danışmanlığı, yatırım süreci hazırlığı ile ithalat ve ihracat desteği hizmetlerimizi inceleyin.",
};

export default async function ServicesPage() {
  const content = await getSiteContent();
  return <CatalogPage content={content} variant="services" />;
}
