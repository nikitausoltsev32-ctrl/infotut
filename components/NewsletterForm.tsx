'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: 'Проверьте email и попробуйте еще раз.',
        });
        return;
      }

      setStatus({
        type: 'success',
        message: 'Готово. Мы добавили email в список.',
      });
      setEmail('');
    } catch {
      setStatus({
        type: 'error',
        message: 'Не удалось отправить. Попробуйте позже.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="ваш@email.ru"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={isSubmitting}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Подписаться'}
      </button>
      {status && (
        <p className={`newsletter-status newsletter-status-${status.type}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}
