'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type SummaryContextType = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const SummaryContext = createContext<SummaryContextType | undefined>(undefined)

export function SummaryProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)

  return (
    <SummaryContext.Provider value={{ visible, setVisible }}>
      {children}
    </SummaryContext.Provider>
  )
}

export function useSummary() {
  const context = useContext(SummaryContext)
  if (context === undefined) {
    throw new Error('useSummary must be used within a SummaryProvider')
  }
  return context
}
