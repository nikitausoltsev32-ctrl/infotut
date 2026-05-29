import type { MetadataRoute } from 'next'
import { SECTIONS } from '@/lib/mock-data'
import { getPublishedArticles } from '@/lib/articles'
import { getBaseUrl } from '@/lib/site'

const base = getBaseUrl()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/feedback` },
    { url: `${base}/about` },
    { url: `${base}/privacy` },
    { url: `${base}/terms` },
    { url: `${base}/rss.xml` },
    ...SECTIONS.map((s) => ({ url: `${base}/${s.slug}` })),
    ...getPublishedArticles()
      .map((a) => ({
        url: `${base}/${a.section}/${a.slug}`,
        lastModified: a.publishedAt ? new Date(a.publishedAt) : undefined,
      })),
  ]
}
