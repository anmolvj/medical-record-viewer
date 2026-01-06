import { useState } from 'react'
import { ChakraProvider, defaultSystem, Box } from '@chakra-ui/react'
import { SelectionProvider } from './context/RecordsContext'
import { Header, Body } from './components'
import type { ViewMode } from './types'

function App() {
  const [view, setView] = useState<ViewMode>('split')

  const showReport = view === 'split' || view === 'record'
  const showOutput = view === 'split' || view === 'data'

  return (
    <ChakraProvider value={defaultSystem}>
      <SelectionProvider>
        <Box h="100vh" overflow="hidden">
          <Header view={view} setView={setView} />
          <Body showReport={showReport} showOutput={showOutput} />
        </Box>
      </SelectionProvider>
    </ChakraProvider>
  )
}

export default App
