import { Box, Flex, Text } from '@mantine/core';
import { monoFont } from '@/app/fonts';

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
          <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
            App ID:
          </Text>
          <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
            Hits:
          </Text>
          <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
            Verified:
          </Text>
        </Box>
        <Box display="flex" style={{ flexDirection: 'column' }}>
          <Text fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
            Backend Service IV
          </Text>
          <Text fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
            425
          </Text>
          <Text fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
            True
          </Text>
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
          <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
            Added:
          </Text>
          <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
            Type:
          </Text>
          <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
            Depriciated:
          </Text>
        </Box>
        <Box display="flex" style={{ flexDirection: 'column' }}>
          <Text fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
            15/08/2024
          </Text>
          <Text fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
            POST
          </Text>
          <Text fw={900} size="sm" className={monoFont.className} c="#495057" pb={11}>
            False
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
