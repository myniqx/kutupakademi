'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MarkdownEditor } from './markdown-editor'
import { SeoFieldBadge, type SeoFieldKey } from './seo-field-badge'

type Locale = 'tr' | 'en'

interface LocalizedInputProps {
  name: string
  label: string
  required?: boolean
  markdown?: boolean
  showPreview?: boolean
  rows?: number
  value_tr?: string
  value_en?: string
  slug?: string
  onChange: (field: string, value: string) => void
  onDeepLTranslate?: (sourceLang: Locale, targetLang: Locale) => Promise<void>
  isTranslating?: boolean
  /** Per-locale SEO badge shown inside each input. */
  seoField_tr?: SeoFieldKey
  seoField_en?: SeoFieldKey
}

export function LocalizedInput({
  name,
  label,
  required = false,
  markdown = false,
  rows = 4,
  value_tr = '',
  value_en = '',
  slug,
  onChange,
  onDeepLTranslate,
  isTranslating = false,
  seoField_tr,
  seoField_en,
}: LocalizedInputProps) {
  const [activeLocales, setActiveLocales] = useState<Locale[]>(['tr', 'en'])

  const toggleLocale = (locale: Locale) => {
    if (activeLocales.includes(locale)) {
      if (activeLocales.length === 1) return
      setActiveLocales(activeLocales.filter(l => l !== locale))
    } else {
      setActiveLocales([...activeLocales, locale])
    }
  }

  const isActive = (locale: Locale) => activeLocales.includes(locale)

  // Smart translate logic
  const getTranslateTooltip = (): string => {
    if (isTranslating) return 'Translating...'
    if (value_tr && value_en) return 'Both languages have content'
    if (!value_tr && !value_en) return 'Please add content first'
    return value_tr ? 'Translate TR → EN' : 'Translate EN → TR'
  }

  const canTranslate = (): boolean => {
    if (!onDeepLTranslate || isTranslating) return false
    // Can translate if exactly one language has content
    return (!!value_tr && !value_en) || (!value_tr && !!value_en)
  }

  const handleTranslate = () => {
    if (!onDeepLTranslate) return

    if (value_tr && !value_en) {
      onDeepLTranslate('tr', 'en')
    } else if (!value_tr && value_en) {
      onDeepLTranslate('en', 'tr')
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <div className="flex items-center gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => toggleLocale('tr')}
              className={`px-3 py-1 text-xs font-medium transition-colors ${isActive('tr')
                ? 'bg-primary text-primary-foreground'
                : 'bg-background hover:bg-muted'
                }`}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => toggleLocale('en')}
              className={`px-3 py-1 text-xs font-medium transition-colors ${isActive('en')
                ? 'bg-primary text-primary-foreground'
                : 'bg-background hover:bg-muted'
                }`}
            >
              EN
            </button>
          </div>

          {/* DeepL Translate button — hidden unless the server has an API key */}
          {onDeepLTranslate && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs"
              disabled={!canTranslate()}
              onClick={handleTranslate}
              title={getTranslateTooltip()}
            >
              {isTranslating ? '⏳' : '🌐'} Translate
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {isActive('tr') && (
          <div>
            {markdown ? (
              <>
                {seoField_tr && (
                  <div className="mb-1 flex justify-end">
                    <SeoFieldBadge field={seoField_tr} value={value_tr} />
                  </div>
                )}
                <MarkdownEditor
                  name={`${name}_tr`}
                  value={value_tr}
                  onChange={(value) => onChange(`${name}_tr`, value)}
                  rows={rows}
                  required={required}
                  placeholder={`${label} (Turkish)${required ? ' *' : ''}`}
                  slug={slug}
                />
              </>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  name={`${name}_tr`}
                  value={value_tr}
                  onChange={(e) => onChange(`${name}_tr`, e.target.value)}
                  required={required}
                  placeholder={`${label} (Turkish)${required ? ' *' : ''}`}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${seoField_tr ? 'pr-20' : ''}`}
                />
                {seoField_tr && (
                  <span className="absolute inset-y-0 right-2 flex items-center">
                    <SeoFieldBadge field={seoField_tr} value={value_tr} />
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {isActive('en') && (
          <div>
            {markdown ? (
              <>
                {seoField_en && (
                  <div className="mb-1 flex justify-end">
                    <SeoFieldBadge field={seoField_en} value={value_en} />
                  </div>
                )}
                <MarkdownEditor
                  name={`${name}_en`}
                  value={value_en}
                  onChange={(value) => onChange(`${name}_en`, value)}
                  rows={rows}
                  placeholder={`${label} (English)`}
                  slug={slug}
                />
              </>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  name={`${name}_en`}
                  value={value_en}
                  onChange={(e) => onChange(`${name}_en`, e.target.value)}
                  placeholder={`${label} (English)`}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${seoField_en ? 'pr-20' : ''}`}
                />
                {seoField_en && (
                  <span className="absolute inset-y-0 right-2 flex items-center">
                    <SeoFieldBadge field={seoField_en} value={value_en} />
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
