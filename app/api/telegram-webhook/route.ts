import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-telegram-bot-api-secret-token')
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const update = await req.json()

  // Incoming Telegram updates — extend here as needed
  console.log('[telegram-webhook]', JSON.stringify(update))

  return NextResponse.json({ ok: true })
}
