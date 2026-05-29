import type { MetadataRoute } from 'next'
import { SECTIONS, HERO_ARTICLE, SECONDARY_ARTICLES, POLITICS_ARTICLES, TECH_ARTICLES, FEATURES_ARTICLES } from '@/lib/mock-data'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://infotut.ru'

export default function sitemap(): MetadataRoute.Sitemap {
  const allArticles = [
    HERO_ARTICLE,
    ...SECONDARY_ARTICLES,
    ...POLITICS_ARTICLES,
    ...TECH_ARTICLES,
    ...FEATURES_ARTICLES,
  ]

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/feedback` },
    { url: `${base}/about` },
    { url: `${base}/privacy` },
    { url: `${base}/terms` },
    ...SECTIONS.map((s) => ({ url: `${base}/${s.slug}` })),
    ...allArticles
      .filter((a) => a.slug && a.section)
      .map((a) => ({
        url: `${base}/${a.section}/${a.slug}`,
        lastModified: a.publishedAt ? new Date(a.publishedAt) : undefined,
      })),
  ]
}
