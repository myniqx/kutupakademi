'use client'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useState, useEffect } from 'react'
import { MDXImage } from '@/components/mdx/mdx-image'
import { H2, H3 } from '@/components/mdx/mdx-headings'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { extractHeadings } from '@/lib/markdown/extract-headings'
import remarkGfm from 'remark-gfm'

interface BlogPreviewTemplateProps {
  content: string
}

export function BlogPreviewTemplate({ content }: BlogPreviewTemplateProps) {
  const [mdxSource, setMdxSource] = useState<any>(null)
  const headings = extractHeadings(content)

  useEffect(() => {
    const compileMdx = async () => {
      const compiled = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      })
      setMdxSource(compiled)
    }
    compileMdx()
  }, [content])

  if (!mdxSource) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-8">
        <p className="text-sm">Compiling preview...</p>
      </div>
    )
  }

  const components = {
    img: (props: object) => <MDXImage {...props} slug="preview" />,
    h2: H2,
    h3: H3,
    table: (props: object) => (
      <div className="overflow-x-auto my-8">
        <table className="min-w-full divide-y divide-border border border-border rounded-lg" {...props} />
      </div>
    ),
    thead: (props: object) => <thead className="bg-muted/50" {...props} />,
    tbody: (props: object) => <tbody className="divide-y divide-border bg-background" {...props} />,
    tr: (props: object) => <tr className="hover:bg-muted/30 transition-colors" {...props} />,
    th: (props: object) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground" {...props} />
    ),
    td: (props: object) => (
      <td className="px-4 py-3 text-sm text-foreground/80" {...props} />
    ),
  }

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
              <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none
            prose-headings:scroll-mt-20
            prose-headings:font-bold
            prose-headings:tracking-tight

            prose-h1:text-5xl prose-h1:mb-8 prose-h1:mt-16
            prose-h1:bg-linear-to-br prose-h1:from-foreground prose-h1:to-foreground/70
            prose-h1:bg-clip-text prose-h1:text-transparent

            prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-16
            prose-h2:bg-linear-to-br prose-h2:from-foreground prose-h2:to-foreground/80
            prose-h2:bg-clip-text prose-h2:text-transparent
            prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-4

            prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-12
            prose-h3:text-foreground/90

            prose-p:text-lg prose-p:leading-relaxed prose-p:text-foreground/80
            prose-p:mb-6

            prose-a:text-primary prose-a:font-medium prose-a:no-underline
            prose-a:underline-offset-4 hover:prose-a:underline
            prose-a:transition-all

            prose-strong:text-foreground prose-strong:font-semibold

            prose-ul:my-8 prose-ul:space-y-3
            prose-li:text-foreground/80 prose-li:leading-relaxed

            prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12
            prose-img:border prose-img:border-border/50

            prose-blockquote:border-l-4 prose-blockquote:border-primary/50
            prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-6
            prose-blockquote:rounded-r-lg prose-blockquote:italic
            prose-blockquote:text-foreground/70

            prose-table:my-8 prose-table:border-collapse
            prose-th:bg-muted/50 prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
            prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-3
            prose-thead:border-b-2 prose-thead:border-border
            prose-tr:hover:bg-muted/30 prose-tr:transition-colors">
                <MDXRemote {...mdxSource} components={components} />
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
