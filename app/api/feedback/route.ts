import { NextResponse } from 'next/server';
import type { FeedbackFormData } from '@/lib/types';

export async function POST(req: Request) {
  const body: FeedbackFormData = await req.json();
  const { name, email, subject, message } = body;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 });
  }

  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Некорректный email' }, { status: 400 });
  }

  // TODO: send email or write to DB
  console.log('Feedback received:', { name, email, subject });

  return NextResponse.json({ ok: true });
}
