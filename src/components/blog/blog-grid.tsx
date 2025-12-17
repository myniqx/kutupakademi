import { BlogCard } from './blog-card'
import type { Blog } from '@/db/schema'

interface BlogGridProps {
  blogs: Blog[]
  locale: 'tr' | 'en'
  max?: number
}

export function BlogGrid({ blogs, locale, max = 9 }: BlogGridProps) {
  const displayBlogs = max ? blogs.slice(0, max) : blogs

  if (displayBlogs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          {locale === 'tr' ? 'Henüz blog yazısı yok.' : 'No blog posts yet.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      {displayBlogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} locale={locale} />
      ))}
    </div>
  )
}
