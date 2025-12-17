'use client'

import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link,
  Image,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Maximize2,
} from 'lucide-react'

interface MarkdownToolbarProps {
  onInsert: (before: string, after: string, placeholder?: string) => void
  onToggleFullscreen?: () => void
  isFullscreen?: boolean
}

export function MarkdownToolbar({
  onInsert,
  onToggleFullscreen,
  isFullscreen = false,
}: MarkdownToolbarProps) {
  const tools = [
    {
      icon: Bold,
      label: 'Bold',
      action: () => onInsert('**', '**', 'bold text'),
    },
    {
      icon: Italic,
      label: 'Italic',
      action: () => onInsert('*', '*', 'italic text'),
    },
    {
      icon: Strikethrough,
      label: 'Strikethrough',
      action: () => onInsert('~~', '~~', 'strikethrough'),
    },
    {
      icon: Code,
      label: 'Inline Code',
      action: () => onInsert('`', '`', 'code'),
    },
    { type: 'separator' },
    {
      icon: Heading1,
      label: 'Heading 1',
      action: () => onInsert('# ', '', 'Heading 1'),
    },
    {
      icon: Heading2,
      label: 'Heading 2',
      action: () => onInsert('## ', '', 'Heading 2'),
    },
    {
      icon: Heading3,
      label: 'Heading 3',
      action: () => onInsert('### ', '', 'Heading 3'),
    },
    { type: 'separator' },
    {
      icon: Link,
      label: 'Link',
      action: () => onInsert('[', '](url)', 'link text'),
    },
    {
      icon: Image,
      label: 'Image',
      action: () => onInsert('![', '](url)', 'alt text'),
    },
    { type: 'separator' },
    {
      icon: List,
      label: 'Bullet List',
      action: () => onInsert('- ', '', 'list item'),
    },
    {
      icon: ListOrdered,
      label: 'Numbered List',
      action: () => onInsert('1. ', '', 'list item'),
    },
    {
      icon: Quote,
      label: 'Quote',
      action: () => onInsert('> ', '', 'quote'),
    },
  ]

  return (
    <div className="flex items-center gap-1 p-2 border-b bg-muted/30 flex-wrap">
      {tools.map((tool, index) => {
        if ('type' in tool && tool.type === 'separator') {
          return (
            <div
              key={`separator-${index}`}
              className="w-px h-6 bg-border mx-1"
            />
          )
        }

        const Icon = tool.icon
        return (
          <Button
            key={tool.label}
            type="button"
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={tool.action}
            title={tool.label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        )
      })}

      {onToggleFullscreen && (
        <>
          <div className="flex-1" />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}
