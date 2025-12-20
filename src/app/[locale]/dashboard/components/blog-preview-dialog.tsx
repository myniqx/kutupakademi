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
import { Pencil } from 'lucide-react'
import { BlogContentTemplate } from '@/components/templates/blog-content-template'
import type { Blog } from '@/db/schema'

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

  // Create metadata for BlogContentTemplate
  const metadata = {
    slug: blog.slug,
    cover: blog.coverImage || undefined,
    readingTime: selectedLocale === 'tr' ? '5 dk okuma' : '5 min read',
    date: blog.createdAt,
    headings: [],
    tr: {
      title: localizedContent.title,
      description: localizedContent.description,
    },
    en: {
      title: localizedContent.title,
      description: localizedContent.description,
    },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Blog Preview</DialogTitle>
            <div className="flex items-center gap-2">
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

        {/* Blog Content */}
        <div className="mt-4">
          <BlogContentTemplate
            metadata={metadata}
            content={localizedContent.content}
            summary={localizedContent.summary}
            locale={selectedLocale}
            author={blog.author}
            preview={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
