import { NextResponse } from 'next/server'
import type { Article } from '@/lib/types'
import {
  HERO_ARTICLE,
  SECONDARY_ARTICLES,
  POLITICS_ARTICLES,
  FEATURES_ARTICLES,
} from '@/lib/mock-data'

const ALL_ARTICLES: Article[] = [
  HERO_ARTICLE,
  ...SECONDARY_ARTICLES,
  ...POLITICS_ARTICLES,
  ...FEATURES_ARTICLES,
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const section = searchParams.get('section') ?? undefined
  const limit = Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10) || 10)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)

  const filtered = section
    ? ALL_ARTICLES.filter((a) => a.section === section)
    : ALL_ARTICLES

  const total = filtered.length
  const start = (page - 1) * limit
  const articles = filtered.slice(start, start + limit)

  return NextResponse.json({ articles, total, page, limit })
}
