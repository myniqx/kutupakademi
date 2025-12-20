import { BlogGridPaginated } from '@/components/blog/blog-grid-paginated'
import { HeroMiddle } from '@/components/sections/hero-middle'
import { getTranslations } from 'next-intl/server'
import { getBlogCards } from '@/lib/query/blog'
import { generateMeta } from '@/constants/seo'
import type { Metadata } from 'next'

type BlogPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  return generateMeta({
    title: locale === 'tr' ? 'Blog' : 'Blog',
    description: locale === 'tr'
      ? 'Veri analizi, SPSS, akademik yazı ve tez danışmanlığı konularında yazılarımızı okuyun.'
      : 'Read our articles on data analysis, SPSS, academic writing, and thesis consulting.',
    locale: locale as 'tr' | 'en',
    path: locale === 'en' ? '/en/blog' : '/blog',
  });
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
