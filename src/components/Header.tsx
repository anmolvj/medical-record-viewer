import { Box, Flex, Text, Button } from '@chakra-ui/react'
import type { HeaderProps } from '../types'

export function Header({ view, setView }: HeaderProps) {
  return (
    <Box p={5} borderBottom="1px solid #e0e0e0" bg="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="#4a6fa5">
            EHR Medical Record Viewer
          </Text>
          <Text fontSize="sm" color="gray.600" mt={1}>
            View and analyze medical records with extracted data
          </Text>
        </Box>
        <Flex gap={2}>
          <Button 
            size="sm" 
            onClick={() => setView('split')}
            bg={view === 'split' ? '#4a6fa5' : 'gray.100'}
            color={view === 'split' ? 'white' : 'gray.700'}
            _hover={{ bg: view === 'split' ? '#3d5a85' : 'gray.200' }}
            fontWeight={view === 'split' ? 'bold' : 'normal'}
          >
            Split View
          </Button>
          <Button 
            size="sm" 
            onClick={() => setView('record')}
            bg={view === 'record' ? '#4a6fa5' : 'gray.100'}
            color={view === 'record' ? 'white' : 'gray.700'}
            _hover={{ bg: view === 'record' ? '#3d5a85' : 'gray.200' }}
            fontWeight={view === 'record' ? 'bold' : 'normal'}
          >
            Record Only
          </Button>
          <Button 
            size="sm" 
            onClick={() => setView('data')}
            bg={view === 'data' ? '#4a6fa5' : 'gray.100'}
            color={view === 'data' ? 'white' : 'gray.700'}
            _hover={{ bg: view === 'data' ? '#3d5a85' : 'gray.200' }}
            fontWeight={view === 'data' ? 'bold' : 'normal'}
          >
            Data Only
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

