import { Box, Flex, Text } from '@mantine/core';
import { monoFont } from '@/app/fonts';

export default function IssueInfo({ data }: { data: Record<string, any> }) {
  console.log('DATA', data);
  const issueData = {
    column1: {
      labels: ['App ID:', 'Status:', 'Api ID:', 'Created At:'],
      values: [data.appId, data.status, data.apiId, new Date(data.createdAt).toLocaleDateString()],
    },
    column2: {
      labels: ['Title:', 'Severity:', 'Raised At:', 'Updated At:'],
      values: [
        data.title,
        data.severity,
        new Date(data.raisedAt).toLocaleDateString(),
        new Date(data.updatedAt).toLocaleDateString(),
      ],
    },
  };
  return (
    <Box
      p="lg"
      mt={20}
      style={{
        // backgroundColor: '#f9f9f9',

        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      maw={1024}
      display="flex"
    >
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        // w={318}
        style={{ flexDirection: 'row' }}
      >
        <Box display="flex" style={{ flexDirection: 'column' }}>
          {issueData.column1.labels.map((label, index) => (
            <Text key={index} fw={400} size="sm" c="#495057" className={monoFont.className} pb={11}>
              {label}
            </Text>
          ))}
        </Box>
        <Box display="flex" style={{ flexDirection: 'column' }} ml={10}>
          {issueData.column1.values.map((value, index) => (
            <Text key={index} fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
              {value}
            </Text>
          ))}
        </Box>
      </Flex>
      {/* 2nd column items */}
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        // w={460}
        style={{ flexDirection: 'row' }}
      >
        <Box display="flex" style={{ flexDirection: 'column' }}>
          {issueData.column2.labels.map((label, index) => (
            <Text key={index} fw={400} size="sm" c="#495057" className={monoFont.className} pb={11}>
              {label}
            </Text>
          ))}
        </Box>
        <Box display="flex" style={{ flexDirection: 'column' }} ml={10}>
          {issueData.column2.values.map((value, index) => (
            <Text key={index} fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
              {value}
            </Text>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
