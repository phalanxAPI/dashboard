/* eslint-disable react/jsx-curly-brace-presence */

import { Flex, Text } from '@mantine/core';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

export default function IssueDescription({ data }: { data: Record<string, any> }) {
  return (
    <Flex
      mb={45}
      maw={1024}
      pr={24}
      direction="column"
      style={{
        backgroundColor: 'white',

        borderRadius: '22px',
      }}
    >
      <Text pl={24} fw={700} size="lg" c="#3C3C3C" pt={24}>
        Description
      </Text>
      <Flex direction="column" align="flex-start" ml={24} opacity="70%" pb={20}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.description}</ReactMarkdown>
      </Flex>
    </Flex>
  );
}
