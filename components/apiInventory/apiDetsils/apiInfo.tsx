import { Box, Flex, Text } from '@mantine/core';
import { monoFont } from '@/app/fonts';

const apiData = {
  column1: {
    labels: ['App ID:', 'Hits:', 'Verified:'],
    values: ['Backend Service IV', '425', 'True'],
  },
  column2: {
    labels: ['Added:', 'Type:', 'Depriciated:'],
    values: ['15/08/2024', 'POST', 'False'],
  },
};
export default function APIInfo() {
  return (
    <Box
      p="lg"
      mt={20}
      style={{
        // backgroundColor: '#f9f9f9',

        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      maw={840}
      display="flex"
    >
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        w={318}
        style={{ flexDirection: 'row' }}
      >
        <Box display="flex" style={{ flexDirection: 'column' }}>
          {apiData.column1.labels.map((label, index) => (
            <Text key={index} fw={400} size="sm" c="#495057" className={monoFont.className} pb={11}>
              {label}
            </Text>
          ))}
        </Box>
        <Box display="flex" style={{ flexDirection: 'column' }}>
          {apiData.column1.values.map((value, index) => (
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
        w={318}
        style={{ flexDirection: 'row' }}
      >
        <Box display="flex" style={{ flexDirection: 'column' }}>
          {apiData.column2.labels.map((label, index) => (
            <Text key={index} fw={400} size="sm" c="#495057" className={monoFont.className} pb={11}>
              {label}
            </Text>
          ))}
        </Box>
        <Box display="flex" style={{ flexDirection: 'column' }}>
          {apiData.column2.values.map((value, index) => (
            <Text key={index} fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
              {value}
            </Text>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
