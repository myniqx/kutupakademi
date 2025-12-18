import { TableOfContents } from '@/components/ui/table-of-contents'
import { MDXContent } from '@/components/mdx/mdx-content'
import type { Heading } from '@/lib/markdown/extract-headings'

interface BlogPreviewTemplateProps {
  content: string
  headings: Heading[]
  slug: string
}

export function BlogPreviewTemplate({ content, headings, slug }: BlogPreviewTemplateProps) {

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Table of Contents - Left Sidebar */}
            <aside className="lg:col-span-3">
              <TableOfContents headings={headings} />
            </aside>

            {/* Main Article Content */}
            <article className="lg:col-span-9">
              <MDXContent source={content} slug={slug} />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
