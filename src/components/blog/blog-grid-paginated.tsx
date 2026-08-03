import Link from 'next/link'
import { BlogCard, type BlogCardData } from './blog-card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogGridPaginatedProps {
  blogs: BlogCardData[]
  locale: 'tr' | 'en'
  currentPage?: number
  itemsPerPage?: number
}

export function BlogGridPaginated({
  blogs,
  locale,
  currentPage = 1,
  itemsPerPage = 9,
}: BlogGridPaginatedProps) {
  const totalPages = Math.max(1, Math.ceil(blogs.length / itemsPerPage))
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (safeCurrentPage - 1) * itemsPerPage
  const currentBlogs = blogs.slice(startIndex, startIndex + itemsPerPage)
  const basePath = locale === 'en' ? '/en/blog' : '/blog'

  const pageHref = (page: number) => page === 1 ? basePath : `${basePath}?page=${page}`

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    pages.push(1)

    if (safeCurrentPage > 3) {
      pages.push('ellipsis-start')
    }

    const start = Math.max(2, safeCurrentPage - 1)
    const end = Math.min(totalPages - 1, safeCurrentPage + 1)

    for (let page = start; page <= end; page += 1) {
      pages.push(page)
    }

    if (safeCurrentPage < totalPages - 2) {
      pages.push('ellipsis-end')
    }

    pages.push(totalPages)
    return pages
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          {locale === 'tr' ? 'Henüz blog yazısı yok.' : 'No blog posts yet.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} locale={locale} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav aria-label={locale === 'tr' ? 'Blog sayfaları' : 'Blog pages'} className="flex items-center justify-center gap-2 pt-8">
          <Button asChild={safeCurrentPage > 1} variant="outline" size="icon" disabled={safeCurrentPage === 1} className="h-9 w-9">
            {safeCurrentPage > 1 ? (
              <Link href={pageHref(safeCurrentPage - 1)} aria-label={locale === 'tr' ? 'Önceki sayfa' : 'Previous page'}>
                <ChevronLeft className="h-4 w-4" />
              </Link>
            ) : (
              <span><ChevronLeft className="h-4 w-4" /></span>
            )}
          </Button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page) => {
              if (typeof page !== 'number') {
                return <span key={page} className="px-3 py-2 text-muted-foreground">…</span>
              }

              const isActive = page === safeCurrentPage

              return (
                <Button key={page} asChild={!isActive} variant={isActive ? 'default' : 'outline'} size="sm" className="h-9 min-w-9">
                  {isActive ? (
                    <span aria-current="page">{page}</span>
                  ) : (
                    <Link href={pageHref(page)} aria-label={`${locale === 'tr' ? 'Sayfa' : 'Page'} ${page}`}>{page}</Link>
                  )}
                </Button>
              )
            })}
          </div>

          <Button asChild={safeCurrentPage < totalPages} variant="outline" size="icon" disabled={safeCurrentPage === totalPages} className="h-9 w-9">
            {safeCurrentPage < totalPages ? (
              <Link href={pageHref(safeCurrentPage + 1)} aria-label={locale === 'tr' ? 'Sonraki sayfa' : 'Next page'}>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span><ChevronRight className="h-4 w-4" /></span>
            )}
          </Button>
        </nav>
      )}

      {totalPages > 1 && (
        <p className="text-center text-sm text-muted-foreground">
          {locale === 'tr'
            ? `Sayfa ${safeCurrentPage} / ${totalPages} (Toplam ${blogs.length} yazı)`
            : `Page ${safeCurrentPage} of ${totalPages} (${blogs.length} posts total)`}
        </p>
      )}
    </div>
  )
}
