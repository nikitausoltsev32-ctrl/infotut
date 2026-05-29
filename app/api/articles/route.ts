import { NextResponse } from 'next/server'
import { getPublishedArticles, searchArticles } from '@/lib/articles'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const section = searchParams.get('section') ?? undefined
  const query = searchParams.get('q')?.trim().toLowerCase() ?? ''
  const featured = searchParams.get('featured')
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10) || 20))
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)

  let filtered = section
    ? getPublishedArticles().filter((a) => a.section === section)
    : getPublishedArticles()

  if (query) {
    filtered = searchArticles(query, filtered)
  }

  if (featured === 'true') {
    filtered = filtered.filter((a) => Boolean(a.reads))
  }

  const totalDocs = filtered.length
  const start = (page - 1) * limit
  const docs = filtered.slice(start, start + limit)
  const totalPages = Math.ceil(totalDocs / limit)

  return NextResponse.json({
    docs,
    articles: docs,
    totalDocs,
    total: totalDocs,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
  })
}
