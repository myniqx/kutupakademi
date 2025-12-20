import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { BlogGrid } from '@/components/blog/blog-grid'
import { HeroMiddle } from '@/components/sections/hero-middle'
import { getTranslations } from 'next-intl/server'

type BlogPageProps = {
  params: Promise<{ locale: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  const t = await getTranslations('blog')

  const publishedBlogs = await db
    .select()
    .from(blogs)
    .where(eq(blogs.published, true))
    .orderBy(desc(blogs.createdAt))

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroMiddle
        imageAlt={t('heroTitle')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
      />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Blog Grid */}
          <BlogGrid blogs={publishedBlogs} locale={locale as 'tr' | 'en'} />
        </div>
      </div>
    </div>
  )
}
