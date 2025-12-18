'use client'

import { Sparkles } from 'lucide-react'
import { GlowButton } from '@/components/ui/glow-button'
import { useSummary } from './summary-provider'

type SummaryButtonProps = {
  label: string
}

export function SummaryButton({ label }: SummaryButtonProps) {
  const { setVisible, visible } = useSummary()

  const handleReveal = () => {
    setVisible(true)
  }

  if (visible) return null

  return (
    <GlowButton
      onClick={handleReveal}
      variant="outline"
      size="sm"
      className="gap-2"
      intensity="medium"
    >
      <Sparkles className="h-4 w-4" />
      {label}
    </GlowButton>
  )
}
