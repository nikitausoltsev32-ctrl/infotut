export interface Article {
  id: string
  slug: string
  title: string
  kicker: string
  lede: string
  content?: string
  thumbnail?: string
  author: string
  section: string
  publishedAt: string
  readTime?: string
  reads?: string
  status: 'draft' | 'published' | 'scheduled'
}

export interface Section {
  id: string
  slug: string
  name: string
}

export interface TickerItem {
  time: string
  text: string
}

export interface Channel {
  name: string
  handle: string
  subs: string
  short: string
  url: string
}

export interface FeedbackFormData {
  name: string
  email: string
  subject: string
  message: string
}
