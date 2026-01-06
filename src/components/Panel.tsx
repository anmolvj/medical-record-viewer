import { Box } from '@chakra-ui/react'
import type { PanelProps } from '../types'

export function Panel({ title, children, flex = "1", borderRight = false, hidden = false }: PanelProps) {
  if (hidden) return null
  
  return (
    <Box 
      flex={flex}
      borderRight={borderRight ? '1px solid #ccc' : 'none'} 
      display="flex" 
      flexDirection="column" 
      h="100%"
    >
      {title && (
        <Box p={2} borderBottom="1px solid #ccc" fontWeight="bold">
          {title}
        </Box>
      )}
      <Box flex="1" bg="white" overflow="hidden">
        {children}
      </Box>
    </Box>
  )
}

