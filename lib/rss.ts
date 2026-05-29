import { SECTIONS } from './mock-data'
import { getPublishedArticles } from './articles'
import { escapeXml, getBaseUrl } from './site'

export function buildRssXml() {
  const baseUrl = getBaseUrl()
  const sectionNames = new Map(SECTIONS.map((section) => [section.slug, section.name]))

  const items = getPublishedArticles()
    .map((article) => {
      const url = `${baseUrl}/${article.section}/${article.slug}`
      const category = sectionNames.get(article.section) ?? article.section

      return [
        '<item>',
        `<title>${escapeXml(article.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<description>${escapeXml(article.lede)}</description>`,
        `<author>${escapeXml(article.author)}</author>`,
        `<category>${escapeXml(category)}</category>`,
        `<pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>`,
        '</item>',
      ].join('')
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml('ИнфоТут')}</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml('Главные материалы ИнфоТут')}</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`
}

export function rssResponse() {
  return new Response(buildRssXml(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
