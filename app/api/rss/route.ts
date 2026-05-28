import {
  FEATURES_ARTICLES,
  HERO_ARTICLE,
  POLITICS_ARTICLES,
  SECONDARY_ARTICLES,
  SECTIONS,
} from '@/lib/mock-data';
import type { Article } from '@/lib/types';

const articles: Article[] = [
  HERO_ARTICLE,
  ...SECONDARY_ARTICLES,
  ...FEATURES_ARTICLES,
  ...POLITICS_ARTICLES,
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}

export async function GET() {
  const baseUrl = getBaseUrl();
  const sectionNames = new Map(SECTIONS.map((section) => [section.slug, section.name]));

  const items = articles
    .filter((article) => article.status === 'published')
    .map((article) => {
      const url = `${baseUrl}/${article.section}/${article.slug}`;
      const category = sectionNames.get(article.section) ?? article.section;

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
      ].join('');
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml('ИнфоТут')}</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml('Главные материалы ИнфоТут')}</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
