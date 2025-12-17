'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LocalizedInput } from './localized-input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { generateSlug } from '@/lib/utils/slug'
import type { Blog } from '@/db/schema'

interface BlogEditorProps {
  blog?: Blog
  mode: 'new' | 'edit'
}

export function BlogEditor({ blog, mode }: BlogEditorProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<false | 'draft' | 'publish' | 'auto'>(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [formData, setFormData] = useState({
    slug: blog?.slug || '',
    title_tr: blog?.title_tr || '',
    title_en: blog?.title_en || '',
    description_tr: blog?.description_tr || '',
    description_en: blog?.description_en || '',
    summary_tr: blog?.summary_tr || '',
    summary_en: blog?.summary_en || '',
    content_tr: blog?.content_tr || '',
    content_en: blog?.content_en || '',
    coverImage: blog?.coverImage || '',
  })

  useEffect(() => {
    if (mode === 'new' && formData.title_tr) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.title_tr)
      }))
    }
  }, [formData.title_tr, mode])

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isPublishable = () => {
    return !!(
      formData.slug &&
      formData.title_tr &&
      formData.content_tr
    )
  }

  const handleSave = async (publish: boolean = false, isAutoSave: boolean = false) => {
    setIsSaving(isAutoSave ? 'auto' : (publish ? 'publish' : 'draft'))

    const payload = {
      ...formData,
      published: publish
    }

    try {
      const response = await fetch('/api/blog', {
        method: mode === 'new' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'edit' ? { id: blog?.id, ...payload } : payload),
      })

      if (response.ok) {
        setLastSaved(new Date())
        if (!isAutoSave) {
          router.push('/dashboard')
          router.refresh()
        }
      }
    } catch (error) {
      console.error('Failed to save blog:', error)
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    if (mode === 'edit' && formData.title_tr) {
      const interval = setInterval(() => {
        handleSave(false, true)
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [formData, mode])

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-2"
            >
              ← Back
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">
                {mode === 'new' ? 'Create New Blog Post' : 'Edit Blog Post'}
              </h1>
              {mode === 'edit' && (
                <span className="text-sm text-muted-foreground">
                  {isSaving === 'auto' ? (
                    <span className="text-blue-600">Saving...</span>
                  ) : lastSaved ? (
                    <span>Saved {new Date(lastSaved).toLocaleTimeString()}</span>
                  ) : null}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={!!isSaving}
            >
              {isSaving === 'draft' ? 'Saving...' : 'Save Draft'}
            </Button>

            <Button
              onClick={() => handleSave(true)}
              disabled={!!isSaving || !isPublishable()}
            >
              {isSaving === 'publish' ? 'Publishing...' : 'Save & Publish'}
            </Button>
          </div>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleFieldChange('slug', e.target.value)}
                placeholder="blog-post-slug"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Auto-generated from Turkish title, but editable
              </p>
            </div>

            {/* TODO: Image Uploader */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Cover Image
              </label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                <p className="text-sm">Image uploader coming soon...</p>
              </div>
            </div>

            <LocalizedInput
              name="title"
              label="Title"
              required
              value_tr={formData.title_tr}
              value_en={formData.title_en}
              onChange={handleFieldChange}
            />

            <LocalizedInput
              name="description"
              label="Description"
              value_tr={formData.description_tr}
              value_en={formData.description_en}
              onChange={handleFieldChange}
            />

            <LocalizedInput
              name="summary"
              label="Summary"
              markdown
              rows={4}
              value_tr={formData.summary_tr}
              value_en={formData.summary_en}
              onChange={handleFieldChange}
            />

            <LocalizedInput
              name="content"
              label="Content"
              required
              markdown
              showPreview
              rows={20}
              value_tr={formData.content_tr}
              value_en={formData.content_en}
              onChange={handleFieldChange}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
