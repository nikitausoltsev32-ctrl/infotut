'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { Article } from '@/lib/types'
import { formatTime } from '@/lib/utils'

type ApiResponse = {
  docs?: Article[]
  totalDocs?: number
}

type SearchState = 'idle' | 'loading' | 'ready' | 'error'

function resultLabel(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) return 'результат'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'результата'
  return 'результатов'
}

export default function SearchClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Article[]>([])
  const [total, setTotal] = useState(0)
  const [state, setState] = useState<SearchState>('idle')

  const normalizedQuery = useMemo(() => query.trim(), [query])
  const hasQuery = normalizedQuery.length > 0

  useEffect(() => {
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setState('loading')

      const params = new URLSearchParams({ limit: hasQuery ? '20' : '6' })
      if (hasQuery) params.set('q', normalizedQuery)

      try {
        const response = await fetch(`/api/articles?${params.toString()}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Search request failed')
        }

        const payload = (await response.json()) as ApiResponse
        const docs = payload.docs ?? []
        setResults(docs)
        setTotal(payload.totalDocs ?? docs.length)
        setState('ready')
      } catch (error) {
        if ((error as Error).name === 'AbortError') return
        setResults([])
        setTotal(0)
        setState('error')
      }
    }, 160)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [hasQuery, normalizedQuery])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextUrl = hasQuery ? `/search?q=${encodeURIComponent(normalizedQuery)}` : '/search'
    window.history.replaceState(null, '', nextUrl)
  }

  return (
    <div className="search-workspace">
      <form className="search-panel" onSubmit={handleSubmit}>
        <label htmlFor="site-search" className="kicker">Запрос</label>
        <div className="search-field-row">
          <input
            id="site-search"
            className="search-input search-input-large"
            type="search"
            autoFocus
            placeholder="Введите тему, автора или рубрику"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="search-submit">Найти</button>
        </div>
      </form>

      <div className="search-summary">
        {state === 'loading' && <span>Ищем материалы...</span>}
        {state === 'error' && <span>Поиск временно недоступен</span>}
        {state === 'ready' && hasQuery && (
          <span>{total} {resultLabel(total)} по запросу «{normalizedQuery}»</span>
        )}
        {state === 'ready' && !hasQuery && <span>Последние материалы</span>}
      </div>

      {state === 'ready' && total === 0 && (
        <div className="search-empty">
          <span className="kicker">Ничего не найдено</span>
          <h2>Попробуйте другой запрос</h2>
          <p>Лучше работают короткие формулировки: рубрика, фамилия, город или ключевое слово.</p>
        </div>
      )}

      {results.length > 0 && (
        <ul className="search-results">
          {results.map((article) => (
            <li key={article.id}>
              <Link href={`/${article.section}/${article.slug}`} className="search-result">
                <div className="imgslot search-result-img">
                  <Image
                    src={article.thumbnail ?? '/placeholder.jpg'}
                    alt=""
                    fill
                  />
                </div>
                <div className="search-result-copy">
                  <span className="kicker">{article.kicker}</span>
                  <h2>{article.title}</h2>
                  <p>{article.lede}</p>
                  <div className="meta">
                    <span>{article.author}</span>
                    <span className="meta-dot">·</span>
                    <time dateTime={article.publishedAt}>{formatTime(article.publishedAt)}</time>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
