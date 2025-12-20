import { BlogGridPaginated } from '@/components/blog/blog-grid-paginated'
import { HeroMiddle } from '@/components/sections/hero-middle'
import { getTranslations } from 'next-intl/server'
import { getBlogCards } from '@/lib/query/blog'

type BlogPageProps = {
  params: Promise<{ locale: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  const t = await getTranslations('blog')

  const publishedBlogs = await getBlogCards({ locale })

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
          {/* Blog Grid with Pagination */}
          <BlogGridPaginated
            blogs={publishedBlogs}
            locale={locale as 'tr' | 'en'}
            itemsPerPage={9}
          />

        </div>
      </div>
    </div>
  )
}
