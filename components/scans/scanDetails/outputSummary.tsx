/* eslint-disable react/jsx-curly-brace-presence */

import { Flex } from '@mantine/core';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

export default function ScanOutputSummary({ data }: { data: Record<string, any> }) {
  return (
    <Flex
      mb={45}
      maw={1000}
      direction="column"
      style={{
        backgroundColor: 'white',

        borderRadius: '22px',
      }}
    >
      <Flex direction="column" align="flex-start" ml={24} mt={20} mb={25} opacity="70%">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.outputSummary}</ReactMarkdown>
      </Flex>
    </Flex>
  );
}
