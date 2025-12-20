'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil, Calendar, Clock, User } from 'lucide-react'
import Image from 'next/image'
import { BlogPreviewTemplate } from '@/components/blog/blog-preview-template'
import { MDXContentClient } from '@/components/mdx/mdx-content-client'
import type { Blog } from '@/db/schema'
import { MarkdownPreview } from '@/components/blog/markdown-preview'

interface BlogPreviewDialogProps {
  blog: Blog | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BlogPreviewDialog({ blog, open, onOpenChange }: BlogPreviewDialogProps) {
  const router = useRouter()
  const [selectedLocale, setSelectedLocale] = useState<'tr' | 'en'>('tr')

  if (!blog) return null

  const handleEdit = () => {
    onOpenChange(false)
    router.push(`/dashboard/blog/edit/${blog.id}`)
  }

  // Prepare content for the selected locale
  const getLocalizedContent = () => {
    const title = selectedLocale === 'tr' ? blog.title_tr : blog.title_en
    const description = selectedLocale === 'tr' ? blog.description_tr : blog.description_en
    const content = selectedLocale === 'tr' ? blog.content_tr : blog.content_en
    const summary = selectedLocale === 'tr' ? blog.summary_tr : blog.summary_en

    const noDataMessage = selectedLocale === 'tr'
      ? 'Henüz veri girilmedi'
      : 'No data entered yet'

    return {
      title: title || noDataMessage,
      description: description || noDataMessage,
      content: content || noDataMessage,
      summary: summary || noDataMessage,
    }
  }

  const localizedContent = getLocalizedContent()

  // Format date
  const formattedDate = new Date(blog.createdAt).toLocaleDateString(
    selectedLocale === 'tr' ? 'tr-TR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  // Labels
  const readingTime = selectedLocale === 'tr' ? '5 dk okuma' : '5 min read'
  const authorLabel = selectedLocale === 'tr' ? 'Yazar:' : 'Author:'
  const authorName = blog.author || 'KutupAkademi'
  const summaryLabel = selectedLocale === 'tr' ? 'Özet' : 'Summary'
  const coverImage = blog.coverImage || '/blogs/blog-cover.webp'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Blog Preview</DialogTitle>
            <div className="flex items-center gap-2 mr-6">
              {/* Language Toggle */}
              <Button
                size="sm"
                variant={selectedLocale === 'tr' ? 'default' : 'outline'}
                onClick={() => setSelectedLocale('tr')}
              >
                TR
              </Button>
              <Button
                size="sm"
                variant={selectedLocale === 'en' ? 'default' : 'outline'}
                onClick={() => setSelectedLocale('en')}
              >
                EN
              </Button>

              {/* Edit Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Blog Preview Content */}
        <div className="min-h-screen bg-background -mx-6 -mb-6">
          {/* Cover Image Section */}
          <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
            <Image
              src={coverImage}
              alt={localizedContent.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
          </section>

          {/* Title and Meta Information */}
          <section className="relative -mt-32 md:-mt-40">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground leading-tight">
                  {localizedContent.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{readingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{authorLabel} {authorName}</span>
                  </div>
                </div>

                {/* Description */}
                {localizedContent.description && localizedContent.description !== 'Henüz veri girilmedi' && localizedContent.description !== 'No data entered yet' && (
                  <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-12">
                    {localizedContent.description}
                  </p>
                )}

                {/* Summary - Always Open */}
                {localizedContent.summary && localizedContent.summary !== 'Henüz veri girilmedi' && localizedContent.summary !== 'No data entered yet' && (
                  <div className="mb-12 p-6 bg-muted/30 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">
                      {summaryLabel}
                    </h3>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <MDXContentClient source={localizedContent.summary} slug={blog.slug} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Content Section */}
          <MarkdownPreview
            content={localizedContent.content}
            slug={blog.slug}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
