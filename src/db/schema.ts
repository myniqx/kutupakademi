import { pgTable, text, timestamp, boolean, uuid, jsonb } from 'drizzle-orm/pg-core'

export const blogs = pgTable('blogs', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  author: text('author'),
  keywords: text('keywords'),
  title_tr: text('title_tr').notNull(),
  title_en: text('title_en'),
  description_tr: text('description_tr'),
  description_en: text('description_en'),
  summary_tr: text('summary_tr'),
  summary_en: text('summary_en'),
  content_tr: text('content_tr').notNull(),
  content_en: text('content_en'),
  coverImage: text('cover_image'),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const images = pgTable('images', {
  id: uuid('id').defaultRandom().primaryKey(),
  filename: text('filename').notNull(),
  url: text('url').notNull(),
  alt: text('alt'),
  width: text('width'),
  height: text('height'),
  size: text('size'),
  mimeType: text('mime_type'),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
})

export type Blog = typeof blogs.$inferSelect
export type NewBlog = typeof blogs.$inferInsert
export type Image = typeof images.$inferSelect
export type NewImage = typeof images.$inferInsert
