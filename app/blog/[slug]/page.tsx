import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { PublicNavigation } from "@/components/public-navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Yazı bulunamadı | Hekimtaş Danışmanlık" };
  return { title: `${post.title} | Hekimtaş Danışmanlık`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const content = await getSiteContent();
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="public-site article-site" style={{ "--brand-primary": content.brand.primaryColor, "--brand-accent": content.brand.accentColor } as CSSProperties}>
      <PublicNavigation content={content} />

      <main>
        <section className="article-hero">
          <div className="site-container article-hero__grid">
            <div className="article-hero__copy">
              <a className="article-back" href="/blog"><ChevronLeft size={16} /> Tüm yazılar</a>
              <p className="section-kicker section-kicker--light">{post.category}</p>
              <h1>{post.title}</h1>
              <p>{post.excerpt}</p>
              <div className="article-hero__meta"><span>{post.date}</span><span>{post.readingTime}</span></div>
            </div>
            <div className="article-hero__media"><img src={post.image.src} alt={post.image.alt} /><span>{post.image.label}</span></div>
          </div>
        </section>

        <article className="article-body">
          <div className="site-container article-body__grid">
            <aside><span>Bu yazıda</span>{post.sections.map((section, index) => <a href={`#bolum-${index + 1}`} key={section.title}><i>0{index + 1}</i>{section.title}</a>)}<p>Bu içerik genel bilgilendirme amaçlıdır; kredi, fon veya yatırım sonucu taahhüdü içermez.</p></aside>
            <div className="article-content">
              {post.sections.map((section, index) => (
                <section id={`bolum-${index + 1}`} key={section.title}>
                  <span className="article-content__number">0{index + 1}</span>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.points && <ul>{section.points.map((point) => <li key={point}><Check size={17} />{point}</li>)}</ul>}
                </section>
              ))}
              <div className="article-cta"><div><span>İşletmenize özel değerlendirme</span><h3>Bu başlığı kendi yatırım planınız üzerinden konuşalım.</h3></div><a className="cta cta--accent" href="/#iletisim">Görüşme planla <ChevronRight size={18} /></a></div>
            </div>
          </div>
        </article>

        <section className="related-posts">
          <div className="site-container"><div className="related-posts__head"><p className="section-kicker">Okumaya devam</p><h2>İlgili yazılar</h2></div><div className="related-posts__grid">{related.map((item) => <a href={`/blog/${item.slug}`} key={item.slug}><img src={item.image.src} alt={item.image.alt} loading="lazy" /><span>{item.category}</span><h3>{item.title}</h3><strong>Yazıyı oku <ChevronRight size={15} /></strong></a>)}</div></div>
        </section>
      </main>

      <footer className="new-footer catalog-footer">
        <div className="site-container new-footer__top"><BrandLogo {...content.brand} primary="#ffffff" accent={content.brand.accentColor} /><p>{content.footer.summary}</p></div>
        <div className="site-container new-footer__bottom"><span>© {new Date().getFullYear()} {content.brand.name}</span><div><a href="/">Ana sayfa</a><a href="/hizmetler">Hizmetler</a><a href="/kategoriler">Kategoriler</a><a href="/blog">Blog</a></div></div>
      </footer>
    </div>
  );
}
