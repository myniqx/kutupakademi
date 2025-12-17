'use client'

import { BlogPreviewTemplate } from './blog-preview-template'
import { Suspense } from 'react'

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-8">
        <p className="text-sm">Start typing to see preview...</p>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full text-muted-foreground p-8">
          <p className="text-sm">Rendering preview...</p>
        </div>
      }
    >
      <BlogPreviewTemplate content={content} />
    </Suspense>
  )
}
