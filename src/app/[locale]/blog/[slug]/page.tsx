import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq, and, ne, sql } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { BlogContentTemplate } from '@/components/templates/blog-content-template'
import type { Metadata } from 'next'

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const allBlogs = await db.select().from(blogs).where(eq(blogs.published, true))

  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const [blog] = await db
    .select()
    .from(blogs)
    .where(and(eq(blogs.slug, slug), eq(blogs.published, true)))
    .limit(1)

  if (!blog) {
    return {}
  }

  const isTurkish = locale === 'tr'
  const title = isTurkish ? blog.title_tr : blog.title_en || blog.title_tr
  const description = isTurkish
    ? blog.description_tr
    : blog.description_en || blog.description_tr

  // Parse keywords from comma-separated string
  const keywords = blog.keywords
    ? blog.keywords.split(',').map(k => k.trim()).filter(Boolean)
    : []

  return {
    title,
    description: description || undefined,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title,
      description: description || undefined,
      type: 'article',
      publishedTime: blog.createdAt.toISOString(),
      authors: blog.author ? [blog.author] : ['KutupAkademi'],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  const [blog] = await db
    .select()
    .from(blogs)
    .where(and(eq(blogs.slug, slug), eq(blogs.published, true)))
    .limit(1)

  if (!blog) {
    notFound()
  }

  // Fetch 4 random published blogs excluding current one
  const randomBlogs = await db
    .select()
    .from(blogs)
    .where(and(eq(blogs.published, true), ne(blogs.id, blog.id)))
    .orderBy(sql`RANDOM()`)
    .limit(4)

  // If we got less than 4, just use what we have (up to 3)
  const relatedBlogs = randomBlogs.slice(0, 3)

  const isTurkish = locale === 'tr'
  const content = isTurkish ? blog.content_tr : blog.content_en || blog.content_tr

  const metadata = {
    slug: blog.slug,
    date: blog.createdAt.toISOString(),
    lastModified: blog.updatedAt.toISOString(),
    cover: blog.coverImage || undefined,
    tr: {
      title: blog.title_tr,
      description: blog.description_tr || '',
    },
    en: {
      title: blog.title_en || blog.title_tr,
      description: blog.description_en || blog.description_tr || '',
    },
  }

  return (
    <BlogContentTemplate
      metadata={metadata}
      content={content}
      locale={locale as 'tr' | 'en'}
      author={blog.author}
      relatedBlogs={relatedBlogs}
    />
  )
}
