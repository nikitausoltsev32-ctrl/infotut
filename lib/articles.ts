import {
  FEATURES_ARTICLES,
  HERO_ARTICLE,
  POLITICS_ARTICLES,
  SECONDARY_ARTICLES,
  SVO_ARTICLES,
} from './mock-data'
import type { Article } from './types'

export const ALL_ARTICLES: Article[] = [
  HERO_ARTICLE,
  ...SECONDARY_ARTICLES,
  ...POLITICS_ARTICLES,
  ...SVO_ARTICLES,
  ...FEATURES_ARTICLES,
]

export function getPublishedArticles() {
  return ALL_ARTICLES
    .filter((article) => article.status === 'published' && article.slug && article.section)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function findArticle(section: string, slug: string) {
  return getPublishedArticles().find((article) => article.section === section && article.slug === slug)
}

export function findArticleBySlug(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug)
}

export function searchArticles(query: string, articles = getPublishedArticles()) {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return articles
  }

  return articles.filter((article) =>
    [article.title, article.kicker, article.lede, article.author, article.section]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalized)),
  )
}
