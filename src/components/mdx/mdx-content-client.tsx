'use client'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { mdxComponents } from './mdx-components'
import { MDXImage } from './mdx-image'

type MDXContentClientProps = {
  source: string
  slug: string
}

export function MDXContentClient({ source, slug }: MDXContentClientProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)

  const components = {
    ...mdxComponents,
    img: (props: object) => <MDXImage {...props} slug={slug} />
  }

  useEffect(() => {
    const serializeContent = async () => {
      try {
        const result = await serialize(source, {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              //      rehypeSlug,
              //      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              [
                rehypePrettyCode,
                {
                  theme: 'github-dark',
                  keepBackground: false,
                },
              ],
            ],
          },
        })
        setMdxSource(result)
      } catch (error) {
        console.error('Error serializing MDX:', error)
      }
    }

    serializeContent()
  }, [source])

  if (!mdxSource) {
    return null
  }

  return <MDXRemote {...mdxSource} components={components} />
}
