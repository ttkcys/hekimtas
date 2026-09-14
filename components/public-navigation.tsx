"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import type { SiteContent } from "@/lib/site-content";

export function PublicNavigation({ content, home = false }: { content: SiteContent; home?: boolean }) {
  const services = useMemo(() => content.services.filter((item) => item.active), [content.services]);
  const sectors = useMemo(() => content.sectors.filter((item) => item.active), [content.sectors]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"services" | "categories" | null>(null);

  return (
    <>
      <div className="topline">
        <div className="site-container topline__inner"><span>{content.topbar.text}</span><span>{content.topbar.location}</span></div>
      </div>

      <header className="public-header">
        <div className="site-container public-header__inner">
          <a href={home ? "#top" : "/"} className="logo-link" aria-label={`${content.brand.name} ana sayfa`}>
            {content.brand.logoUrl ? <img src={content.brand.logoUrl} alt={`${content.brand.name} logosu`} /> : <BrandLogo {...content.brand} primary={content.brand.primaryColor} accent={content.brand.accentColor} />}
          </a>
          <nav className="desktop-nav" aria-label="Ana menü">
            <div className="mega-trigger">
              <a className="mega-trigger__link" href="/hizmetler">Hizmetler <ChevronDown size={15} /></a>
              <div className="mega-menu mega-menu--services">
                <div className="mega-menu__intro"><span>Çalışma alanları</span><strong>Finansman kararını uygulanabilir bir plana dönüştürün.</strong></div>
                <div className="mega-menu__links">
                  {services.map((item) => <a key={item.id} href={`/hizmetler#${item.id}`}><span>{item.number}</span><div><strong>{item.title}</strong><small>{item.short}</small></div><ChevronRight size={17} /></a>)}
                </div>
              </div>
            </div>
            <div className="mega-trigger">
              <a className="mega-trigger__link" href="/kategoriler">Kategoriler <ChevronDown size={15} /></a>
              <div className="mega-menu mega-menu--sectors">
                <div className="mega-menu__sector-grid">
                  {sectors.map((item) => <a key={item.id} href={`/kategoriler#${item.id}`}><span>{item.number}</span><strong>{item.title}</strong><small>{item.short}</small></a>)}
                </div>
              </div>
            </div>
            <a href="/blog">Blog</a>
            <a href={home ? "#yaklasim" : "/#yaklasim"}>Yaklaşım</a>
            <a href={home ? "#iletisim" : "/#iletisim"}>İletişim</a>
          </nav>
          <a className="header-call" href={`tel:${content.contact.phone.replace(/\D/g, "")}`}><Phone size={16} /><span>{content.contact.phone}</span></a>
          <button className="mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Menüyü aç" aria-expanded={mobileOpen}><Menu /></button>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu__head"><BrandLogo {...content.brand} compact /><button onClick={() => setMobileOpen(false)} aria-label="Menüyü kapat"><X /></button></div>
        <nav>
          <div className="mobile-menu__section-row"><a href="/hizmetler">Hizmetler</a><button type="button" aria-label="Hizmet alt menüsünü aç" aria-expanded={mobileSection === "services"} onClick={() => setMobileSection((current) => current === "services" ? null : "services")}><ChevronDown /></button></div>
          <div className={`mobile-menu__submenu ${mobileSection === "services" ? "is-open" : ""}`}>{services.map((item) => <a key={item.id} href={`/hizmetler#${item.id}`}><span>{item.number}</span>{item.title}<ChevronRight /></a>)}</div>
          <div className="mobile-menu__section-row"><a href="/kategoriler">Kategoriler</a><button type="button" aria-label="Kategori alt menüsünü aç" aria-expanded={mobileSection === "categories"} onClick={() => setMobileSection((current) => current === "categories" ? null : "categories")}><ChevronDown /></button></div>
          <div className={`mobile-menu__submenu ${mobileSection === "categories" ? "is-open" : ""}`}>{sectors.map((item) => <a key={item.id} href={`/kategoriler#${item.id}`}><span>{item.number}</span>{item.title}<ChevronRight /></a>)}</div>
          <a href="/blog">Blog</a>
          <a href={home ? "#yaklasim" : "/#yaklasim"}>Yaklaşım</a>
          <a href={home ? "#iletisim" : "/#iletisim"}>İletişim</a>
        </nav>
        <a className="mobile-menu__call" href={`tel:${content.contact.phone.replace(/\D/g, "")}`}>{content.contact.phone}</a>
      </div>
    </>
  );
}
