import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  SECTIONS,
  STATYI_SUBCATEGORIES,
  MOST_READ,
  OPINIONS,
  TECH_ARTICLES,
  TICKER_ITEMS,
} from '@/lib/mock-data';
import { formatTime } from '@/lib/utils';
import { getPublishedArticles } from '@/lib/articles';

const SECTION_DESCRIPTIONS: Record<string, string> = {
  politika: 'Решения власти, региональная политика и законы, которые меняют повседневную жизнь.',
  ekonomika: 'Бизнес, рынки, бюджет и личные деньги без паники и без рекламных обещаний.',
  obshchestvo: 'Городская среда, образование, здоровье и социальные изменения в российских регионах.',
  kultura: 'Кино, книги, музеи, архитектура и новые имена в культурной повестке.',
  sport: 'Главные турниры, федерации, клубы и люди, которые делают российский спорт заметным.',
  tekhnologii: 'Наука, цифровые сервисы, индустрия ИИ и технологические решения для страны.',
  mneniya: 'Колонки редакции и приглашённых авторов о событиях, которые требуют спокойного разбора.',
  statyi: 'Разборы и практические материалы о службе по контракту на СВО — по направлениям, условиям, выплатам и реальному опыту.',
};

interface Props {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ page?: string | string[]; folder?: string | string[] }>;
}

const STATYI_PAGE_SIZE = 25;
const STATYI_FOLDER_PREVIEW = 8;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getPageNumber(value: string | string[] | undefined, totalPages: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? '1', 10);

  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.min(parsed, Math.max(totalPages, 1));
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

export default async function SectionPage({ params, searchParams }: Props) {
  const { section: slug } = await params;
  const query = await searchParams;
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) notFound();

  const allArticles = getPublishedArticles();

  if (slug === 'statyi') {
    return (
      <StatyiSection
        sectionName={section.name}
        articles={allArticles.filter((a) => a.section === 'statyi')}
        activeFolder={firstParam(query.folder)}
      />
    );
  }

  const sectionArticles = allArticles.filter((a) => a.section === slug);
  const totalPages = slug === 'statyi' ? Math.ceil(sectionArticles.length / STATYI_PAGE_SIZE) : 1;
  const currentPage = getPageNumber(query.page, totalPages);
  const articles = slug === 'statyi'
    ? sectionArticles.slice((currentPage - 1) * STATYI_PAGE_SIZE, currentPage * STATYI_PAGE_SIZE)
    : sectionArticles;
  const relatedArticles = allArticles.filter((a) => a.section !== slug).slice(0, 5);
  const leadArticle = articles[0];
  const feedArticles = articles.slice(1).length > 0 ? articles.slice(1) : relatedArticles;
  const sideArticles = articles.slice(1, 4).length > 0 ? articles.slice(1, 4) : relatedArticles.slice(0, 3);
  const issueCount = slug === 'mneniya' ? OPINIONS.length : sectionArticles.length;

  return (
    <main className="main section-page">
      <header className="section-cover">
        <div className="section-cover-copy">
          <Link href="/" className="section-back">← Главная</Link>
          <span className="kicker">Раздел</span>
          <h1>{section.name}</h1>
          {SECTION_DESCRIPTIONS[slug] && <p>{SECTION_DESCRIPTIONS[slug]}</p>}
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
                      sizes="(max-width: 900px) 100vw, 50vw"
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
                        sizes="(max-width: 900px) 96px, 160px"
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
              {totalPages > 1 && (
                <nav className="section-pagination" aria-label="Страницы раздела">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <Link
                      key={page}
                      href={page === 1 ? `/${slug}` : `/${slug}?page=${page}`}
                      className={page === currentPage ? 'section-pagination-active' : undefined}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </Link>
                  ))}
                </nav>
              )}
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

function StatyiArticleRow({ article }: { article: ReturnType<typeof getPublishedArticles>[number] }) {
  return (
    <Link href={`/${article.section}/${article.slug}`} className="section-row" key={article.id}>
      <div className="imgslot section-row-img">
        <Image
          src={article.thumbnail ?? '/placeholder.jpg'}
          alt={article.title}
          fill
          sizes="(max-width: 900px) 96px, 160px"
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
  );
}

function StatyiSection({
  sectionName,
  articles,
  activeFolder,
}: {
  sectionName: string;
  articles: ReturnType<typeof getPublishedArticles>;
  activeFolder?: string;
}) {
  const folders = STATYI_SUBCATEGORIES.map((sc) => ({
    ...sc,
    items: articles.filter((a) => a.subcategory === sc.slug),
  })).filter((f) => f.items.length > 0);

  const active = activeFolder ? folders.find((f) => f.slug === activeFolder) : undefined;

  return (
    <main className="main section-page">
      <header className="section-cover">
        <div className="section-cover-copy">
          <Link href={active ? '/statyi' : '/'} className="section-back">
            {active ? '← Все папки' : '← Главная'}
          </Link>
          <span className="kicker">{active ? 'Папка' : 'Раздел'}</span>
          <h1>{active ? active.name : sectionName}</h1>
          {SECTION_DESCRIPTIONS.statyi && !active && <p>{SECTION_DESCRIPTIONS.statyi}</p>}
        </div>
        <div className="section-cover-meta">
          <span>{active ? active.items.length : articles.length}</span>
          <small>{active ? 'материалов в папке' : 'материалов в выпуске'}</small>
        </div>
      </header>

      {active ? (
        <section className="section-feed">
          <div className="section-row-list">
            {active.items.map((article) => (
              <StatyiArticleRow key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : (
        folders.map((folder) => (
          <section className="section-feed" key={folder.slug}>
            <div className="section-head section-head-tight">
              <h2>{folder.name}</h2>
              {folder.items.length > STATYI_FOLDER_PREVIEW && (
                <Link href={`/statyi?folder=${folder.slug}`} className="section-more">
                  все {folder.items.length} →
                </Link>
              )}
            </div>
            <div className="section-row-list">
              {folder.items.slice(0, STATYI_FOLDER_PREVIEW).map((article) => (
                <StatyiArticleRow key={article.id} article={article} />
              ))}
            </div>
          </section>
        ))
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
