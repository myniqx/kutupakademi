'use client'

import { useState, useRef } from 'react'
import { BlogCard, type BlogCardData } from './blog-card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogGridPaginatedProps {
  blogs: BlogCardData[]
  locale: 'tr' | 'en'
  itemsPerPage?: number
}

export function BlogGridPaginated({
  blogs,
  locale,
  itemsPerPage = 9
}: BlogGridPaginatedProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(blogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBlogs = blogs.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    // Scroll to grid top with offset for header
    if (gridRef.current) {
      const elementPosition = gridRef.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 100

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
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

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div ref={gridRef} className="space-y-8">
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} locale={locale} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-muted-foreground"
                  >
                    ...
                  </span>
                )
              }

              const pageNumber = page as number
              const isActive = pageNumber === currentPage

              return (
                <Button
                  key={pageNumber}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => goToPage(pageNumber)}
                  className="h-9 min-w-9"
                >
                  {pageNumber}
                </Button>
              )
            })}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="text-center text-sm text-muted-foreground">
          {locale === 'tr'
            ? `Sayfa ${currentPage} / ${totalPages} (Toplam ${blogs.length} yazı)`
            : `Page ${currentPage} of ${totalPages} (${blogs.length} posts total)`
          }
        </div>
      )}
    </div>
  )
}
