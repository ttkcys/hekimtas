export const stockImages = {
  advisory: {
    src: "https://images.unsplash.com/photo-1758518728641-8668e601cce1?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=86&w=2200",
    alt: "Finansal raporlar üzerinde çalışan kurumsal danışmanlık ekibi",
    label: "Stratejik finansman",
    source: "https://unsplash.com/photos/four-business-people-talking-in-a-modern-office-lobby-ULh4MH-VxwI",
  },
  industry: {
    src: "https://images.unsplash.com/photo-1777464375799-768774f30542?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=86&w=2200",
    alt: "Modern üretim tesisindeki endüstriyel üretim hattı",
    label: "Yatırım ve üretim",
    source: "https://unsplash.com/photos/industrial-factory-interior-with-machinery-and-equipment-J5DO_DiE3IY",
  },
  trade: {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=86&w=2200",
    alt: "Uluslararası ticaret için limanda sıralanan yük konteynerleri",
    label: "Dış ticaret",
    source: "https://unsplash.com/s/photos/international-trade",
  },
  laboratory: {
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=86&w=1800",
    alt: "Laboratuvarda cam malzemelerle yürütülen bilimsel çalışma",
    label: "İlaç ve medikal",
    source: "https://unsplash.com/s/photos/laboratory",
  },
  agriculture: {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=86&w=1800",
    alt: "Geniş tarım arazileri ve düzenli ekim alanları",
    label: "Tarım ve gıda",
    source: "https://unsplash.com/s/photos/agriculture",
  },
  construction: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=86&w=1800",
    alt: "Kurumsal yatırım ve yapı projelerini temsil eden modern mimari",
    label: "İnşaat ve proje",
    source: "https://unsplash.com/s/photos/construction-business",
  },
  analytics: {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=86&w=1800",
    alt: "Finansal göstergelerin incelendiği dijital analiz ekranı",
    label: "Finansal analiz",
    source: "https://unsplash.com/s/photos/business-analytics",
  },
  meeting: {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=86&w=1800",
    alt: "Masa etrafında proje değerlendiren iş ekibi",
    label: "Karar ve hazırlık",
    source: "https://unsplash.com/s/photos/business-meeting",
  },
} as const;

export type StockImage = (typeof stockImages)[keyof typeof stockImages];

export const stockImageList = [stockImages.advisory, stockImages.industry, stockImages.trade];

export const serviceVisuals = [stockImages.analytics, stockImages.industry, stockImages.trade];

const detailVisuals: Record<string, StockImage> = {
  finance: stockImages.analytics,
  investment: stockImages.industry,
  trade: stockImages.trade,
  pharma: stockImages.laboratory,
  food: stockImages.agriculture,
  medical: stockImages.laboratory,
  chemistry: stockImages.laboratory,
  construction: stockImages.construction,
  agriculture: stockImages.agriculture,
  commerce: stockImages.meeting,
  "foreign-trade": stockImages.trade,
};

export function getDetailVisual(id: string): StockImage {
  return detailVisuals[id] || stockImages.advisory;
}
