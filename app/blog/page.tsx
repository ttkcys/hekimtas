import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { PublicNavigation } from "@/components/public-navigation";
import { blogPosts } from "@/lib/blog-posts";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Hekimtaş Yatırım Danışmanlık",
  description: "Yatırım hazırlığı, finansman, nakit akışı ve dış ticaret süreçleri üzerine Hekimtaş Danışmanlık notları.",
};

export default async function BlogPage() {
  const content = await getSiteContent();
  const [featured, ...posts] = blogPosts;

  return (
    <div className="public-site blog-site" style={{ "--brand-primary": content.brand.primaryColor, "--brand-accent": content.brand.accentColor } as CSSProperties}>
      <PublicNavigation content={content} />

      <main>
        <section className="blog-hero">
          <div className="site-container blog-hero__grid">
            <div className="blog-hero__copy">
              <p className="section-kicker section-kicker--light">Hekimtaş Notları</p>
              <h1>Karar öncesi<br /><em>doğru sorular.</em></h1>
              <p>Yatırım, finansman ve dış ticaret süreçlerini daha anlaşılır kılan kısa, uygulanabilir okumalar.</p>
              <div className="blog-hero__meta"><span>06 güncel yazı</span><span>Yatırım · Finansman · Dış Ticaret</span></div>
            </div>
            <a className="blog-featured" href={`/blog/${featured.slug}`}>
              <img src={featured.image.src} alt={featured.image.alt} />
              <div className="blog-featured__shade" />
              <div className="blog-featured__content"><span>Öne çıkan · {featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><strong>Yazıyı oku <ChevronRight size={17} /></strong></div>
            </a>
          </div>
        </section>

        <section className="blog-index">
          <div className="site-container">
            <div className="blog-index__head"><div><p className="section-kicker">Bilgi Merkezi</p><h2>Son okumalar</h2></div><p>Finansman kararına hazırlanırken ihtiyaç duyacağınız temel kavramları sade ve doğrudan ele alıyoruz.</p></div>
            <div className="blog-grid">
              {posts.map((post) => (
                <article className="blog-card" key={post.slug}>
                  <a className="blog-card__media" href={`/blog/${post.slug}`}><img src={post.image.src} alt={post.image.alt} loading="lazy" /><span>{post.category}</span></a>
                  <div className="blog-card__body"><small>{post.date} · {post.readingTime}</small><h3><a href={`/blog/${post.slug}`}>{post.title}</a></h3><p>{post.excerpt}</p><a className="blog-card__link" href={`/blog/${post.slug}`}>Devamını oku <ChevronRight size={16} /></a></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-contact">
          <div className="site-container blog-contact__inner"><div><p className="section-kicker section-kicker--light">Sorunuz mu var?</p><h2>Konuyu işletmenizin gerçekleriyle birlikte değerlendirelim.</h2></div><a className="cta cta--accent" href="/#iletisim">Ön görüşme planla <ChevronRight size={18} /></a></div>
        </section>
      </main>

      <footer className="new-footer catalog-footer">
        <div className="site-container new-footer__top"><BrandLogo {...content.brand} primary="#ffffff" accent={content.brand.accentColor} /><p>{content.footer.summary}</p></div>
        <div className="site-container new-footer__bottom"><span>© {new Date().getFullYear()} {content.brand.name}</span><div><a href="/">Ana sayfa</a><a href="/hizmetler">Hizmetler</a><a href="/kategoriler">Kategoriler</a><a href="/blog">Blog</a></div></div>
      </footer>
    </div>
  );
}
