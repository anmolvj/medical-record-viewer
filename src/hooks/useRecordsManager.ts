import { useState, useEffect, useMemo } from 'react'
import { useMedicalRecords } from './useMedicalRecords'
import type { MedicalRecord, FilterMode } from '../types'

export function useRecordsManager(onInitialLoad?: (firstRecord: MedicalRecord) => void) {
  const initialRecords = useMedicalRecords()
  const [allRecords, setAllRecords] = useState<MedicalRecord[]>([])
  const [filter, setFilter] = useState<FilterMode>(null)

  useEffect(() => {
    if (initialRecords.length > 0 && allRecords.length === 0) {
      setAllRecords(initialRecords)
      onInitialLoad?.(initialRecords[0])
    }
  }, [initialRecords, allRecords, onInitialLoad])

  function toggleReviewed(fileName: string) {
    setAllRecords(prev => prev.map(r => 
      r.fileName === fileName ? { ...r, reviewed: !r.reviewed } : r
    ))
  }

  function toggleFlagged(fileName: string) {
    setAllRecords(prev => prev.map(r => 
      r.fileName === fileName ? { ...r, flagged: !r.flagged } : r
    ))
  }

  const reviewedCount = useMemo(() => 
    allRecords.filter(r => r.reviewed).length, 
    [allRecords]
  )

  const flaggedCount = useMemo(() => 
    allRecords.filter(r => r.flagged).length, 
    [allRecords]
  )

  const records = useMemo(() => {
    if (filter === null) return allRecords
    if (filter === 'reviewed') return allRecords.filter(r => r.reviewed)
    return allRecords.filter(r => r.flagged)
  }, [allRecords, filter])

  return {
    records,
    filter,
    setFilter,
    toggleReviewed,
    toggleFlagged,
    reviewedCount,
    flaggedCount,
  }
}
