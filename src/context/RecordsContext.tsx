import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { MedicalRecord, SelectionContextType } from '../types'

const SelectionContext = createContext<SelectionContextType | null>(null)

function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)

  return (
    <SelectionContext.Provider value={{ selectedRecord, setSelectedRecord }}>
      {children}
    </SelectionContext.Provider>
  )
}

function useSelection() {
  const context = useContext(SelectionContext)
  if (!context) throw new Error('useSelection must be used within SelectionProvider')
  return context
}

export { SelectionProvider, useSelection }
