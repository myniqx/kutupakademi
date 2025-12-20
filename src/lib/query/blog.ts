import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq, desc, ne, and, sql } from 'drizzle-orm'
import type { BlogCardData } from '@/components/blog/blog-card'

type GetBlogCardsParams = {
  locale: string
  max?: number
  exceptId?: string | null
  orderBy?: 'latest' | 'random'
}

export async function getBlogCards({
  locale,
  max = -1,
  exceptId = null,
  orderBy = 'latest',
}: GetBlogCardsParams): Promise<BlogCardData[]> {
  const isTurkish = locale === 'tr'

  let query = db
    .select({
      id: blogs.id,
      slug: blogs.slug,
      title: sql<string>`COALESCE(${isTurkish ? blogs.title_tr : blogs.title_en}, ${isTurkish ? blogs.title_en : blogs.title_tr})`,
      description: isTurkish ? blogs.description_tr : blogs.description_en,
      summary: isTurkish ? blogs.summary_tr : blogs.summary_en,
      coverImage: blogs.coverImage,
      createdAt: blogs.createdAt,
    })
    .from(blogs)
    .$dynamic()

  // Add filters
  const filters = [eq(blogs.published, true)]
  if (exceptId) {
    filters.push(ne(blogs.id, exceptId))
  }

  query = query.where(and(...filters))

  // Apply ordering
  if (orderBy === 'random') {
    query = query.orderBy(sql`RANDOM()`)
  } else {
    query = query.orderBy(desc(blogs.createdAt))
  }

  // Apply limit if specified
  if (max > 0) {
    query = query.limit(max)
  }

  return await query
}
