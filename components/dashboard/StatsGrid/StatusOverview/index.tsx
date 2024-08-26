import { IconAlertHexagon, IconShieldSearch, IconUnlink } from '@tabler/icons-react';
import { Badge, Box, Flex, Text } from '@mantine/core';
import { monoFont, primaryFont } from '@/app/fonts';

export default function StatusOverview() {
  return (
    <Box
      pt="xl"
      pr="lg"
      pl="lg"
      style={{
        height: '350px',
        backgroundColor: 'white',
        borderRadius: '40px',
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
      }}
    >
      {/* first badge */}
      <Badge
        color="#FEF1CF"
        mb="lg"
        style={{
          height: '93px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <Flex
            h={65}
            w={65}
            ml={4}
            align="center"
            justify="center"
            bg="white"
            style={{
              borderRadius: '50%',
            }}
          >
            <IconUnlink color="#FCB90D" size="24px" />
          </Flex>

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text c="#FCB90D" size="xl" fw="bold" className={monoFont.className}>
              84
            </Text>
            <Text c="#656565" size="xs" fw="initial" className={primaryFont.className}>
              Open Issues
            </Text>
          </Box>
        </Box>
      </Badge>

      {/* 2nd badge */}
      <Badge
        color="#FCE5DE"
        mb="lg"
        style={{
          height: '93px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <Flex
            h={65}
            w={65}
            ml={4}
            align="center"
            justify="center"
            bg="white"
            style={{
              borderRadius: '50%',
            }}
          >
            <IconAlertHexagon color="#ED4216" size="24px" />
          </Flex>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text c="#ED4216" size="xl" fw="bold">
              13
            </Text>
            <Text c="#656565" size="xs" fw="initial" className={primaryFont.className}>
              High Severity
            </Text>
          </Box>
        </Box>
      </Badge>

      {/* 3rd badge */}
      <Badge
        color="#DFFCEE"
        mb="xl"
        style={{
          height: '93px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <Flex
            h={65}
            w={65}
            ml={4}
            align="center"
            justify="center"
            bg="white"
            style={{
              borderRadius: '50%',
            }}
          >
            <IconShieldSearch color="#1BAF21" size="24px" />
          </Flex>

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text c="#1BAF21" size="xl" fw="bold">
              71
            </Text>
            <Text c="#656565" size="xs" fw="initial" className={primaryFont.className}>
              Low Severity
            </Text>
          </Box>
        </Box>
      </Badge>
    </Box>
  );
}
