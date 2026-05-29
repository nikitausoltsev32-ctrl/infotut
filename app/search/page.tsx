import type { Metadata } from 'next'
import Link from 'next/link'
import SearchClient from './SearchClient'
import { SECTIONS } from '@/lib/mock-data'
import { getPublishedArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Поиск',
  description: 'Поиск по материалам Инфотут.',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const params = await searchParams
  const initial = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? ''
  const articleCount = getPublishedArticles().length

  return (
    <main className="main search-page">
      <header className="section-cover search-cover">
        <div className="section-cover-copy">
          <Link href="/" className="section-back">← Главная</Link>
          <span className="kicker">Архив</span>
          <h1>Поиск</h1>
          <p>
            Найдите материалы по заголовкам, описаниям, авторам и рубрикам редакционного архива.
          </p>
        </div>
        <div className="section-cover-meta">
          <span>{articleCount}</span>
          <small>материалов в текущем архиве</small>
        </div>
      </header>

      <section className="search-layout">
        <SearchClient initialQuery={initial} />

        <aside className="search-rail">
          <div className="section-rail-block">
            <h2>Рубрики</h2>
            <ul className="section-side-list">
              {SECTIONS.map((section) => (
                <li key={section.slug}>
                  <Link href={`/${section.slug}`}>
                    <span>{section.slug}</span>
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="section-rail-block">
            <h2>Сервисы</h2>
            <ul className="section-side-list">
              <li>
                <Link href="/rss.xml">
                  <span>RSS</span>
                  Подписка на ленту материалов
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml">
                  <span>XML</span>
                  Карта сайта для индексации
                </Link>
              </li>
              <li>
                <Link href="/feedback">
                  <span>Редакция</span>
                  Связаться с редакцией
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  )
}
