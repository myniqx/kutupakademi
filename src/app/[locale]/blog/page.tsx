import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { BlogGrid } from '@/components/blog/blog-grid'

type BlogPageProps = {
  params: Promise<{ locale: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  const publishedBlogs = await db
    .select()
    .from(blogs)
    .where(eq(blogs.published, true))
    .orderBy(desc(blogs.createdAt))

  const isTurkish = locale === 'tr'

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              {isTurkish ? 'Blog' : 'Blog'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isTurkish
                ? 'Teknoloji, tasarım ve inovasyon hakkında güncel içerikler'
                : 'Latest insights about technology, design and innovation'}
            </p>
          </div>

          {/* Blog Grid */}
          <BlogGrid blogs={publishedBlogs} locale={locale as 'tr' | 'en'} />
        </div>
      </div>
    </div>
  )
}
