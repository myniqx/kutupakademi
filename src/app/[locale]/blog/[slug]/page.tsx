import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { BlogContentTemplate } from '@/components/templates/blog-content-template'
import type { Metadata } from 'next'
import { extractHeadings } from '@/lib/markdown/extract-headings'
import { getBlogCards } from '@/lib/query/blog'
import { generateMeta, DEFAULT_SEO } from '@/constants/seo'
import { getGuidanceBlogRevision } from '@/constants/guidance-blog-revisions'
import { stripLeadingH1 } from '@/lib/markdown/strip-leading-h1'
import { JsonLd } from '@/components/seo/json-ld'
import { SITE_CONFIG } from '@/constants/site'

type BlogPostPageProps = {
  params: Promise<{ locale: "tr" | "en"; slug: string }>
}

export async function generateStaticParams() {
  const allBlogs = await db.select().from(blogs).where(eq(blogs.published, true))
  const locales = ['tr', 'en'] as const

  return allBlogs.flatMap((blog) =>
    locales.map((locale) => ({
      locale,
      slug: blog.slug,
    }))
  )
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
  const revision = getGuidanceBlogRevision(slug)
  const localizedRevision = revision ? (isTurkish ? revision.tr : revision.en) : null
  const title = localizedRevision?.title || (isTurkish ? blog.title_tr : blog.title_en || blog.title_tr)
  const description = localizedRevision?.description || (isTurkish
    ? blog.description_tr
    : blog.description_en || blog.description_tr)

  // Parse blog-specific keywords
  const keywords = revision?.keywords || blog.keywords
  const blogKeywords = keywords
    ? keywords.split(',').map(k => k.trim()).filter(Boolean)
    : []

  // Combine default keywords with blog keywords
  const allKeywords = [
    ...DEFAULT_SEO.keywords[locale as 'tr' | 'en'],
    ...blogKeywords,
  ]

  // Use generateMeta with article support
  return generateMeta({
    title,
    description: description || undefined,
    keywords: allKeywords,
    locale: locale as 'tr' | 'en',
    path: locale === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`,
    image: revision?.coverImage
      ? `/blogs/${slug}/${revision.coverImage}`
      : blog.coverImage || undefined,
    type: 'article',
    publishedTime: blog.createdAt.toISOString(),
    modifiedTime: revision?.lastModified || blog.updatedAt.toISOString(),
    authors: blog.author ? [blog.author] : ['KutupAkademi'],
  })
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
  const revision = getGuidanceBlogRevision(slug)
  const localizedRevision = revision ? (isTurkish ? revision.tr : revision.en) : null
  const rawContent = localizedRevision?.content || (isTurkish ? blog.content_tr : blog.content_en || blog.content_tr)
  const content = stripLeadingH1(rawContent)
  const summary = localizedRevision?.summary || (isTurkish ? blog.summary_tr : blog.summary_en)

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
    lastModified: revision?.lastModified || blog.updatedAt.toISOString(),
    cover: revision?.coverImage || blog.coverImage || undefined,
    readingTime,
    headings,
    tr: {
      title: revision?.tr.title || blog.title_tr,
      description: revision?.tr.description || blog.description_tr || '',
    },
    en: {
      title: revision?.en.title || blog.title_en || blog.title_tr,
      description: revision?.en.description || blog.description_en || blog.description_tr || '',
    },
  }

  const pageTitle = metadata[locale].title
  const articlePath = locale === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`
  const articleUrl = `${SITE_CONFIG.url}${articlePath}`
  const imageUrl = metadata.cover
    ? (metadata.cover.startsWith('http') ? metadata.cover : `${SITE_CONFIG.url}/blogs/${slug}/${metadata.cover}`)
    : `${SITE_CONFIG.url}/blogs/blog-cover.webp`
  const blogLabel = locale === 'tr' ? 'Blog' : 'Blog'
  const homeLabel = locale === 'tr' ? 'Ana Sayfa' : 'Home'

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${articleUrl}#article`,
            headline: pageTitle,
            description: localizedRevision?.description || (isTurkish ? blog.description_tr : blog.description_en || blog.description_tr),
            image: imageUrl,
            datePublished: blog.createdAt.toISOString(),
            dateModified: metadata.lastModified,
            inLanguage: locale,
            mainEntityOfPage: articleUrl,
            author: { '@type': 'Organization', name: blog.author || SITE_CONFIG.name[locale], url: SITE_CONFIG.url },
            publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: homeLabel, item: locale === 'en' ? `${SITE_CONFIG.url}/en` : SITE_CONFIG.url },
              { '@type': 'ListItem', position: 2, name: blogLabel, item: `${SITE_CONFIG.url}${locale === 'en' ? '/en/blog' : '/blog'}` },
              { '@type': 'ListItem', position: 3, name: pageTitle, item: articleUrl },
            ],
          },
        ]}
      />
      <BlogContentTemplate
        metadata={metadata}
        content={content}
        summary={summary}
        locale={locale as 'tr' | 'en'}
        author={blog.author}
        relatedBlogs={relatedBlogs}
      />
    </>
  )
}
