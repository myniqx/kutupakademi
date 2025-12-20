import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { BlogContentTemplate } from '@/components/templates/blog-content-template'
import type { Metadata } from 'next'
import { extractHeadings } from '@/lib/markdown/extract-headings'
import { getBlogCards } from '@/lib/query/blog'

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

  const relatedBlogs = await getBlogCards({
    locale,
    max: 3,
    exceptId: blog.id,
    orderBy: 'random'
  })


  const isTurkish = locale === 'tr'
  const content = isTurkish ? blog.content_tr : blog.content_en || blog.content_tr
  const summary = isTurkish ? blog.summary_tr : blog.summary_en

  // Calculate reading time from raw content
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  const readingTime = isTurkish ? `${minutes} dk okuma` : `${minutes} min read`

  // Extract headings from raw content
  const headings = extractHeadings(content)

  const metadata = {
    slug: blog.slug,
    date: blog.createdAt.toISOString(),
    lastModified: blog.updatedAt.toISOString(),
    cover: blog.coverImage || undefined,
    readingTime,
    headings,
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
      summary={summary}
      locale={locale as 'tr' | 'en'}
      author={blog.author}
      relatedBlogs={relatedBlogs}
    />
  )
}
