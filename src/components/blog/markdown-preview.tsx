'use client'

import { extractHeadings } from '@/lib/markdown/extract-headings'
import { TableOfContents } from '../ui/table-of-contents'
import { MDXContentClient } from '../mdx/mdx-content-client'

interface MarkdownPreviewProps {
  content: string
  slug: string | undefined
}

export function MarkdownPreview({ content, slug = "" }: MarkdownPreviewProps) {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-8">
        <p className="text-sm">Start typing to see preview...</p>
      </div>
    )
  }
  const headings = extractHeadings(content)

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Table of Contents - Left Sidebar */}
            <aside className="lg:col-span-3 pt-20">
              <TableOfContents headings={headings} />
            </aside>

            {/* Main Article Content */}
            <article className="lg:col-span-9">
              <MDXContentClient source={content} slug={slug} />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
