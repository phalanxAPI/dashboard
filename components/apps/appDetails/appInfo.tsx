import { Box, Flex, Text } from '@mantine/core';
import { monoFont } from '@/app/fonts';

export default function AppInfo({ data }: { data: Record<string, any> }) {
  const appData = {
    labels: ['App ID:', 'Hits:', 'Active Servers:'],
    values: [data.name, data.hits, data.serverCount],
  };
  return (
    <Box p="lg" mt={20} maw={840} display="flex">
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        w={318}
        style={{ flexDirection: 'row' }}
      >
        <Box display="flex" style={{ flexDirection: 'column' }}>
          {appData.labels.map((label, index) => (
            <Text key={index} fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
              {label}
            </Text>
          ))}
        </Box>
        <Box display="flex" style={{ flexDirection: 'column' }}>
          {appData.values.map((value, index) => (
            <Text key={index} fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
              {value}
            </Text>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
