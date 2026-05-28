import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  HERO_ARTICLE,
  SECTIONS,
  POLITICS_ARTICLES,
  SECONDARY_ARTICLES,
  FEATURES_ARTICLES,
  MOST_READ,
  OPINIONS,
  TECH_ARTICLES,
  TICKER_ITEMS,
} from '@/lib/mock-data';
import type { Article } from '@/lib/types';
import { formatTime } from '@/lib/utils';

const ALL_ARTICLES: Article[] = [
  HERO_ARTICLE,
  ...POLITICS_ARTICLES,
  ...SECONDARY_ARTICLES,
  ...FEATURES_ARTICLES,
];

const SECTION_DESCRIPTIONS: Record<string, string> = {
  politika: 'Решения власти, региональная политика и законы, которые меняют повседневную жизнь.',
  ekonomika: 'Бизнес, рынки, бюджет и личные деньги без паники и без рекламных обещаний.',
  obshchestvo: 'Городская среда, образование, здоровье и социальные изменения в российских регионах.',
  kultura: 'Кино, книги, музеи, архитектура и новые имена в культурной повестке.',
  sport: 'Главные турниры, федерации, клубы и люди, которые делают российский спорт заметным.',
  tekhnologii: 'Наука, цифровые сервисы, индустрия ИИ и технологические решения для страны.',
  mneniya: 'Колонки редакции и приглашённых авторов о событиях, которые требуют спокойного разбора.',
};

interface Props {
  params: Promise<{ section: string }>;
}

export async function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: slug } = await params;
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) return {};
  return {
    title: section.name,
    description: `Все материалы рубрики «${section.name}» на ИнфоТут`,
  };
}

export default async function SectionPage({ params }: Props) {
  const { section: slug } = await params;
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) notFound();

  const articles = ALL_ARTICLES.filter((a) => a.section === slug);
  const relatedArticles = ALL_ARTICLES.filter((a) => a.section !== slug).slice(0, 5);
  const leadArticle = articles[0];
  const feedArticles = articles.slice(1).length > 0 ? articles.slice(1) : relatedArticles;
  const sideArticles = articles.slice(1, 4).length > 0 ? articles.slice(1, 4) : relatedArticles.slice(0, 3);
  const issueCount = slug === 'mneniya' ? OPINIONS.length : articles.length;

  return (
    <main className="main section-page">
      <header className="section-cover">
        <div className="section-cover-copy">
          <Link href="/" className="section-back">← Главная</Link>
          <span className="kicker">Раздел</span>
          <h1>{section.name}</h1>
          <p>{SECTION_DESCRIPTIONS[slug]}</p>
        </div>
        <div className="section-cover-meta">
          <span>{issueCount}</span>
          <small>{slug === 'mneniya' ? 'колонки в выпуске' : 'материалов в выпуске'}</small>
        </div>
      </header>

      {slug === 'mneniya' ? (
        <OpinionSection />
      ) : (
        <>
          {leadArticle && (
            <section className="section-top-grid">
              <Link href={`/${leadArticle.section}/${leadArticle.slug}`} className="section-lead-link">
                <article className="section-lead-card">
                  <div className="imgslot section-lead-img">
                    <Image
                      src={leadArticle.thumbnail ?? '/placeholder.jpg'}
                      alt={leadArticle.title}
                      fill
                      priority
                    />
                  </div>
                  <div className="section-lead-copy">
                    <span className="kicker">{leadArticle.kicker}</span>
                    <h2>{leadArticle.title}</h2>
                    <p>{leadArticle.lede}</p>
                    <div className="meta">
                      <span>{leadArticle.author}</span>
                      <span className="meta-dot">·</span>
                      <time dateTime={leadArticle.publishedAt}>{formatTime(leadArticle.publishedAt)}</time>
                    </div>
                  </div>
                </article>
              </Link>

              <aside className="section-side-panel">
                <div className="section-side-head">
                  <span className="ticker-dot" />
                  <h2>Коротко</h2>
                </div>
                <ul className="section-side-list">
                  {sideArticles.map((item) => (
                    <li key={item.id}>
                      <Link href={`/${item.section}/${item.slug}`}>
                        <span>{item.kicker}</span>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </section>
          )}

          <section className="section-news-split">
            <div className="section-feed">
              <div className="section-head section-head-tight">
                <h2>{articles.length > 1 ? 'Лента раздела' : 'Связанные материалы'}</h2>
                <span className="section-more">обновляется весь день</span>
              </div>
              <div className="section-row-list">
                {feedArticles.map((article) => (
                  <Link href={`/${article.section}/${article.slug}`} className="section-row" key={article.id}>
                    <div className="imgslot section-row-img">
                      <Image
                        src={article.thumbnail ?? '/placeholder.jpg'}
                        alt={article.title}
                        fill
                      />
                    </div>
                    <div className="section-row-copy">
                      <span className="kicker">{article.kicker}</span>
                      <h3>{article.title}</h3>
                      <p>{article.lede}</p>
                      <div className="meta">
                        <span>{article.author}</span>
                        <span className="meta-dot">·</span>
                        <time dateTime={article.publishedAt}>{formatTime(article.publishedAt)}</time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="section-rail">
              <div className="section-rail-block">
                <h2>Читают сейчас</h2>
                <ol className="mostread-list">
                  {MOST_READ.slice(0, 4).map((text, i) => (
                    <li key={text}>
                      <span className="mostread-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="mostread-text">{text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="section-rail-block">
                <h2>Мнения</h2>
                <ul className="opinion-list">
                  {OPINIONS.slice(0, 2).map((opinion) => (
                    <li key={opinion.title}>
                      <div className="opinion-author">{opinion.author}</div>
                      <div className="opinion-title">«{opinion.title}»</div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>

          <section className="section-briefs">
            <div className="section-head section-head-tight">
              <h2>{slug === 'tekhnologii' ? 'Технологическая лента' : 'Ещё в фокусе'}</h2>
              <Link href="/tekhnologii" className="section-more">все обновления →</Link>
            </div>
            <div className="section-brief-grid">
              {(slug === 'tekhnologii' ? TECH_ARTICLES.slice(0, 6) : TICKER_ITEMS.slice(0, 6)).map((item, i) => (
                <article key={`${'title' in item ? item.title : item.text}-${i}`} className="section-brief">
                  <span className="kicker">{'kicker' in item ? item.kicker : item.time}</span>
                  <h3>{'title' in item ? item.title : item.text}</h3>
                  {'time' in item && <div className="tech-time">{item.time}</div>}
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function OpinionSection() {
  return (
    <section className="section-opinion-layout">
      <div className="section-opinion-stack">
        <div className="section-head section-head-tight">
          <h2>Колонки</h2>
          <span className="section-more">редакторский выбор</span>
        </div>
        {OPINIONS.map((opinion, i) => (
          <article className="section-opinion-card" key={opinion.title}>
            <div className="section-opinion-num">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div className="opinion-author">{opinion.author}</div>
              <h3>«{opinion.title}»</h3>
              <p>
                Спокойный разбор редакции: почему эта тема важна сейчас и какие выводы стоит делать без спешки.
              </p>
            </div>
          </article>
        ))}
      </div>

      <aside className="section-rail">
        <div className="section-rail-block">
          <h2>Повестка</h2>
          <ul className="section-side-list">
            {TICKER_ITEMS.slice(0, 5).map((item) => (
              <li key={item.text}>
                <span>{item.time}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="section-rail-block">
          <h2>Читают сейчас</h2>
          <ol className="mostread-list">
            {MOST_READ.slice(0, 4).map((text, i) => (
              <li key={text}>
                <span className="mostread-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mostread-text">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </section>
  );
}
