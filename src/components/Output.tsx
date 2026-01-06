import { useState, useEffect } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import { useSelection } from '../context/RecordsContext'

export function Output() {
  const { selectedRecord } = useSelection()
  const [jsonData, setJsonData] = useState<any>(null)

  useEffect(() => {
    if (selectedRecord?.jsonPath) {
      fetch(selectedRecord.jsonPath)
        .then(res => res.json())
        .then(data => setJsonData(data))
        .catch(err => {
          console.error('Failed to load JSON:', err)
          setJsonData(null)
        })
    } else {
      setJsonData(null)
    }
  }, [selectedRecord])

  if (!selectedRecord) {
    return <Box p={4}><Text>No record selected</Text></Box>
  }

  if (!selectedRecord.jsonPath) {
    return <Box p={4}><Text color="gray.500">No JSON file found for this record</Text></Box>
  }

  if (!jsonData) {
    return <Box p={4}><Text>Loading JSON data...</Text></Box>
  }

  const diagnoses = jsonData?.clinical_data?.diagnoses?.primary || {}
  const procedures = jsonData?.clinical_data?.procedures || []
  const recordInfo = jsonData?.record_info || {}

  return (
    <Box p={4} overflowY="auto" h="100%">
      {diagnoses.diagnosis && (
        <Box mb={4}>
          <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2}>Diagnosis</Text>
          <Box p={3} bg="yellow.50" borderRadius="md">
            <Text fontSize="md" fontWeight="medium">{diagnoses.diagnosis}</Text>
            {diagnoses.icd10 && (
              <Text fontSize="sm" color="gray.600" mt={1}>ICD-10: {diagnoses.icd10}</Text>
            )}
          </Box>
        </Box>
      )}

      {procedures.length > 0 && (
        <Box mb={4}>
          <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2}>Procedures</Text>
          {procedures.map((proc: any, idx: number) => (
            <Box key={idx} p={3} bg="blue.50" borderRadius="md" mb={2}>
              <Text fontSize="md" fontWeight="medium">{proc.procedure}</Text>
              {proc.cpt && proc.cpt.length > 0 && (
                <Flex gap={4} mt={1}>
                  <Text fontSize="sm" color="gray.600">CPT: {proc.cpt[0].code}</Text>
                  {proc.cpt[0].asa && (
                    <Text fontSize="sm" color="gray.600">ASA: {proc.cpt[0].asa}</Text>
                  )}
                </Flex>
              )}
            </Box>
          ))}
        </Box>
      )}

      {recordInfo.record_type && (
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2}>Metadata</Text>
          <Box p={3} bg="gray.50" borderRadius="md">
            <Text fontSize="sm" color="gray.600">Record Type: {recordInfo.record_type}</Text>
            {recordInfo.source_file && (
              <Text fontSize="sm" color="gray.600" mt={1}>Source: {recordInfo.source_file}</Text>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
