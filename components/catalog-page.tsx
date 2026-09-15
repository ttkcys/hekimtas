import type { CSSProperties } from "react";
import { Check, ChevronDown, ChevronRight, Factory, Landmark, Ship } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { PublicNavigation } from "@/components/public-navigation";
import type { SectorItem, ServiceItem, SiteContent } from "@/lib/site-content";
import { serviceVisuals, stockImages } from "@/lib/stock-images";

type CatalogItem = ServiceItem | SectorItem;

const sectorVisuals = [stockImages.laboratory, stockImages.agriculture, stockImages.construction, stockImages.trade];

export function CatalogPage({ content, variant }: { content: SiteContent; variant: "services" | "categories" }) {
  const isServices = variant === "services";
  const items: CatalogItem[] = (isServices ? content.services : content.sectors).filter((item) => item.active);
  const intro = isServices ? content.servicesIntro : content.sectorsIntro;
  const heroVisual = isServices ? stockImages.advisory : stockImages.industry;

  return (
    <div className="public-site catalog-site" style={{ "--brand-primary": content.brand.primaryColor, "--brand-accent": content.brand.accentColor } as CSSProperties}>
      <PublicNavigation content={content} />

      <main>
        <section className="catalog-hero">
          <div className="catalog-hero__copy">
            <div className="catalog-hero__copy-inner">
              <p className="catalog-eyebrow"><span>{isServices ? "Hizmetler" : "Sektörel uzmanlık"}</span><i>{String(items.length).padStart(2, "0")} çalışma alanı</i></p>
              <h1>{isServices ? "Finansman kararından" : "Her sektör için"} <em>{isServices ? "uygulamaya uzanan yol." : "doğru finansman dili."}</em></h1>
              <p>{intro.text} Hekimtaş, karar sürecini yalnızca bir başvuru olarak değil; finansal yapı, yatırım mantığı ve uygulama takvimiyle birlikte ele alır.</p>
              <div className="catalog-hero__actions">
                <a className="cta cta--accent" href="#calisma-alanlari">Alanları incele <ChevronDown size={17} /></a>
                <a className="cta catalog-hero__outline" href="/#iletisim">Ön görüşme planla <ChevronRight size={17} /></a>
              </div>
            </div>
          </div>

          <div className="catalog-hero__media">
            <img src={heroVisual.src} alt={heroVisual.alt} />
            <div className="catalog-hero__shade" />
            <div className="catalog-hero__media-label"><span>Hekimtaş yaklaşımı</span><strong>Veriye dayalı.<br />İşletmeye özel.</strong></div>
            <div className="catalog-hero__signal"><i /> <span>TR + Global finansman perspektifi</span></div>
          </div>
        </section>

        <nav className="catalog-index" aria-label={`${isServices ? "Hizmet" : "Kategori"} içeriği`}>
          <div className="site-container catalog-index__inner">
            <span>Hızlı erişim</span>
            <div>{items.map((item) => <a key={item.id} href={`#${item.id}`}><i>{item.number}</i>{item.title}</a>)}</div>
          </div>
        </nav>

        <section className="catalog-intro" id="calisma-alanlari">
          <div className="site-container catalog-intro__grid">
            <p className="section-kicker">{intro.eyebrow}</p>
            <div>
              <h2>{intro.title}</h2>
              <p>{isServices
                ? "Finansman ihtiyacının belirlenmesinden dosyanın hazırlanmasına, kurum görüşmelerinden işlem takibine kadar her aşama aynı stratejik çerçevede yönetilir."
                : "Sektörün nakit döngüsü, yatırım biçimi ve operasyonel gerçekliği okunmadan doğru bir finansman kurgusu kurulamaz. Çalışmamızı bu nedenle sektörün kendi dinamikleri üzerine inşa ediyoruz."}</p>
            </div>
          </div>
        </section>

        {isServices ? <ServiceStories items={items} /> : <SectorStories items={items} />}

        <section className="catalog-closing">
          <div className="catalog-closing__photo"><img src={stockImages.advisory.src} alt="Kurumsal yatırım danışmanlığı görüşmesi" loading="lazy" /></div>
          <div className="site-container catalog-closing__content">
            <p className="section-kicker section-kicker--light">İlk adım</p>
            <h2>Yatırım hedefinizi birlikte netleştirelim.</h2>
            <p>Kısa bir ön görüşmede ihtiyacınızı, mevcut hazırlık seviyenizi ve izlenebilecek finansman yolunu değerlendirelim.</p>
            <a className="cta cta--accent" href="/#iletisim">Görüşme talebi oluştur <ChevronRight size={18} /></a>
          </div>
        </section>
      </main>

      <footer className="new-footer catalog-footer">
        <div className="site-container new-footer__top"><BrandLogo {...content.brand} primary="#ffffff" accent={content.brand.accentColor} /><p>{content.footer.summary}</p></div>
        <div className="site-container new-footer__bottom"><span>© {new Date().getFullYear()} {content.brand.name}</span><div><a href="/">Ana sayfa</a><a href="/hizmetler">Hizmetler</a><a href="/kategoriler">Kategoriler</a><a href="/hakkimizda">Hakkımızda</a><a href="/blog">Blog</a></div></div>
      </footer>
    </div>
  );
}

function ServiceStories({ items }: { items: CatalogItem[] }) {
  return (
    <section className="catalog-story-list">
      {items.map((item, index) => {
        const visual = serviceVisuals[index % serviceVisuals.length];
        const Icon = index === 0 ? Landmark : index === 1 ? Factory : Ship;
        return (
          <article className={`catalog-story ${index % 2 ? "catalog-story--reverse" : ""}`} id={item.id} key={item.id}>
            <div className="catalog-story__media">
              <img src={visual.src} alt={visual.alt} loading={index === 0 ? "eager" : "lazy"} />
              <div className="catalog-story__media-top"><Icon size={20} /><span>{visual.label}</span></div>
              <strong>{item.number}</strong>
            </div>
            <div className="catalog-story__content">
              <p className="catalog-story__label">Hizmet alanı / {item.number}</p>
              <h2>{item.title}</h2>
              <p className="catalog-story__lead">{item.intro}</p>
              <p className="catalog-story__short">{item.short}</p>
              <div className="catalog-story__blocks">
                {item.blocks.map((block) => <section key={block.title}><h3>{block.title}</h3><ul>{block.items.map((entry) => <li key={entry}><Check size={15} />{entry}</li>)}</ul></section>)}
              </div>
              <a href="/#iletisim">Bu hizmet için görüşelim <ChevronRight size={17} /></a>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function SectorStories({ items }: { items: CatalogItem[] }) {
  return (
    <>
      <section className="catalog-visual-strip" aria-label="Çalışma alanları">
        {sectorVisuals.map((visual, index) => <figure key={visual.label}><img src={visual.src} alt={visual.alt} loading={index ? "lazy" : "eager"} /><figcaption><span>0{index + 1}</span><strong>{visual.label}</strong></figcaption></figure>)}
      </section>
      <section className="catalog-sectors">
        <div className="site-container catalog-sector-grid">
          {items.map((item) => (
            <article className="catalog-sector-card" id={item.id} key={item.id}>
              <div className="catalog-sector-card__head"><span>{item.number}</span><ChevronRight size={19} /></div>
              <h2>{item.title}</h2>
              <p className="catalog-sector-card__short">{item.short}</p>
              <p>{item.intro}</p>
              {item.blocks.map((block) => <section key={block.title}><h3>{block.title}</h3><ul>{block.items.map((entry) => <li key={entry}><Check size={14} />{entry}</li>)}</ul></section>)}
              <a href="/#iletisim">Sektörünüzü konuşalım <ChevronRight size={16} /></a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
