'use client';

import { useState } from 'react';
import type { FeedbackFormData } from '@/lib/types';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Тема обязательна';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Спасибо! Ваше сообщение отправлено.',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Ошибка при отправке. Попробуйте позже.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Ошибка при отправке. Попробуйте позже.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter">
      <div className="feedback-form-stack">
        <div className="feedback-form-field">
          <label htmlFor="name" className="feedback-form-label">
            Имя
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="feedback-form-input"
          />
          {errors.name && (
            <p className="feedback-form-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="feedback-form-field">
          <label htmlFor="email" className="feedback-form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="feedback-form-input"
          />
          {errors.email && (
            <p className="feedback-form-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="feedback-form-field">
          <label htmlFor="subject" className="feedback-form-label">
            Тема
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="feedback-form-input"
          />
          {errors.subject && (
            <p className="feedback-form-error">
              {errors.subject}
            </p>
          )}
        </div>

        <div className="feedback-form-field">
          <label htmlFor="message" className="feedback-form-label">
            Сообщение
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="feedback-form-input feedback-form-textarea"
          />
          {errors.message && (
            <p className="feedback-form-error">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="feedback-form-button"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>

        {submitStatus && (
          <p
            className={`feedback-form-status feedback-form-status-${submitStatus.type}`}
          >
            {submitStatus.message}
          </p>
        )}
      </div>
    </form>
  );
}
