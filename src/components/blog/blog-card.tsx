import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'

export type BlogCardData = {
  id: string
  slug: string
  title: string
  description: string | null
  summary: string | null
  coverImage: string | null
  createdAt: Date
}

interface BlogCardProps {
  blog: BlogCardData
  locale: 'tr' | 'en'
}

export function BlogCard({ blog, locale }: BlogCardProps) {
  const isTurkish = locale === 'tr'

  return (
    <Link href={`/blog/${blog.slug}`} className="block h-full group">
      <GlowCard
        mode="border"
        intensity="medium"
        smoothness="normal"
        className="h-full flex flex-col"
        cardClassName="p-0 overflow-hidden"
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="relative h-48 shrink-0 overflow-hidden bg-muted">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent" />
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
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {blog.title}
            </h3>

            {/* Description */}
            {blog.description && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {blog.description}
              </p>
            )}

            {/* Summary */}
            {blog.summary && (
              <p className="text-sm text-muted-foreground/80 mb-4 line-clamp-2 leading-relaxed">
                {blog.summary}
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
