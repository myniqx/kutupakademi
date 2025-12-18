import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import { slugify } from '@/lib/utils/slugify'
import { Children } from 'react'

function getTextFromChildren(children: React.ReactNode): string {
  let text = ''
  Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      text += child
    } else if (typeof child === 'number') {
      text += child.toString()
    } else if (child && typeof child === 'object' && 'props' in child) {
      text += getTextFromChildren(child.props.children)
    }
  })
  return text
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => {
    const text = getTextFromChildren(children)
    const id = slugify(text)
    return (
      <h1 id={id} className="text-4xl font-bold mt-8 mb-4 text-foreground" {...props}>
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }) => {
    const text = getTextFromChildren(children)
    const id = slugify(text)
    return (
      <h2 id={id} className="text-3xl font-semibold mt-6 mb-3 text-foreground" {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }) => {
    const text = getTextFromChildren(children)
    const id = slugify(text)
    return (
      <h3 id={id} className="text-2xl font-semibold mt-4 mb-2 text-foreground" {...props}>
        {children}
      </h3>
    )
  },
  p: ({ children, ...props }) => (
    <p className="text-base leading-7 mb-4 text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc mb-4 space-y-2 text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal mb-4 space-y-2 text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  a: ({ children, ...props }) => (
    <a className="text-primary hover:underline" {...props}>
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4" {...props}>
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }) => {
    if (!src) {
      return null
    }

    // If it's an external URL, use Next.js Image
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return (
        <Image
          src={src}
          alt={alt || ''}
          width={1200}
          height={675}
          className="rounded-lg shadow-md my-8 w-full h-auto"
          {...props}
        />
      )
    }

    // For relative paths, assume it's in public directory
    return (
      <span className="block my-8">
        <Image
          src={src}
          alt={alt || ''}
          width={1200}
          height={675}
          className="rounded-lg shadow-md w-full h-auto"
          unoptimized
          {...props}
        />
      </span>
    )
  },
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-8">
      <table
        className="min-w-full divide-y divide-border border border-border rounded-lg"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-border" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-muted/30 transition-colors" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left font-semibold text-foreground border-b-2 border-border"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-muted-foreground" {...props}>
      {children}
    </td>
  ),
}
