import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SECTIONS } from '@/lib/mock-data';
import { findArticle, findArticleBySlug, getPublishedArticles } from '@/lib/articles';
import { formatDate, formatTime } from '@/lib/utils';

interface Props {
  params: Promise<{ section: string; slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedArticles().map((a) => ({ section: a.section, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.lede,
    openGraph: { title: article.title, description: article.lede },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { section: sectionSlug, slug } = await params;
  const article = findArticle(sectionSlug, slug);
  if (!article) notFound();

  const section = SECTIONS.find((s) => s.slug === sectionSlug);

  return (
    <main className="main" style={{ maxWidth: '780px' }}>
      <nav style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'var(--ink-3)' }}>Главная</Link>
        <span>→</span>
        <Link href={`/${sectionSlug}`} style={{ color: 'var(--ink-3)' }}>{section?.name ?? sectionSlug}</Link>
      </nav>

      <article>
        <header style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          <span className="kicker">{article.kicker}</span>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.02em', textWrap: 'balance' }}>
            {article.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', lineHeight: 1.5, color: 'var(--ink-2)', fontStyle: 'italic' }}>
            {article.lede}
          </p>
          <div className="meta" style={{ fontSize: '13px' }}>
            <span>{article.author}</span>
            <span className="meta-dot">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}, {formatTime(article.publishedAt)}</time>
            {article.readTime && (
              <>
                <span className="meta-dot">·</span>
                <span>{article.readTime} чтения</span>
              </>
            )}
            {article.reads && (
              <>
                <span className="meta-dot">·</span>
                <span>{article.reads} читателей</span>
              </>
            )}
          </div>
        </header>

        {article.thumbnail && (
          <div className="imgslot" style={{ aspectRatio: '16/9', marginBottom: '32px' }}>
            <Image fill src={article.thumbnail} alt={article.title} priority style={{ objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', lineHeight: 1.65, color: 'var(--ink)', maxWidth: '68ch' }}>
          {article.content ? (
            <p>{article.content}</p>
          ) : (
            <p style={{ color: 'var(--ink-2)' }}>Полный текст материала недоступен в демо-версии.</p>
          )}
        </div>
      </article>
    </main>
  );
}
