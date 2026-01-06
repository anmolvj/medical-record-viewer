import type { ReactNode } from 'react'

// Domain types
export type MedicalRecord = {
  fileName: string
  pdfPath: string
  jsonPath: string | null
  reviewed: boolean
  flagged: boolean
}

export type ViewMode = 'split' | 'record' | 'data'
export type FilterMode = 'reviewed' | 'flagged' | null

// Context types
export type SelectionContextType = {
  selectedRecord: MedicalRecord | null
  setSelectedRecord: (record: MedicalRecord) => void
}

// Component props
export type HeaderProps = {
  view: ViewMode
  setView: (view: ViewMode) => void
}

export type BodyProps = {
  showReport: boolean
  showOutput: boolean
}

export type PanelProps = {
  title?: string
  children: ReactNode
  flex?: string
  borderRight?: boolean
  hidden?: boolean
}
