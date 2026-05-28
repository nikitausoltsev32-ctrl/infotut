import type { Metadata } from 'next';
import FeedbackForm from '@/components/FeedbackForm';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с редакцией Инфотут — вопросы, предложения, пресс-релизы.',
};

export default function FeedbackPage() {
  return (
    <main className="main" style={{ maxWidth: '680px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
        <span className="kicker">Редакция</span>
        <h1 style={{ fontSize: '36px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Контакты</h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
          Вопросы, предложения, пресс-релизы и сообщения об ошибках — пишите нам.
          Мы отвечаем в течение одного рабочего дня.
        </p>
      </div>

      <FeedbackForm />
    </main>
  );
}
