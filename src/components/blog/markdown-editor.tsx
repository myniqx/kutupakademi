'use client'

import { useRef, useState } from 'react'
import { MarkdownToolbar } from './markdown-toolbar'
import { MarkdownPreview } from './markdown-preview'
import { Button } from '@/components/ui/button'
import { MediaDialog } from '@/app/[locale]/dashboard/components/MediaDialog'
import { X } from 'lucide-react'
import type { Image } from '@/db/schema'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  required?: boolean
  name?: string
  slug?: string
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  rows = 20,
  required,
  name,
  slug,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState<'edit' | 'split' | 'preview'>('split')
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)

  const handleInsert = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const textToInsert = selectedText || placeholder

    const newText =
      value.substring(0, start) +
      before +
      textToInsert +
      after +
      value.substring(end)

    onChange(newText)

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + textToInsert.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleImageSelect = (image: Image) => {
    const imageMarkdown = `![${image.filename}](${image.url})`
    handleInsert(imageMarkdown, '', '')
  }

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="h-full flex flex-col">
            <div className="border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Markdown Editor</h2>
              <div className="flex items-center gap-2">
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode('edit')}
                    className={`px-3 py-1 text-sm transition-colors ${viewMode === 'edit'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-muted'
                      }`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-1 text-sm transition-colors ${viewMode === 'split'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-muted'
                      }`}
                  >
                    Split
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('preview')}
                    className={`px-3 py-1 text-sm transition-colors ${viewMode === 'preview'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-muted'
                      }`}
                  >
                    Preview
                  </button>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={toggleFullscreen}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <MarkdownToolbar
                onInsert={handleInsert}
                onImageInsert={() => setIsImageDialogOpen(true)}
                onToggleFullscreen={toggleFullscreen}
                isFullscreen={isFullscreen}
              />

              <div className="flex-1 overflow-hidden">
                {viewMode === 'edit' && (
                  <textarea
                    ref={textareaRef}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    className="w-full h-full p-4 font-mono text-sm focus:outline-none resize-none"
                  />
                )}

                {viewMode === 'split' && (
                  <div className="grid grid-cols-2 h-full">
                    <textarea
                      ref={textareaRef}
                      name={name}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      placeholder={placeholder}
                      required={required}
                      className="w-full h-full p-4 border-r font-mono text-sm focus:outline-none resize-none"
                    />
                    <div className="overflow-auto p-4">
                      <MarkdownPreview content={value} slug={slug} />
                    </div>
                  </div>
                )}

                {viewMode === 'preview' && (
                  <div className="h-full overflow-auto p-4">
                    <MarkdownPreview content={value} slug={slug} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isFullscreen && (
        <div className="border rounded-lg overflow-hidden">
          <MarkdownToolbar
            onInsert={handleInsert}
            onImageInsert={() => setIsImageDialogOpen(true)}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />

          <textarea
            ref={textareaRef}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-2 font-mono text-sm focus:outline-none resize-none"
          />
        </div>
      )}

      {/* Media Dialog for Image Selection */}
      <MediaDialog
        open={isImageDialogOpen}
        onOpenChange={setIsImageDialogOpen}
        onSelect={handleImageSelect}
      />
    </>
  )
}
