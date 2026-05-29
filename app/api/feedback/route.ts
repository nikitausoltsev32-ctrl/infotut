import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { feedbackFormSchema } from '@/lib/validators';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 3;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: Request) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = buckets.get(ip);

  if (!current || current.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function requireMailEnv() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FEEDBACK_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !FEEDBACK_EMAIL) {
    return null;
  }

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: FEEDBACK_EMAIL,
  };
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный JSON' }, { status: 400 });
  }

  const parsed = feedbackFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Проверьте поля формы' }, { status: 400 });
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Слишком много запросов. Попробуйте позже.' }, { status: 429 });
  }

  const mailEnv = requireMailEnv();
  if (!mailEnv) {
    return NextResponse.json({ error: 'Почта для формы обратной связи не настроена' }, { status: 503 });
  }

  const { name, email, subject, message } = parsed.data;
  const transporter = nodemailer.createTransport({
    host: mailEnv.host,
    port: mailEnv.port,
    secure: mailEnv.port === 465,
    auth: {
      user: mailEnv.user,
      pass: mailEnv.pass,
    },
  });

  await transporter.sendMail({
    from: `"Инфотут" <${mailEnv.user}>`,
    replyTo: email,
    to: mailEnv.to,
    subject: `[infotut.ru] ${subject}`,
    text: [
      `Имя: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n'),
  });

  return NextResponse.json({ ok: true });
}
