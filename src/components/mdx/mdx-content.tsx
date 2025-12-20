import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from './mdx-components'
import { MDXImage } from './mdx-image'

type MDXContentProps = {
  source: string
  slug: string
}

export function MDXContent({ source, slug }: MDXContentProps) {

  const components = {
    ...mdxComponents,
    img: (props: object) => <MDXImage {...props} slug={slug} />
  }

  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: 'github-dark',
                keepBackground: false,
              },
            ],
          ],
        },
      }}
    />
  )
}
