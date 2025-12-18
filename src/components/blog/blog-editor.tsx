'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LocalizedInput } from './localized-input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { generateSlug } from '@/lib/utils/slug'
import { MediaDialog } from '@/app/[locale]/dashboard/components/MediaDialog'
import type { Blog, Image as ImageType } from '@/db/schema'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

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
    author: blog?.author || '',
    keywords: blog?.keywords || '',
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

  const [keywordInput, setKeywordInput] = useState('')
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [isTranslating, setIsTranslating] = useState<string | false>(false) // 'summary' or 'content'
  const keywords = formData.keywords
    ? formData.keywords.split(',').map(k => k.trim()).filter(Boolean)
    : []

  const slug = formData.slug || ''
  const isDevelopment = process.env.NODE_ENV === 'development'

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

  const handleImageSelect = (image: ImageType) => {
    setFormData(prev => ({
      ...prev,
      coverImage: image.url
    }))
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      coverImage: ''
    }))
  }

  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return

    const newKeywords = keywordInput
      .split(',')
      .map(k => k.trim())
      .filter(Boolean)

    const updatedKeywords = [...keywords, ...newKeywords]
    setFormData(prev => ({
      ...prev,
      keywords: updatedKeywords.join(', ')
    }))
    setKeywordInput('')
  }

  const handleRemoveKeyword = (indexToRemove: number) => {
    const updatedKeywords = keywords.filter((_, index) => index !== indexToRemove)
    setFormData(prev => ({
      ...prev,
      keywords: updatedKeywords.join(', ')
    }))
  }

  const handleKeywordInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAddKeyword()
    }
  }

  const handleAISummarize = async () => {
    if (!formData.content_tr) {
      alert('Türkçe içerik boş! Önce içerik yazın.')
      return
    }

    if (formData.summary_tr) {
      const confirmed = confirm('Özet zaten var. Yeniden oluşturulsun mu?')
      if (!confirmed) return
    }

    setIsSummarizing(true)

    try {
      const prompt = `Aşağıdaki blog yazısını kısa ve öz bir şekilde maddeler halinde özetle. Özet için markdown formatı kullan başka hiç bir şey yapma.

Blog İçeriği:
${formData.content_tr}

Özet:`

      const response = await fetch('/api/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'aya:8b',
          prompt,
        }),
      })

      const data = await response.json()

      if (data.success) {
        handleFieldChange('summary_tr', data.response.trim())
      } else {
        alert(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error('AI summarize error:', error)
      alert('Ollama bağlantısı başarısız. Ollama çalışıyor mu kontrol edin.')
    } finally {
      setIsSummarizing(false)
    }
  }

  const handleAITranslate = async (field: 'summary' | 'content') => {
    const sourceTrField = `${field}_tr` as keyof typeof formData
    const targetEnField = `${field}_en` as keyof typeof formData
    const sourceText = formData[sourceTrField]

    if (!sourceText) {
      alert('Türkçe metin boş! Önce Türkçe versiyonu yazın.')
      return
    }

    if (formData[targetEnField]) {
      const confirmed = confirm('İngilizce versiyonu zaten var. Yeniden çevrilsin mi?')
      if (!confirmed) return
    }

    setIsTranslating(field)

    try {
      const prompt = `Aşağıdaki Türkçe metni İngilizce'ye çevir. Markdown formatını koru, sadece çeviriyi yap, başka hiçbir şey ekleme.

Türkçe Metin:
${sourceText}

İngilizce Çeviri:`

      const response = await fetch('/api/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'aya:8b',
          prompt,
        }),
      })

      const data = await response.json()

      if (data.success) {
        handleFieldChange(targetEnField, data.response.trim())
      } else {
        alert(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error('AI translate error:', error)
      alert('Ollama bağlantısı başarısız. Ollama çalışıyor mu kontrol edin.')
    } finally {
      setIsTranslating(false)
    }
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
        // Only redirect to dashboard when publishing
        if (publish && !isAutoSave) {
          router.push('/dashboard')
          router.refresh()
        }
        // Draft saves and auto-saves don't trigger any navigation or refresh
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

            {/* Author */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleFieldChange('author', e.target.value)}
                placeholder="Author name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to use &quot;KutupAkademi&quot; as default
              </p>
            </div>

            {/* Keywords */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Keywords
              </label>

              {/* Keyword Badges */}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(index)}
                        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Keyword Input */}
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordInputKeyDown}
                onBlur={handleAddKeyword}
                placeholder=", ile keyword ekleyin..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Press Enter or comma to add keywords. Used for SEO.
              </p>
            </div>

            {/* Cover Image */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Cover Image
              </label>
              {formData.coverImage ? (
                <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                      src={formData.coverImage}
                      alt="Cover image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <MediaDialog onSelect={handleImageSelect}>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="bg-white"
                      >
                        Change
                      </Button>
                    </MediaDialog>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleRemoveImage}
                      className="bg-white text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <MediaDialog onSelect={handleImageSelect}>
                  <button
                    type="button"
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Click to select cover image</p>
                  </button>
                </MediaDialog>
              )}
            </div>

            <LocalizedInput
              name="title"
              label="Title"
              required
              value_tr={formData.title_tr}
              value_en={formData.title_en}
              onChange={handleFieldChange}
              slug={slug}
            />

            <LocalizedInput
              name="description"
              label="Description"
              slug={slug}
              value_tr={formData.description_tr}
              value_en={formData.description_en}
              onChange={handleFieldChange}
            />

            {/* Summary with AI Buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Summary</label>
                {isDevelopment && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleAISummarize}
                      disabled={isSummarizing || !formData.content_tr}
                      className="h-7 text-xs"
                    >
                      {isSummarizing ? (
                        <>⏳ Özetleniyor...</>
                      ) : (
                        <>✨ AI ile Özetle</>
                      )}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleAITranslate('summary')}
                      disabled={isTranslating === 'summary' || !formData.summary_tr}
                      className="h-7 text-xs"
                    >
                      {isTranslating === 'summary' ? (
                        <>⏳ Çevriliyor...</>
                      ) : (
                        <>🌐 AI ile Çevir</>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              <LocalizedInput
                name="summary"
                label=""
                markdown
                rows={4}
                value_tr={formData.summary_tr}
                value_en={formData.summary_en}
                onChange={handleFieldChange}
                slug={slug}
              />
            </div>

            {/* Content with AI Translate Button */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Content <span className="text-red-500">*</span>
                </label>
                {isDevelopment && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAITranslate('content')}
                    disabled={isTranslating === 'content' || !formData.content_tr}
                    className="h-7 text-xs"
                  >
                    {isTranslating === 'content' ? (
                      <>⏳ Çevriliyor...</>
                    ) : (
                      <>🌐 AI ile Çevir</>
                    )}
                  </Button>
                )}
              </div>
              <LocalizedInput
                name="content"
                label=""
                required
                markdown
                showPreview
                rows={20}
                value_tr={formData.content_tr}
                value_en={formData.content_en}
                onChange={handleFieldChange}
                slug={slug}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
