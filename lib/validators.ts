import { z } from 'zod'

export const feedbackFormSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

export const newsletterSchema = z.object({
  email: z.email(),
})

export const articleCreateSchema = z.object({
  title: z.string().min(3),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  content: z.string(),
  section: z.string(),
})

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>
export type NewsletterValues = z.infer<typeof newsletterSchema>
export type ArticleCreateValues = z.infer<typeof articleCreateSchema>
