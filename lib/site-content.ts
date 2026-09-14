export type DetailBlock = { title: string; items: string[] };

export type ServiceItem = {
  id: string;
  number: string;
  title: string;
  short: string;
  intro: string;
  active: boolean;
  blocks: DetailBlock[];
};

export type SectorItem = {
  id: string;
  number: string;
  title: string;
  short: string;
  intro: string;
  active: boolean;
  blocks: DetailBlock[];
};

export type SiteContent = {
  brand: {
    name: string;
    descriptor: string;
    domain: string;
    primaryColor: string;
    accentColor: string;
    logoUrl: string;
  };
  topbar: { text: string; location: string };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    imageUrl: string;
  };
  proof: Array<{ value: string; label: string }>;
  statement: { label: string; quote: string };
  servicesIntro: { eyebrow: string; title: string; text: string };
  services: ServiceItem[];
  sectorsIntro: { eyebrow: string; title: string; text: string };
  sectors: SectorItem[];
  processIntro: { eyebrow: string; title: string; text: string };
  process: Array<{ number: string; title: string; text: string }>;
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    phone: string;
    whatsapp: string;
    email: string;
    official: string;
    officialTitle: string;
    address: string;
  };
  socials: Array<{ id: string; platform: string; url: string; active: boolean }>;
  footer: { summary: string; disclaimer: string };
  seo: { title: string; description: string; keywords: string };
};

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "HEKİMTAŞ",
    descriptor: "DANIŞMANLIK",
    domain: "hekimtasdanismanlik.com.tr",
    primaryColor: "#0a2037",
    accentColor: "#13a7a0",
    logoUrl: "",
  },
  topbar: {
    text: "Kurumsal yatırım, finansman ve dış ticaret danışmanlığı",
    location: "Nilüfer · Bursa",
  },
  hero: {
    eyebrow: "Yatırım ve Finansman Danışmanlığı",
    title: "İşletmeniz için doğru finansman",
    accent: "yolunu birlikte kuruyoruz.",
    lead: "Yurt içi ve yurt dışı kredi, fon ve yatırım olanaklarına erişim sürecinizi; işletmenizin yapısına ve sektörüne göre planlıyoruz.",
    primaryCta: "Ön Görüşme Planla",
    secondaryCta: "Hizmetleri İncele",
    imageUrl: "",
  },
  proof: [
    { value: "03", label: "Ana uzmanlık alanı" },
    { value: "08", label: "Sektörel çalışma alanı" },
    { value: "360°", label: "Dosya ve süreç yaklaşımı" },
    { value: "TR + Global", label: "Finansman perspektifi" },
  ],
  statement: {
    label: "Hekimtaş yaklaşımı",
    quote: "Güçlü bir finansman dosyası yalnızca rakamları değil; yatırımın mantığını, ihtiyacın gerekçesini ve uygulanabilir yol haritasını birlikte anlatır.",
  },
  servicesIntro: {
    eyebrow: "Çalışma Alanlarımız",
    title: "Karar öncesinden uygulama sonrasına kadar bütünlüklü danışmanlık.",
    text: "Her çalışma, işletmenin ölçeğine, sektörüne ve gerçek ihtiyacına göre yeniden kurgulanır.",
  },
  services: [
    {
      id: "finance",
      number: "01",
      title: "Kredi ve Fon Danışmanlığı",
      short: "Finansman alternatifleri, dosya hazırlığı ve başvuru sürecinin koordinasyonu.",
      intro: "İşletmenin ihtiyacını ve mevcut yapısını analiz ederek uygun finansman alternatiflerine hazırlanmasına destek oluyoruz.",
      active: true,
      blocks: [
        { title: "İhtiyaç analizi", items: ["Tutar ve vade yapısı", "Nakit akışı ve kullanım amacı", "Mevcut finansal görünüm"] },
        { title: "Dosya hazırlığı", items: ["Belge ve veri kontrolü", "Başvuru sunumu", "Alternatif finansman karşılaştırması"] },
        { title: "Süreç takibi", items: ["Görüşme hazırlığı", "Eksiklerin tamamlanması", "Başvuru adımlarının koordinasyonu"] },
      ],
    },
    {
      id: "investment",
      number: "02",
      title: "Yatırım Süreci Hazırlığı",
      short: "Yatırım fikrinin ölçülebilir, sunulabilir ve uygulanabilir bir projeye dönüştürülmesi.",
      intro: "Yatırım fikrini amacı, bütçesi, geri dönüş modeli ve finansman ihtiyacı anlaşılır bir proje dosyasına dönüştürüyoruz.",
      active: true,
      blocks: [
        { title: "Strateji", items: ["Yatırım hedefi", "Kapasite ve kaynak ihtiyacı", "Proje takvimi"] },
        { title: "Modelleme", items: ["Bütçe yapısı", "Kullanım planı", "Temel senaryolar"] },
        { title: "Sunum", items: ["Yönetici özeti", "Karar verici sunumu", "Görüşme öncesi dosya kontrolü"] },
      ],
    },
    {
      id: "trade",
      number: "03",
      title: "İthalat ve İhracat Desteği",
      short: "Dış ticaret finansmanı, işlem hazırlığı, evrak akışı ve operasyon koordinasyonu.",
      intro: "İthalat ve ihracat işlemlerinde finansman ihtiyacını, işlem akışını ve hazırlık adımlarını birlikte planlıyoruz.",
      active: true,
      blocks: [
        { title: "İthalat", items: ["Tedarik ve ödeme planı", "Finansman ihtiyacı", "İşlem evrakları"] },
        { title: "İhracat", items: ["Satış ve tahsilat yapısı", "Hedef pazar yaklaşımı", "İhracat finansmanı"] },
        { title: "Koordinasyon", items: ["Paydaş iletişimi", "Evrak kontrolü", "İşlem takvimi"] },
      ],
    },
  ],
  sectorsIntro: {
    eyebrow: "Sektörel Deneyim",
    title: "Her sektörün nakit döngüsü, riski ve yatırım dili farklıdır.",
    text: "Hazırlık sürecini sektörün gerçek çalışma düzenine göre şekillendiriyoruz.",
  },
  sectors: [
    { id: "pharma", number: "01", title: "İlaç", short: "İnsan, hayvan sağlığı ve tarım ürünleri", intro: "Üretici, dağıtıcı ve yatırımcıların kapasite, stok ve tesis finansmanı ihtiyaçlarına odaklanıyoruz.", active: true, blocks: [{ title: "Çalışma alanları", items: ["Üretim ve kapasite", "Laboratuvar ve tesis", "Stok ve işletme sermayesi"] }] },
    { id: "food", number: "02", title: "Gıda", short: "Üretim, perakende ve yeme-içme", intro: "Üretimden perakendeye uzanan gıda işletmelerinin şubeleşme, ekipman ve büyüme ihtiyaçlarını değerlendiriyoruz.", active: true, blocks: [{ title: "Çalışma alanları", items: ["Üretim ekipmanları", "Yeni şube", "Stok ve tedarik"] }] },
    { id: "medical", number: "03", title: "Medikal", short: "Üretici, tedarikçi ve medikal marketler", intro: "Medikal ürün ekosistemindeki işletmelerin yatırım ve işletme sermayesi ihtiyaçlarını ele alıyoruz.", active: true, blocks: [{ title: "Çalışma alanları", items: ["Cihaz ve üretim hattı", "Dağıtım", "Stok finansmanı"] }] },
    { id: "chemistry", number: "04", title: "Kimya", short: "Evsel ve endüstriyel imalat", intro: "Kimya alanında üretim ve ticaret yapan işletmeler için yatırım hazırlığı sunuyoruz.", active: true, blocks: [{ title: "Çalışma alanları", items: ["Hammadde", "Kapasite artışı", "Tesis ve depolama"] }] },
    { id: "construction", number: "05", title: "İnşaat", short: "Konut, altyapı ve üstyapı", intro: "Projelerin yatırım ve finansman gereksinimlerini kapsam, bütçe ve takvim bazında değerlendiriyoruz.", active: true, blocks: [{ title: "Çalışma alanları", items: ["Proje bütçesi", "Hakediş ve nakit akışı", "Finansman takvimi"] }] },
    { id: "agriculture", number: "06", title: "Tarım", short: "Modern tarım ve hayvancılık", intro: "Modern tarım ve hayvancılık yatırımlarının kurulum ve büyüme ihtiyaçlarına yönelik çalışma yapıyoruz.", active: true, blocks: [{ title: "Çalışma alanları", items: ["Tesis ve teknoloji", "Ekipman", "İşletme sermayesi"] }] },
    { id: "commerce", number: "07", title: "Ticaret", short: "Perakende ve toptan faaliyetler", intro: "Ticaret işletmelerinin büyüme, şubeleşme, stok ve tedarik ihtiyaçlarını değerlendiriyoruz.", active: true, blocks: [{ title: "Çalışma alanları", items: ["Yeni şube", "Stok yönetimi", "Nakit döngüsü"] }] },
    { id: "foreign-trade", number: "08", title: "Dış Ticaret", short: "İthalat ve ihracat işlemleri", intro: "Dış ticaret yapan işletmelerin ürün, pazar, ödeme ve finansman yapısını işlem özelinde ele alıyoruz.", active: true, blocks: [{ title: "Çalışma alanları", items: ["Tedarik ve satış", "Ödeme ve tahsilat", "Operasyon takvimi"] }] },
  ],
  processIntro: {
    eyebrow: "Çalışma Modeli",
    title: "Belirsizliği azaltan, ilerlemeyi görünür kılan dört aşama.",
    text: "Her adımda neyin hazırlanacağı, kiminle ilerleyeceği ve sonraki kararın ne olduğu açıktır.",
  },
  process: [
    { number: "01", title: "Tanı", text: "İhtiyaç, hedef, mevcut yapı ve zaman planı birlikte değerlendirilir." },
    { number: "02", title: "Strateji", text: "Uygun finansman ve uygulama seçenekleri karşılaştırılır." },
    { number: "03", title: "Hazırlık", text: "Dosya, belgeler ve karar vericiye uygun anlatı tamamlanır." },
    { number: "04", title: "Takip", text: "Görüşme, başvuru ve eksik tamamlama adımları izlenir." },
  ],
  contact: {
    eyebrow: "İlk Görüşme",
    title: "Yatırım hedefinizi birlikte netleştirelim.",
    lead: "Kısa bir ön görüşmede ihtiyacınızı, mevcut hazırlık seviyenizi ve izlenebilecek yolu belirleyelim.",
    phone: "0534 298 67 06",
    whatsapp: "905342986706",
    email: "",
    official: "Osman Ataman",
    officialTitle: "Yönetim Kurulu Başkanı",
    address: "İhsaniye Mah. Cami Sk. Adem Erkal İş Merkezi No: 48, Kat: 1, D: 2, Nilüfer / Bursa",
  },
  socials: [
    { id: "linkedin", platform: "LinkedIn", url: "", active: false },
    { id: "instagram", platform: "Instagram", url: "", active: false },
    { id: "facebook", platform: "Facebook", url: "", active: false },
    { id: "x", platform: "X", url: "", active: false },
  ],
  footer: {
    summary: "Yatırım, finansman ve dış ticaret süreçlerinde işletmeye özel danışmanlık.",
    disclaimer: "Hekimtaş Yatırım Danışmanlık danışmanlık hizmeti sunar. Kredi tahsisi, fon onayı veya yatırım getirisi garantisi vermez; her dosya ilgili kurumların değerlendirme koşullarına tabidir.",
  },
  seo: {
    title: "Hekimtaş Yatırım Danışmanlık | Bursa",
    description: "İşletmelere finansman, yatırım hazırlığı ve ithalat-ihracat süreçlerinde kurumsal danışmanlık desteği.",
    keywords: "yatırım danışmanlığı, finansman danışmanlığı, kredi ve fon danışmanlığı, ihracat danışmanlığı, Bursa",
  },
};

export function cloneDefaultContent(): SiteContent {
  return JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent;
}
