import type { CollectionConfig } from 'payload'
import { sendArticleToTelegram } from '../lib/telegram'

export const Articles: CollectionConfig = {
  slug: 'articles',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'excerpt',
      type: 'text',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
    },
    {
      name: 'section',
      type: 'relationship',
      relationTo: 'sections',
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Scheduled', value: 'scheduled' },
      ],
      defaultValue: 'draft',
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        if (doc.status === 'published' && previousDoc?.status !== 'published') {
          try {
            const section =
              typeof doc.section === 'object' && doc.section && 'slug' in doc.section
                ? String(doc.section.slug)
                : undefined

            await sendArticleToTelegram({
              title: String(doc.title),
              slug: String(doc.slug),
              section,
            })
          } catch {
            // telegram notification is best-effort
          }
        }
      },
    ],
  },
}
