'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Locale = 'tr' | 'en'

interface LocalizedInputProps {
  name: string
  label: string
  required?: boolean
  markdown?: boolean
  rows?: number
  value_tr?: string
  value_en?: string
  onChange: (field: string, value: string) => void
}

export function LocalizedInput({
  name,
  label,
  required = false,
  markdown = false,
  rows = 4,
  value_tr = '',
  value_en = '',
  onChange,
}: LocalizedInputProps) {
  const [activeLocales, setActiveLocales] = useState<Locale[]>(['tr'])

  const toggleLocale = (locale: Locale) => {
    if (activeLocales.includes(locale)) {
      if (activeLocales.length === 1) return
      setActiveLocales(activeLocales.filter(l => l !== locale))
    } else {
      setActiveLocales([...activeLocales, locale])
    }
  }

  const isActive = (locale: Locale) => activeLocales.includes(locale)

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
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                isActive('tr')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-muted'
              }`}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => toggleLocale('en')}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                isActive('en')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-muted'
              }`}
            >
              EN
            </button>
          </div>

          {/* TODO: DeepL Translate button */}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            disabled
            title="DeepL integration coming soon"
          >
            Translate
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {isActive('tr') && (
          <div>
            {markdown ? (
              <textarea
                name={`${name}_tr`}
                value={value_tr}
                onChange={(e) => onChange(`${name}_tr`, e.target.value)}
                rows={rows}
                required={required}
                placeholder={`${label} (Turkish)${required ? ' *' : ''}`}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
            ) : (
              <input
                type="text"
                name={`${name}_tr`}
                value={value_tr}
                onChange={(e) => onChange(`${name}_tr`, e.target.value)}
                required={required}
                placeholder={`${label} (Turkish)${required ? ' *' : ''}`}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        )}

        {isActive('en') && (
          <div>
            {markdown ? (
              <textarea
                name={`${name}_en`}
                value={value_en}
                onChange={(e) => onChange(`${name}_en`, e.target.value)}
                rows={rows}
                placeholder={`${label} (English)`}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
            ) : (
              <input
                type="text"
                name={`${name}_en`}
                value={value_en}
                onChange={(e) => onChange(`${name}_en`, e.target.value)}
                placeholder={`${label} (English)`}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
