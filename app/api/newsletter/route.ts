import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const email =
    typeof payload === 'object' &&
    payload !== null &&
    'email' in payload &&
    typeof payload.email === 'string'
      ? payload.email.trim()
      : '';

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Valid email is required' },
      { status: 400 }
    );
  }

  console.log('[newsletter] subscription:', email);

  return NextResponse.json({ ok: true });
}
