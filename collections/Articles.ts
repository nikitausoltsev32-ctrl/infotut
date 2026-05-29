import type { CollectionConfig } from 'payload'

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
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'}/api/telegram-webhook`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ articleId: doc.id }),
            })
          } catch {
            // telegram notification is best-effort
          }
        }
      },
    ],
  },
}
