'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  HERO_ARTICLE,
  SECONDARY_ARTICLES,
  POLITICS_ARTICLES,
  TECH_ARTICLES,
  FEATURES_ARTICLES,
} from '@/lib/mock-data'
import type { Article } from '@/lib/types'

const ALL_ARTICLES: Article[] = [
  HERO_ARTICLE,
  ...SECONDARY_ARTICLES,
  ...POLITICS_ARTICLES,
  ...TECH_ARTICLES.map((t, i) => ({
    id: `tech-${i}`,
    slug: '',
    title: t.title,
    kicker: t.kicker,
    lede: '',
    author: 'Редакция',
    section: 'tekhnologii',
    publishedAt: t.time,
    status: 'published' as const,
  })),
  ...FEATURES_ARTICLES,
].filter((a) => a.slug)

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const initial = searchParams.q ?? ''
  const [query, setQuery] = useState(initial)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.kicker.toLowerCase().includes(q) ||
        a.lede.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <main className="main" style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Поиск</h1>
      <input
        className="search-input"
        type="search"
        autoFocus
        placeholder="Введите запрос…"
        defaultValue={initial}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.trim() && (
        <p style={{ marginTop: 16, marginBottom: 24, color: 'var(--ink-3)', fontSize: 14 }}>
          {results.length > 0
            ? `${results.length} результат${results.length === 1 ? '' : results.length < 5 ? 'а' : 'ов'}`
            : 'Ничего не найдено'}
        </p>
      )}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {results.map((a) => (
          <li key={a.id} style={{ borderBottom: '1px solid var(--rule)', paddingBottom: 20 }}>
            <span className="kicker" style={{ marginBottom: 6 }}>{a.kicker}</span>
            <Link href={`/${a.section}/${a.slug}`} style={{ display: 'block', fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>
              {a.title}
            </Link>
            {a.lede && <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: 0 }}>{a.lede}</p>}
          </li>
        ))}
      </ul>
    </main>
  )
}
