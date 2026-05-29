import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import path from 'path'
import { fileURLToPath } from 'url'

import { Articles } from './collections/Articles'
import { Authors } from './collections/Authors'
import { Comments } from './collections/Comments'
import { Media } from './collections/Media'
import { Sections } from './collections/Sections'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? 'change-me-in-production',
  admin: {
    user: Users.slug,
  },
  collections: [Articles, Authors, Sections, Comments, Users, Media],
  db: sqliteAdapter({
    client: {
      url: `file:${path.resolve(dirname, '.tmp/payload.db')}`,
    },
  }),
})
