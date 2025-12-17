import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ServiceContentTemplate } from '@/components/templates/service-content-template'

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const allBlogs = await db.select().from(blogs).where(eq(blogs.published, true))

  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }))
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

  const isTurkish = locale === 'tr'
  const content = isTurkish ? blog.content_tr : blog.content_en || blog.content_tr

  const metadata = {
    slug: blog.slug,
    date: blog.createdAt.toISOString(),
    cover: blog.coverImage || undefined,
    tr: {
      title: blog.title_tr,
      description: blog.description_tr || undefined,
    },
    en: {
      title: blog.title_en || blog.title_tr,
      description: blog.description_en || blog.description_tr || undefined,
    },
  }

  return (
    <ServiceContentTemplate
      metadata={metadata}
      content={content}
      locale={locale as 'tr' | 'en'}
    />
  )
}
