import { NextResponse } from 'next/server'
import { findArticleBySlug } from '@/lib/articles'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = findArticleBySlug(slug)

  if (!article) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(article)
}
