import { stockImages, type StockImage } from "@/lib/stock-images";

export type BlogSection = {
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  image: StockImage;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "yatirim-dosyasi-nasil-hazirlanir",
    category: "Yatırım hazırlığı",
    title: "Güçlü bir yatırım dosyası nasıl hazırlanır?",
    excerpt: "Karar vericinin aradığı finansal bütünlüğü, yatırım gerekçesini ve uygulama planını aynı dosyada buluşturmanın temel adımları.",
    date: "12 Eylül 2026",
    readingTime: "6 dk okuma",
    image: stockImages.meeting,
    sections: [
      {
        title: "Dosya, rakam listesinden fazlasıdır",
        paragraphs: [
          "Yatırım dosyası; neyin, neden, hangi kaynakla ve hangi zaman planında yapılacağını açık biçimde anlatmalıdır. Finansal tablolar bu anlatının temelidir ancak tek başına yeterli değildir.",
          "İhtiyacın gerekçesi ile talep edilen finansmanın kullanım alanı arasında görünür bir bağ kurulması, değerlendirme sürecini kolaylaştırır.",
        ],
      },
      {
        title: "Hazırlıkta kontrol edilmesi gerekenler",
        paragraphs: ["Başvuru öncesi hazırlık, bilgi ve belgelerin aynı senaryoyu anlattığından emin olmakla başlar."],
        points: ["Yatırım amacı ve kapsamı", "Bütçe ile finansman kaynağının uyumu", "Nakit akışı ve geri ödeme kapasitesi", "Uygulama takvimi ve sorumlular"],
      },
      {
        title: "Karar vericinin perspektifi",
        paragraphs: ["Dosyanın dili teknik doğruluk kadar açıklık da taşımalıdır. Varsayımlar, riskler ve alternatif senaryolar saklanmadan; yönetilebilir bir çerçevede sunulmalıdır."],
      },
    ],
  },
  {
    slug: "isletme-sermayesi-ihtiyaci",
    category: "Finansman",
    title: "İşletme sermayesi ihtiyacını doğru okumak",
    excerpt: "Stok, alacak ve ödeme vadelerinin finansman ihtiyacını nasıl şekillendirdiğini anlamak için pratik bir çerçeve.",
    date: "8 Eylül 2026",
    readingTime: "5 dk okuma",
    image: stockImages.analytics,
    sections: [
      {
        title: "Nakit döngüsünü görünür kılın",
        paragraphs: ["İşletme sermayesi ihtiyacı yalnızca aylık gider toplamı değildir. Stokta bekleme süresi, müşteriye tanınan vade ve tedarikçi ödeme koşulları birlikte değerlendirilmelidir."],
        points: ["Stok devir süresi", "Ticari alacakların tahsil süresi", "Tedarikçi ödeme vadeleri", "Mevsimsel satış değişimleri"],
      },
      {
        title: "Finansman vadesi ile kullanım amacı",
        paragraphs: ["Kısa vadeli ve sürekli tekrar eden ihtiyaçların, uzun vadeli yatırım harcamalarından ayrılması gerekir. Doğru vade yapısı, nakit akışındaki baskıyı azaltır ve finansman maliyetinin daha sağlıklı izlenmesini sağlar."],
      },
    ],
  },
  {
    slug: "ihracat-finansmani-hazirlik",
    category: "Dış ticaret",
    title: "İhracat finansmanında hazırlık kontrol listesi",
    excerpt: "Siparişten tahsilata kadar işlem akışını, belge setini ve finansman ihtiyacını birlikte planlamak için kontrol noktaları.",
    date: "2 Eylül 2026",
    readingTime: "7 dk okuma",
    image: stockImages.trade,
    sections: [
      {
        title: "İşlemi uçtan uca ele alın",
        paragraphs: ["İhracat finansmanı, yalnızca sevkiyat tarihindeki nakit ihtiyacından ibaret değildir. Üretim veya tedarik başlangıcından tahsilat gününe kadar oluşan kaynak gereksinimi birlikte hesaplanmalıdır."],
      },
      {
        title: "Başlıca hazırlık alanları",
        paragraphs: ["Her işlemde ürün, ülke, para birimi ve ödeme şekline göre farklılaşan bir risk profili bulunur."],
        points: ["Teklif, sipariş ve sözleşme uyumu", "Teslim ve ödeme şekli", "Kur ve tahsilat riski", "Belge akışı ve operasyon takvimi"],
      },
      {
        title: "Alternatif senaryolar",
        paragraphs: ["Sevkiyat veya tahsilat tarihindeki olası değişimler için alternatif nakit akışı senaryoları hazırlanması, işlem sırasında alınacak kararları hızlandırır."],
      },
    ],
  },
  {
    slug: "sanayi-yatirimlarinda-kapasite-planlama",
    category: "Sanayi yatırımları",
    title: "Kapasite yatırımında finansman ve takvim dengesi",
    excerpt: "Makine, tesis ve devreye alma giderlerini tek yatırım takviminde birleştirirken dikkat edilmesi gereken başlıklar.",
    date: "28 Ağustos 2026",
    readingTime: "6 dk okuma",
    image: stockImages.industry,
    sections: [
      {
        title: "Toplam yatırım maliyetini tanımlayın",
        paragraphs: ["Makine bedeli yatırımın görünen kısmıdır. Nakliye, montaj, altyapı, devreye alma, eğitim ve ilk işletme sermayesi gibi kalemler toplam ihtiyaca dahil edilmelidir."],
      },
      {
        title: "Zamanlama neden belirleyicidir?",
        paragraphs: ["Ödeme planı ile finansmanın kullandırım takvimi arasında uyumsuzluk oluşması projeyi daha başlamadan zorlayabilir."],
        points: ["Tedarikçi avansları", "Ara ödeme ve teslim koşulları", "Montaj ve devreye alma dönemi", "Gelir üretmeye başlangıç tarihi"],
      },
    ],
  },
  {
    slug: "tarim-yatirimlarinda-nakit-akisi",
    category: "Tarım",
    title: "Tarım yatırımlarında mevsimsel nakit akışı",
    excerpt: "Üretim dönemi, hasat, stok ve satış vadelerini aynı modelde ele alarak finansman ihtiyacını gerçekçi kurmak.",
    date: "21 Ağustos 2026",
    readingTime: "5 dk okuma",
    image: stockImages.agriculture,
    sections: [
      {
        title: "Takvim, finansman modelinin merkezindedir",
        paragraphs: ["Tarım işletmelerinde giderler ve gelirler yıl içine eşit dağılmaz. Üretim döngüsüne göre hazırlanan aylık nakit akışı, finansman tutarı kadar vadesinin de doğru belirlenmesini sağlar."],
      },
      {
        title: "Modelde yer alması gerekenler",
        paragraphs: ["Ürün ve işletme yapısına göre değişmekle birlikte temel kontrol alanları benzerdir."],
        points: ["Girdi alım dönemleri", "Ekipman ve bakım harcamaları", "Hasat ve depolama maliyetleri", "Satış ile tahsilat takvimi"],
      },
    ],
  },
  {
    slug: "sektorel-riskleri-dosyaya-yansitmak",
    category: "Risk yönetimi",
    title: "Sektörel riskleri yatırım dosyasına yansıtmak",
    excerpt: "Riskleri saklamak yerine ölçülebilir varsayımlar ve uygulanabilir önlemlerle anlatmanın dosyaya kattığı güven.",
    date: "14 Ağustos 2026",
    readingTime: "6 dk okuma",
    image: stockImages.construction,
    sections: [
      {
        title: "Risk, dosyanın zayıflığı değildir",
        paragraphs: ["Her yatırımın pazar, maliyet, zamanlama ve uygulama riski vardır. Güçlü dosya bu riskleri yok saymaz; etkisini, olasılığını ve alınabilecek önlemleri açıklar."],
      },
      {
        title: "Senaryoları somutlaştırın",
        paragraphs: ["Tek bir iyimser tahmin yerine temel, olumlu ve ihtiyatlı senaryolar oluşturmak; kararın hangi koşullarda sürdürülebilir olduğunu gösterir."],
        points: ["Satış hacmindeki değişim", "Girdi maliyeti ve kur etkisi", "Yatırım takvimindeki gecikme", "Finansman maliyetindeki değişim"],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
