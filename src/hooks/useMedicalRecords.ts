import { useMemo } from 'react'
import type { MedicalRecord } from '../types'

function getFileName(path: string) {
  return path.split('/').pop()?.split('.')[0] || ''
}

function getFileUrl(module: any) {
  return module.default || module
}

function transformFilesToRecords(pdfs: any, jsons: any): MedicalRecord[] {
  const jsonMap = new Map()
  
  for (const path in jsons) {
    const id = getFileName(path)
    const url = getFileUrl(jsons[path])
    jsonMap.set(id, url)
  }

  return Object.keys(pdfs).map((path) => {
    const id = getFileName(path)
    const pdfUrl = getFileUrl(pdfs[path])
    const jsonUrl = jsonMap.get(id) || null

    return {
      fileName: id,
      pdfPath: pdfUrl,
      jsonPath: jsonUrl,
      reviewed: false,
      flagged: false,
    }
  })
}

export function useMedicalRecords() {
  return useMemo(() => {
    const pdfs = import.meta.glob('/data/ehr_pdfs/*.pdf', { eager: true, query: '?url' })
    const jsons = import.meta.glob('/data/json_outputs/*.json', { eager: true, query: '?url' })
    return transformFilesToRecords(pdfs, jsons)
  }, [])
}
