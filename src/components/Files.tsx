import { useCallback } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import { useSelection } from '../context/RecordsContext'
import { useRecordsManager } from '../hooks/useRecordsManager'
import { FaUserCheck } from 'react-icons/fa'
import { MdFlag, MdFilterList, MdClose } from 'react-icons/md'

export function Files() {
  const { selectedRecord, setSelectedRecord } = useSelection()
  const onInitialLoad = useCallback((first: any) => setSelectedRecord(first), [setSelectedRecord])
  const { records, filter, setFilter, toggleReviewed, toggleFlagged, reviewedCount, flaggedCount } = useRecordsManager(onInitialLoad)

  return (
    <Box display="flex" flexDirection="column" h="100%">
      <Flex p={2} borderBottom="1px solid #ccc" fontWeight="bold" justifyContent="space-between" alignItems="center">
        <Text>Records ({records.length})</Text>
        <Flex gap={2} alignItems="center">
          <Flex alignItems="center" gap={1} fontSize="xs" color="gray.600">
            <MdFilterList size={16} />
            <Text>Filter by:</Text>
          </Flex>
          <Flex 
            bg={filter === 'reviewed' ? "green.200" : "green.100"} 
            color="green.800" 
            px={2} 
            py={1} 
            borderRadius="full" 
            fontSize="xs" 
            fontWeight="bold" 
            alignItems="center" 
            gap={1}
            cursor="pointer"
            onClick={() => setFilter(filter === 'reviewed' ? null : 'reviewed')}
            _hover={{ bg: filter === 'reviewed' ? "green.300" : "green.200" }}
            transition="all 0.2s"
          >
            <FaUserCheck size={14} />
            <Text>{reviewedCount}</Text>
            {filter === 'reviewed' && <MdClose size={14} />}
          </Flex>
          <Flex 
            bg={filter === 'flagged' ? "orange.200" : "orange.100"} 
            color="orange.800" 
            px={2} 
            py={1} 
            borderRadius="full" 
            fontSize="xs" 
            fontWeight="bold" 
            alignItems="center" 
            gap={1}
            cursor="pointer"
            onClick={() => setFilter(filter === 'flagged' ? null : 'flagged')}
            _hover={{ bg: filter === 'flagged' ? "orange.300" : "orange.200" }}
            transition="all 0.2s"
          >
            <MdFlag size={14} />
            <Text>{flaggedCount}</Text>
            {filter === 'flagged' && <MdClose size={14} />}
          </Flex>
        </Flex>
      </Flex>
      
      <Box flex="1" overflowY="auto" p={2}>
        {records.map((record) => {
          const isSelected = selectedRecord?.fileName === record.fileName
          return (
            <Box 
              key={record.fileName} 
              mb={2}
              p={3}
              borderRadius="md"
              bg={isSelected ? '#e3f2fd' : 'white'}
              border="1px solid"
              borderColor={isSelected ? '#90caf9' : '#e0e0e0'}
              cursor="pointer"
              _hover={{ bg: isSelected ? '#e3f2fd' : '#f5f5f5' }}
            >
              <Flex alignItems="center" gap={3} justifyContent="space-between">
                <Box flex="1" onClick={() => setSelectedRecord(record)}>
                  <Text fontSize="md" fontWeight="bold" color="gray.700">
                    {record.fileName}
                  </Text>
                </Box>
                <Flex alignItems="center" gap={2}>
                  <Box
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleReviewed(record.fileName)
                    }}
                    _hover={{ opacity: 0.7 }}
                    color={record.reviewed ? 'green.500' : 'gray.300'}
                  >
                    <FaUserCheck size={18} />
                  </Box>
                  <Box
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFlagged(record.fileName)
                    }}
                    _hover={{ opacity: 0.7 }}
                    color={record.flagged ? 'orange.500' : 'gray.300'}
                  >
                    <MdFlag size={18} />
                  </Box>
                </Flex>
              </Flex>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
