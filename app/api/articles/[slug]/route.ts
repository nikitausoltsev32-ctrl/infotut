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

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const article = ALL_ARTICLES.find((a) => a.slug === params.slug)

  if (!article) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(article)
}
