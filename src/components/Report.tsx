import { useState, useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useSelection } from '../context/RecordsContext'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export function Report() {
  const { selectedRecord } = useSelection()
  const [numPages, setNumPages] = useState<number>(0)
  const [pageWidth, setPageWidth] = useState<number>(800)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateWidth = () => {
    if (containerRef.current) {
      setPageWidth(containerRef.current.offsetWidth - 40)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    updateWidth()

    const resizeObserver = new ResizeObserver(() => {
      updateWidth()
    })

    resizeObserver.observe(containerRef.current)
    window.addEventListener('resize', updateWidth)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [selectedRecord])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setTimeout(updateWidth, 0)
  }

  if (!selectedRecord) {
    return <Box p={4}><Text>No record selected</Text></Box>
  }

  return (
    <Box ref={containerRef} h="100%" overflowY="auto" bg="gray.100" display="flex" justifyContent="center" tabIndex={0} outline="none">
      <Box py={4}>
        <Document
          file={selectedRecord.pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Text p={4}>Loading PDF...</Text>}
          error={<Text p={4} color="red.500">Failed to load PDF</Text>}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Box key={`page_${index + 1}`} mb={4} boxShadow="lg">
              <Page
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={pageWidth}
              />
            </Box>
          ))}
        </Document>
      </Box>
    </Box>
  )
}
