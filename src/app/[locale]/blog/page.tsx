import { BlogGridPaginated } from '@/components/blog/blog-grid-paginated'
import { HeroMiddle } from '@/components/sections/hero-middle'
import { getTranslations } from 'next-intl/server'
import { getBlogCards } from '@/lib/query/blog'
import { generateMeta } from '@/constants/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { SITE_CONFIG } from '@/constants/site'
import type { Metadata } from 'next'

const ITEMS_PER_PAGE = 9

type BlogPageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

function resolvePage(pageParam: string | undefined) {
  const parsed = Number.parseInt(pageParam || '1', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export async function generateMetadata({
  params,
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = resolvePage(pageParam);

  const basePath = locale === 'en' ? '/en/blog' : '/blog';
  const isTurkish = locale === 'tr';
  const title = currentPage > 1
    ? (isTurkish ? `Blog - Sayfa ${currentPage}` : `Blog - Page ${currentPage}`)
    : 'Blog';

  const meta = generateMeta({
    title,
    description: isTurkish
      ? 'Veri analizi, SPSS, akademik yazı ve tez danışmanlığı konularında yazılarımızı okuyun.'
      : 'Read our articles on data analysis, SPSS, academic writing, and thesis consulting.',
    locale: locale as 'tr' | 'en',
    path: basePath,
  });

  // Paginated pages are distinct URLs: point each one at itself, not at page 1,
  // and keep hreflang pointing at the matching page in the other locale.
  if (currentPage > 1) {
    const suffix = `?page=${currentPage}`;
    const pagedUrl = `${SITE_CONFIG.url}${basePath}${suffix}`;
    meta.alternates = {
      ...meta.alternates,
      canonical: pagedUrl,
      languages: {
        tr: `${SITE_CONFIG.url}/blog${suffix}`,
        en: `${SITE_CONFIG.url}/en/blog${suffix}`,
        'x-default': `${SITE_CONFIG.url}/blog${suffix}`,
      },
    };
    if (meta.openGraph) {
      meta.openGraph = { ...meta.openGraph, url: pagedUrl };
    }
  }

  return meta;
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params
  const { page: pageParam } = await searchParams
  const t = await getTranslations('blog')

  const publishedBlogs = await getBlogCards({ locale })
  const currentPage = resolvePage(pageParam)

  const basePath = locale === 'en' ? '/en/blog' : '/blog'
  const listingUrl = currentPage > 1
    ? `${SITE_CONFIG.url}${basePath}?page=${currentPage}`
    : `${SITE_CONFIG.url}${basePath}`

  // Describe only the posts actually rendered on this page.
  const pageOffset = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleBlogs = publishedBlogs.slice(pageOffset, pageOffset + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${listingUrl}#collection`,
            url: listingUrl,
            name: locale === 'tr' ? 'Blog' : 'Blog',
            inLanguage: locale,
            isPartOf: { '@id': `${SITE_CONFIG.url}/#website` },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: visibleBlogs.length,
              itemListElement: visibleBlogs.map((blog, index) => ({
                '@type': 'ListItem',
                position: pageOffset + index + 1,
                url: `${SITE_CONFIG.url}${basePath}/${blog.slug}`,
                name: blog.title,
              })),
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: locale === 'tr' ? 'Ana Sayfa' : 'Home',
                item: locale === 'en' ? `${SITE_CONFIG.url}/en` : SITE_CONFIG.url,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${SITE_CONFIG.url}${basePath}`,
              },
            ],
          },
        ]}
      />

      {/* Hero Section */}
      <HeroMiddle
        imageAlt={t('heroTitle')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
      />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
            {locale === 'tr' ? 'Son Yazılar' : 'Latest Articles'}
          </h2>
          {/* Blog Grid with Pagination */}
          <BlogGridPaginated
            blogs={publishedBlogs}
            locale={locale as 'tr' | 'en'}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
          />

        </div>
      </div>
    </div>
  )
}
