'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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

  // Track initial data and unsaved changes
  const initialDataRef = useRef<string>(JSON.stringify(formData))
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const safetyIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasUnsavedChanges = JSON.stringify(formData) !== initialDataRef.current

  const [keywordInput, setKeywordInput] = useState('')
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [isTranslating, setIsTranslating] = useState<string | false>(false) // 'summary' or 'content'
  const [deeplTranslatingField, setDeeplTranslatingField] = useState<string | null>(null)
  const keywords = formData.keywords
    ? formData.keywords.split(',').map(k => k.trim()).filter(Boolean)
    : []

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
      const prompt = `Aşağıdaki blog yazısını maddeler halinde özetle. Özet için markdown formatı kullan başka hiç bir şey yapma.

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

  const translateWithAI = async (sourceText: string, targetField: string): Promise<boolean> => {
    const prompt = `Aşağıdaki Türkçe metni İngilizce'ye çevir.
Türkçe Metin:
${sourceText}

English Translation:`

    try {
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
        handleFieldChange(targetField, data.response.trim())
        return true
      } else {
        alert(`Hata: ${data.error}`)
        return false
      }
    } catch (error) {
      console.error('AI translate error:', error)
      alert('Ollama bağlantısı başarısız. Ollama çalışıyor mu kontrol edin.')
      return false
    }
  }

  const handleAITranslate = async (field: 'title' | 'description' | 'summary' | 'content') => {
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
    await translateWithAI(sourceText as string, targetEnField)
    setIsTranslating(false)
  }

  const handleDeepLTranslate = async (field: string, sourceLang: 'tr' | 'en', targetLang: 'tr' | 'en') => {
    const sourceField = `${field}_${sourceLang}` as keyof typeof formData
    const targetField = `${field}_${targetLang}` as keyof typeof formData
    const sourceText = formData[sourceField]

    if (!sourceText) {
      alert('Source text is empty!')
      return
    }

    setDeeplTranslatingField(field)

    try {
      const response = await fetch('/api/deepl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
        }),
      })

      const data = await response.json()

      if (data.success) {
        handleFieldChange(targetField, data.translatedText)
      } else {
        alert(`DeepL Error: ${data.error}`)
      }
    } catch (error) {
      console.error('DeepL translation error:', error)
      alert('Failed to translate with DeepL. Check if API key is configured.')
    } finally {
      setDeeplTranslatingField(null)
    }
  }

  const handleFixContent = () => {
    if (!formData.content_tr) return

    let fixedContent = formData.content_tr

    // Remove all emojis (including symbols like ⚠️, ⏱️, ✅, etc.)
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{231A}-\u{231B}\u{23E9}-\u{23F3}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3030}\u{303D}\u{3297}\u{3299}\u{FE0F}]/gu
    fixedContent = fixedContent.replace(emojiRegex, '')

    // Fix markdown tables: replace | | with |\n|
    fixedContent = fixedContent.replace(/\|\s+\|/g, '|\n|')

    handleFieldChange('content_tr', fixedContent)
  }

  const isPublishable = !!(
    formData.slug &&
    formData.title_tr &&
    formData.title_en &&
    formData.content_en &&
    formData.content_tr &&
    formData.description_tr &&
    formData.description_en &&
    formData.summary_tr &&
    formData.summary_en &&
    formData.coverImage
  )

  const handleSave = useCallback(async (publish: boolean = false, isAutoSave: boolean = false) => {
    // Skip auto save if no changes
    if (isAutoSave && !hasUnsavedChanges) {
      return
    }

    setIsSaving(isAutoSave ? 'auto' : (publish ? 'publish' : 'draft'))

    const payload = {
      ...formData,
      // Preserve existing published status on auto save
      published: isAutoSave ? (blog?.published || false) : publish
    }

    try {
      const response = await fetch('/api/blog', {
        method: mode === 'new' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'edit' ? { id: blog?.id, ...payload } : payload),
      })

      if (response.ok) {
        setLastSaved(new Date())
        // Update initial data ref after successful save
        initialDataRef.current = JSON.stringify(formData)

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
  }, [formData, hasUnsavedChanges, blog?.published, blog?.id, mode, router])

  // Auto save with debounce (10 seconds after user stops typing)
  useEffect(() => {
    if (mode !== 'edit' || !formData.title_tr) return

    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new debounce timer (10 seconds)
    debounceTimerRef.current = setTimeout(() => {
      handleSave(false, true)
    }, 10000)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [formData, mode, handleSave])

  // Safety interval (2 minutes) - backup auto save
  useEffect(() => {
    if (mode !== 'edit' || !formData.title_tr) return

    safetyIntervalRef.current = setInterval(() => {
      handleSave(false, true)
    }, 120000) // 2 minutes

    return () => {
      if (safetyIntervalRef.current) {
        clearInterval(safetyIntervalRef.current)
      }
    }
  }, [mode, formData.title_tr, handleSave])

  // Warn user about unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasUnsavedChanges])

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
                  ) : hasUnsavedChanges && lastSaved ? (
                    <span className="text-amber-600">Unsaved changes</span>
                  ) : lastSaved ? (
                    <span className="text-green-600">Saved {new Date(lastSaved).toLocaleTimeString()}</span>
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
              disabled={!!isSaving || !isPublishable}
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

            {/* Title with AI Translate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </label>
                {isDevelopment && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAITranslate('title')}
                    disabled={isTranslating === 'title' || !formData.title_tr}
                    className="h-7 text-xs"
                  >
                    {isTranslating === 'title' ? (
                      <>⏳ Çevriliyor...</>
                    ) : (
                      <>🌐 AI ile Çevir</>
                    )}
                  </Button>
                )}
              </div>
              <LocalizedInput
                name="title"
                label=""
                required
                value_tr={formData.title_tr}
                value_en={formData.title_en}
                onChange={handleFieldChange}
                onDeepLTranslate={(src, tgt) => handleDeepLTranslate('title', src, tgt)}
                isTranslating={deeplTranslatingField === 'title'}
              />
            </div>

            {/* Description with AI Translate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Description</label>
                {isDevelopment && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAITranslate('description')}
                    disabled={isTranslating === 'description' || !formData.description_tr}
                    className="h-7 text-xs"
                  >
                    {isTranslating === 'description' ? (
                      <>⏳ Çevriliyor...</>
                    ) : (
                      <>🌐 AI ile Çevir</>
                    )}
                  </Button>
                )}
              </div>
              <LocalizedInput
                name="description"
                label=""
                value_tr={formData.description_tr}
                value_en={formData.description_en}
                onChange={handleFieldChange}
                onDeepLTranslate={(src, tgt) => handleDeepLTranslate('description', src, tgt)}
                isTranslating={deeplTranslatingField === 'description'}
              />
            </div>

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
                onDeepLTranslate={(src, tgt) => handleDeepLTranslate('summary', src, tgt)}
                isTranslating={deeplTranslatingField === 'summary'}
              />
            </div>

            {/* Content with AI Translate Button */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Content <span className="text-red-500">*</span>
                </label>
                {isDevelopment && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleFixContent}
                      disabled={!formData.content_tr}
                      className="h-7 text-xs"
                    >
                      Fix
                    </Button>
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
                  </div>
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
                onDeepLTranslate={(src, tgt) => handleDeepLTranslate('content', src, tgt)}
                isTranslating={deeplTranslatingField === 'content'}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
