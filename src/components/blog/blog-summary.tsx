'use client'

import { useState, useEffect } from 'react'
import { Sparkles, X } from 'lucide-react'
import { useSummary } from '../templates/provider/summary-provider'
import { MDXContentClient } from '../mdx/mdx-content-client'

type BlogSummaryProps = {
  summary: string
}

const isDev = process.env.NODE_ENV === 'development'

function splitIntoChunks(text: string): string[] {
  const chunks: string[] = []
  const words = text.split(/(\s+)/)
  let currentChunk = ''
  let insideMarkdown = false
  let markdownChar = ''

  for (let i = 0; i < words.length; i++) {
    const word = words[i]

    // Check for markdown characters (**, *, __, _, ~~, `, etc.)
    const markdownMatches = word.match(/(\*\*|\*|__|_|~~|`)/g)

    if (markdownMatches) {
      for (const match of markdownMatches) {
        if (!insideMarkdown) {
          insideMarkdown = true
          markdownChar = match
        } else if (match === markdownChar) {
          insideMarkdown = false
          markdownChar = ''
        }
      }
    }

    currentChunk += word

    // If we're not inside markdown and chunk has 2-3 words, push it
    if (!insideMarkdown && !word.match(/^\s+$/)) {
      const wordCount = currentChunk.trim().split(/\s+/).filter(w => w.length > 0).length
      if (wordCount >= 2 && Math.random() > 0.3) {
        chunks.push(currentChunk)
        currentChunk = ''
      }
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk)
  }

  return chunks
}

export function BlogSummary({ summary }: BlogSummaryProps) {
  const [isRevealing, setIsRevealing] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const { visible, setVisible } = useSummary()
  const [visibleText, setVisibleText] = useState('')
  const [chunks, setChunks] = useState<string[]>([])
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0)

  const handleReveal = () => {
    setIsRevealing(true)
    setVisibleText('')
    setCurrentChunkIndex(0)
    const textChunks = splitIntoChunks(summary)
    setChunks(textChunks)
  }

  const isCurrentlyVisible = isRevealing || isRevealed
  if (visible && visible !== isCurrentlyVisible) {
    handleReveal()
  }

  useEffect(() => {
    if (isRevealing && currentChunkIndex < chunks.length) {
      const timer = setTimeout(() => {
        setVisibleText(prev => prev + chunks[currentChunkIndex])
        setCurrentChunkIndex(prev => prev + 1)
      }, 30 + Math.random() * 40) // 80-120ms per chunk for natural feel

      return () => clearTimeout(timer)
    } else if (isRevealing && currentChunkIndex >= chunks.length) {
      // Animation complete
      setTimeout(() => {
        setIsRevealing(false)
        setIsRevealed(true)
      }, 200)
    }
  }, [isRevealing, currentChunkIndex, chunks])

  const handleClose = () => {
    setIsRevealed(false)
    setIsRevealing(false)
    setVisibleText('')
    setCurrentChunkIndex(0)
    setChunks([])
    setVisible(false)
  }

  if (isRevealed || isRevealing) {
    return (
      <div className="w-full relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-6 transition-all duration-300 ease-out">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Summary</span>
          </div>

          {isDev && (
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-md"
              title="Close (Dev Only)"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="relative w-full">
          <MDXContentClient
            source={isRevealing ? visibleText : summary}
            slug={''} // no img support
          />
        </div>
      </div>
    )
  }


  return null
}
