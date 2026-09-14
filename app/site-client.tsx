"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { PublicNavigation } from "@/components/public-navigation";
import { blogPosts } from "@/lib/blog-posts";
import { getDetailVisual, serviceVisuals, stockImageList } from "@/lib/stock-images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SectorItem, ServiceItem, SiteContent } from "@/lib/site-content";

type Detail = (ServiceItem | SectorItem) & { kind: "Hizmet" | "Sektör" };

export function SiteClient({ content }: { content: SiteContent }) {
  const services = useMemo(() => content.services.filter((item) => item.active), [content.services]);
  const sectors = useMemo(() => content.sectors.filter((item) => item.active), [content.sectors]);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveService((current) => (current + 1) % Math.max(services.length, 1));
    }, 4200);
    return () => window.clearInterval(timer);
  }, [services.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const openService = (item: ServiceItem) => setDetail({ ...item, kind: "Hizmet" });
  const openSector = (item: SectorItem) => setDetail({ ...item, kind: "Sektör" });

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) || "").trim() || "Belirtilmedi";
    const whatsappNumber = (content.contact.whatsapp || content.contact.phone).replace(/\D/g, "");
    const message = [
      "Merhaba, Hekimtaş Danışmanlık web sitesi üzerinden görüşme talebi oluşturuyorum.",
      "",
      `Ad Soyad: ${value("name")}`,
      `Firma: ${value("company")}`,
      `Telefon: ${value("phone")}`,
      `E-posta: ${value("email")}`,
      `Talep Konusu: ${value("service")}`,
      `İhtiyaç / Mesaj: ${value("message")}`,
    ].join("\n");

    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  return (
    <div className="public-site" style={{ "--brand-primary": content.brand.primaryColor, "--brand-accent": content.brand.accentColor } as React.CSSProperties}>
      <PublicNavigation content={content} home />

      <main id="top">
        <section className="new-hero">
          <div className="hero-gridline" aria-hidden="true" />
          <div className="site-container new-hero__grid">
            <div className="new-hero__copy" data-reveal>
              <p className="section-kicker section-kicker--light">{content.hero.eyebrow}</p>
              <h1>{content.hero.title} <em>{content.hero.accent}</em></h1>
              <p className="new-hero__lead">{content.hero.lead}</p>
              <div className="new-hero__actions">
                <a href="#iletisim" className="cta cta--accent">{content.hero.primaryCta}<ChevronRight size={18} /></a>
                <a href="#hizmetler" className="cta cta--ghost">{content.hero.secondaryCta}</a>
              </div>
              <div className="new-hero__domain"><span>Resmî web adresi</span><strong>{content.brand.domain}</strong></div>
            </div>

            <div className="hero-intelligence" data-reveal>
              <img key={activeService} className="hero-intelligence__image" src={content.hero.imageUrl || stockImageList[activeService % stockImageList.length].src} alt={content.hero.imageUrl ? "Hekimtaş çalışma alanı" : stockImageList[activeService % stockImageList.length].alt} />
              <div className="hero-intelligence__top"><span>Stratejik çalışma alanı</span><span>{String(activeService + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span></div>
              <div className="hero-intelligence__body" key={services[activeService]?.id}>
                <span className="hero-intelligence__number">{services[activeService]?.number}</span>
                <h2>{services[activeService]?.title}</h2>
                <p>{services[activeService]?.short}</p>
                <button onClick={() => services[activeService] && openService(services[activeService])}>Ayrıntıyı incele <ChevronRight size={17} /></button>
              </div>
              <div className="hero-progress">{services.map((item, index) => <button key={item.id} className={index === activeService ? "active" : ""} onClick={() => setActiveService(index)} aria-label={`${item.title} alanını göster`}><span /></button>)}</div>
            </div>
          </div>
          <div className="sector-ticker" aria-label="Çalışılan sektörler"><div>{[...sectors, ...sectors].map((item, index) => <span key={`${item.id}-${index}`}>{item.title}<i>•</i></span>)}</div></div>
        </section>

        <section className="proof-band">
          <div className="site-container proof-grid">
            {content.proof.map((item) => <div key={item.label} data-reveal><strong>{item.value}</strong><span>{item.label}</span></div>)}
          </div>
        </section>

        <section className="editorial-statement">
          <div className="site-container editorial-statement__grid" data-reveal>
            <p className="section-kicker">{content.statement.label}</p>
            <blockquote>{content.statement.quote}</blockquote>
          </div>
        </section>

        <section className="content-section services-section" id="hizmetler">
          <div className="site-container">
            <SectionHeading data={content.servicesIntro} />
            <div className="services-editorial">
              {services.map((item, index) => {
                const visual = serviceVisuals[index % serviceVisuals.length];
                return (
                  <button className="service-card" key={item.id} onClick={() => openService(item)} data-reveal>
                    <div className="service-card__top"><span>{item.number}</span><ChevronRight /></div>
                    <div className="service-card__media"><img src={visual.src} alt={visual.alt} loading="lazy" /><span>{visual.label}</span></div>
                    <h3>{item.title}</h3><p>{item.short}</p>
                    <div className="service-card__line"><span style={{ width: `${38 + index * 22}%` }} /></div>
                    <small>Çalışma kapsamını incele</small>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="content-section sectors-section" id="sektorler">
          <div className="site-container">
            <SectionHeading data={content.sectorsIntro} inverted />
            <div className="sector-directory">
              {sectors.map((item) => (
                <button key={item.id} onClick={() => openSector(item)} data-reveal>
                  <span className="sector-directory__number">{item.number}</span>
                  <span><strong>{item.title}</strong><small>{item.short}</small></span>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section process-section" id="yaklasim">
          <div className="site-container">
            <SectionHeading data={content.processIntro} />
            <div className="process-track">
              {content.process.map((item) => <article key={item.number} data-reveal><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
            </div>
            <p className="disclaimer">{content.footer.disclaimer}</p>
          </div>
        </section>

        <section className="content-section home-journal" id="blog">
          <div className="site-container">
            <SectionHeading data={{ eyebrow: "Hekimtaş Notları", title: "Finansman kararları için sahadan kısa okumalar.", text: "Yatırım hazırlığı, nakit akışı ve dış ticaret süreçlerinde karar öncesi bakılması gereken noktalar." }} />
            <div className="home-journal__grid">
              {blogPosts.slice(0, 3).map((post) => (
                <a className="journal-card" href={`/blog/${post.slug}`} key={post.slug} data-reveal>
                  <div className="journal-card__media"><img src={post.image.src} alt={post.image.alt} loading="lazy" /><span>{post.category}</span></div>
                  <div className="journal-card__body"><small>{post.date} · {post.readingTime}</small><h3>{post.title}</h3><p>{post.excerpt}</p><strong>Yazıyı oku <ChevronRight size={16} /></strong></div>
                </a>
              ))}
            </div>
            <a className="journal-index-link" href="/blog">Tüm yazıları görüntüle <ChevronRight size={17} /></a>
          </div>
        </section>

        <section className="contact-section" id="iletisim">
          <div className="site-container contact-layout">
            <div className="contact-copy" data-reveal>
              <p className="section-kicker section-kicker--light">{content.contact.eyebrow}</p>
              <h2>{content.contact.title}</h2><p>{content.contact.lead}</p>
              <dl>
                <div><dt>Telefon</dt><dd><a href={`tel:${content.contact.phone.replace(/\D/g, "")}`}>{content.contact.phone}</a></dd></div>
                {content.contact.email && <div><dt>E-posta</dt><dd><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></dd></div>}
                <div><dt>Yetkili</dt><dd>{content.contact.official}<small>{content.contact.officialTitle}</small></dd></div>
                <div><dt>Adres</dt><dd>{content.contact.address}</dd></div>
              </dl>
            </div>
            <form className="contact-form" onSubmit={submitInquiry} data-reveal>
              <div className="contact-form__head"><span>WhatsApp Görüşme Talebi</span><strong>İhtiyacınızı kısaca anlatın.</strong><small>Bilgileriniz hazır bir WhatsApp mesajına dönüştürülür.</small></div>
              <div className="form-row"><label>Adınız<input name="name" required /></label><label>Firma adı<input name="company" /></label></div>
              <div className="form-row"><label>Telefon<input name="phone" inputMode="tel" /></label><label>E-posta<input name="email" type="email" /></label></div>
              <label>Talep konusu<select name="service">{services.map((item) => <option key={item.id}>{item.title}</option>)}<option>Diğer</option></select></label>
              <label>Kısaca ihtiyacınız<textarea name="message" rows={4} required /></label>
              <button className="cta cta--accent" type="submit">WhatsApp’tan Gönder<MessageCircle size={18} /></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="new-footer">
        <div className="site-container new-footer__top"><BrandLogo {...content.brand} primary="#ffffff" accent={content.brand.accentColor} /><p>{content.footer.summary}</p></div>
        <div className="site-container new-footer__bottom"><span>© {new Date().getFullYear()} {content.brand.name}</span><div><a href="/hizmetler">Hizmetler</a><a href="/kategoriler">Kategoriler</a><a href="/blog">Blog</a>{content.socials.filter((item) => item.active && item.url).map((item) => <a key={item.id} href={item.url} target="_blank" rel="noreferrer">{item.platform}</a>)}</div></div>
      </footer>

      <Dialog open={Boolean(detail)} onOpenChange={(open) => !open && setDetail(null)}>
        <DialogContent className="detail-modal">
          {detail && (() => {
            const visual = getDetailVisual(detail.id);
            const itemCount = detail.blocks.reduce((total, block) => total + block.items.length, 0);
            return (
              <div className="detail-modal__layout">
                <div className="detail-modal__visual">
                  <img src={visual.src} alt={visual.alt} />
                  <div className="detail-modal__visual-top"><span>Hekimtaş</span><span>{detail.kind}</span></div>
                  <div className="detail-modal__visual-bottom"><strong>{detail.number}</strong><span>{visual.label}</span></div>
                </div>
                <div className="detail-modal__content">
                  <DialogHeader>
                    <span className="detail-modal__label">{detail.kind} / {detail.number}</span>
                    <DialogTitle>{detail.title}</DialogTitle>
                    <DialogDescription>{detail.intro}</DialogDescription>
                  </DialogHeader>
                  <div className="detail-modal__summary"><span>Çalışma kapsamı</span><strong>{itemCount} odak başlığı</strong><small>İhtiyaca göre yeniden planlanır</small></div>
                  <div className={`detail-modal__grid ${detail.blocks.length === 1 ? "detail-modal__grid--single" : ""}`}>
                    {detail.blocks.map((block) => <section key={block.title}><h3>{block.title}</h3><ul>{block.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></section>)}
                  </div>
                  <div className="detail-modal__actions"><a className="cta cta--accent" href="#iletisim" onClick={() => setDetail(null)}>Görüşme Planla<ChevronRight size={18} /></a><a href={detail.kind === "Hizmet" ? `/hizmetler#${detail.id}` : `/kategoriler#${detail.id}`}>Ayrıntılı sayfayı aç <ChevronRight size={16} /></a></div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SectionHeading({ data, inverted = false }: { data: { eyebrow: string; title: string; text: string }; inverted?: boolean }) {
  return <div className={`section-heading-new ${inverted ? "section-heading-new--inverted" : ""}`} data-reveal><p className="section-kicker">{data.eyebrow}</p><div><h2>{data.title}</h2><p>{data.text}</p></div></div>;
}
