import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { PublicNavigation } from "@/components/public-navigation";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hakkımızda | Hekimtaş Yatırım Danışmanlık",
  description: "Hekimtaş Danışmanlık'ın misyonu, vizyonu ve temsilcileri hakkında bilgi edinin.",
};

const representatives = [
  { number: "02", name: "Recep Çiçek", title: "İstanbul Temsilcisi", phones: ["0507 202 28 25"] },
  { number: "03", name: "Nihat Arık", title: "Almanya Temsilcisi", phones: ["0546 101 09 60", "+49 171 2121800"] },
];

function telHref(phone: string) {
  return `tel:${phone.replace(/(?!^\+)\D/g, "")}`;
}

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <div className="public-site" style={{ "--brand-primary": content.brand.primaryColor, "--brand-accent": content.brand.accentColor } as CSSProperties}>
      <PublicNavigation content={content} />

      <main>
        <section className="catalog-intro">
          <div className="site-container catalog-intro__grid">
            <p className="section-kicker">Hakkımızda</p>
            <div>
              <h2>{content.brand.name} Danışmanlık</h2>
              <p>Hekimtaş Danışmanlık, işletmelerin yatırım, finansman ve dış ticaret kararlarına hazırlanmasına destek olur. Her işletmenin ihtiyacı ve çalışma biçimi farklıdır. Bu nedenle sürece hazır bir çözümle değil; işletmenin hedeflerini, finansal yapısını ve faaliyet gösterdiği sektörün koşullarını anlayarak başlarız.</p>
              <p>Kredi ve fon seçeneklerinin değerlendirilmesi, yatırım dosyasının hazırlanması, ithalat ve ihracat süreçlerinin planlanması gibi alanlarda çalışırız. Amacımız yalnızca bir başvuru dosyası oluşturmak değil, işletmenin atacağı adımları anlaşılır ve uygulanabilir bir plana dönüştürmektir.</p>
            </div>
          </div>
        </section>

        <section className="editorial-statement">
          <div className="site-container editorial-statement__grid">
            <p className="section-kicker">Misyonumuz</p>
            <blockquote>İşletmelerin finansman ve yatırım ihtiyaçlarını doğru analiz ederek karar süreçlerine açık, gerçekçi ve işletmeye özel danışmanlıkla katkı sağlamak. Hazırlıktan başvuru takibine kadar her aşamada neyin, neden ve nasıl yapılacağını görünür kılmak.</blockquote>
          </div>
        </section>

        <section className="editorial-statement" style={{ background: "#fff" }}>
          <div className="site-container editorial-statement__grid">
            <p className="section-kicker">Vizyonumuz</p>
            <blockquote>Yatırım ve finansman kararlarında işletmelerin güvenle başvurabileceği bir danışmanlık kuruluşu olmak; Türkiye’de ve yurt dışındaki çalışma alanlarımızla işletmelerin büyüme hedeflerine sağlam bir hazırlık zemini sunmak.</blockquote>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container">
            <div className="section-heading-new">
              <p className="section-kicker">Yönetim ve Temsilcilerimiz</p>
              <div><p>Yönetim kurulu başkanımız ve farklı bölgelerdeki temsilcilerimizle işletmelere yerinde destek sağlıyoruz.</p></div>
            </div>
            <div className="org-tree">
              <div className="org-tree__lead">
                <article className="catalog-sector-card org-tree__card org-tree__card--lead">
                  <div className="catalog-sector-card__head"><span>01</span></div>
                  <h2>{content.contact.official}</h2>
                  <p className="catalog-sector-card__short">{content.contact.officialTitle}</p>
                </article>
              </div>
              <div className="org-tree__trunk" aria-hidden="true" />
              <div className="org-tree__branch" aria-hidden="true" />
              <div className="org-tree__children">
                {representatives.map((person) => (
                  <div className="org-tree__child" key={person.name}>
                    <article className="catalog-sector-card org-tree__card">
                      <div className="catalog-sector-card__head"><span>{person.number}</span></div>
                      <h2>{person.name}</h2>
                      <p className="catalog-sector-card__short">{person.title}</p>
                      {person.phones.map((phone) => <p key={phone}><a href={telHref(phone)}>Telefon: {phone}</a></p>)}
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="blog-contact">
          <div className="site-container blog-contact__inner">
            <div><p className="section-kicker section-kicker--light">İlk adım</p><h2>Yatırım hedefinizi birlikte netleştirelim.</h2></div>
            <a className="cta cta--accent" href="/#iletisim">Ön görüşme planla <ChevronRight size={18} /></a>
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
