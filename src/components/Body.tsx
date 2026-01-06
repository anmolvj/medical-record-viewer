import { Flex } from '@chakra-ui/react'
import { Panel, Files, Report, Output } from './'
import type { BodyProps } from '../types'

export function Body({ showReport, showOutput }: BodyProps) {
  return (
    <Flex h="calc(100vh - 90px)" w="100vw" overflow="hidden">
      <Panel flex="1.5" borderRight>
        <Files />
      </Panel>

      <Panel title="Report Viewer" flex="6" borderRight={showReport && showOutput} hidden={!showReport}>
        <Report />
      </Panel>

      <Panel title="Sample Output" flex="2.5" hidden={!showOutput}>
        <Output />
      </Panel>
    </Flex>
  )
}

