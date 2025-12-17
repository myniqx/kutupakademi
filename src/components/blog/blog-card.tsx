import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import type { Blog } from '@/db/schema'

interface BlogCardProps {
  blog: Blog
  locale: 'tr' | 'en'
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function BlogCard({ blog, locale }: BlogCardProps) {
  const isTurkish = locale === 'tr'
  const title = isTurkish ? blog.title_tr : blog.title_en || blog.title_tr
  const summary = isTurkish ? blog.summary_tr : blog.summary_en || blog.summary_tr
  const description = isTurkish ? blog.description_tr : blog.description_en || blog.description_tr
  const content = isTurkish ? blog.content_tr : blog.content_en || blog.content_tr
  const readingTime = calculateReadingTime(content)

  return (
    <Link href={`/blog/${blog.slug}`} className="block h-full group">
      <GlowCard
        mode="border"
        intensity="medium"
        smoothness="normal"
        className="h-full flex flex-col"
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="relative h-48 flex-shrink-0 overflow-hidden bg-muted">
              <Image
                src={blog.coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col flex-1 min-h-0 p-6">
            {/* Meta Information */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={blog.createdAt.toISOString()}>
                  {new Date(blog.createdAt).toLocaleDateString(
                    isTurkish ? 'tr-TR' : 'en-US',
                    { year: 'numeric', month: 'short', day: 'numeric' }
                  )}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {readingTime} {isTurkish ? 'dk okuma' : 'min read'}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}

            {/* Summary */}
            {summary && (
              <p className="text-sm text-muted-foreground/80 mb-4 line-clamp-2 leading-relaxed">
                {summary}
              </p>
            )}

            {/* Spacer */}
            <div className="flex-1 min-h-4" />

            {/* Read More Link */}
            <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all pt-4 border-t border-border/50">
              <span>{isTurkish ? 'Devamını Oku' : 'Read More'}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </GlowCard>
    </Link>
  )
}
