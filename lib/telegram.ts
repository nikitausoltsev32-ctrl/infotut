import TelegramBot from 'node-telegram-bot-api'

function getBot(): TelegramBot | null {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) return null
  return new TelegramBot(token)
}

export async function sendArticleToTelegram(article: {
  title: string
  slug: string
  section?: string
  thumbnailUrl?: string
}): Promise<void> {
  const bot = getBot()
  if (!bot) return

  const channelId = process.env.TELEGRAM_CHANNEL_ID
  if (!channelId) return

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://infotut.ru').replace(/\/$/, '')
  const path = article.section ? `${article.section}/${article.slug}` : article.slug
  const text = `📰 ${article.title}\n\nЧитать: ${baseUrl}/${path}`

  try {
    if (article.thumbnailUrl) {
      await bot.sendPhoto(channelId, article.thumbnailUrl, { caption: text })
    } else {
      await bot.sendMessage(channelId, text)
    }
  } catch (err) {
    console.error('[telegram] sendArticleToTelegram error:', err)
  }
}

export async function sendTextToTelegram(text: string): Promise<void> {
  const bot = getBot()
  if (!bot) return

  const channelId = process.env.TELEGRAM_CHANNEL_ID
  if (!channelId) return

  try {
    await bot.sendMessage(channelId, text)
  } catch (err) {
    console.error('[telegram] sendTextToTelegram error:', err)
  }
}
